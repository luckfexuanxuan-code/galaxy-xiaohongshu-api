#!/usr/bin/env python3
"""One-request examples; --demo loads local, sanitized response excerpts."""
import argparse
import csv
import json
import os
from pathlib import Path
import sys
from urllib.error import HTTPError, URLError
from urllib.parse import urlencode
from urllib.request import Request, urlopen

EXAMPLES = Path(__file__).resolve().parents[1]
ENDPOINTS = json.loads((EXAMPLES / 'endpoints.json').read_text(encoding='utf-8'))
BASE_URL = 'https://api.galaxysapi.com'


def check_result(result):
    if not isinstance(result, dict):
        raise ValueError('Expected a JSON object; see the endpoint response documentation.')
    if result.get('success') is False or str(result.get('code', 200)) not in ('0', '200'):
        raise ValueError(f"API code={result.get('code')}: {result.get('message') or result.get('error') or 'Request failed'}")
    return result


def request_once(endpoint, params, api_key):
    request = Request(BASE_URL + endpoint + '?' + urlencode(params), headers={
        'Authorization': api_key, 'Accept': 'application/json',
    })
    try:
        with urlopen(request, timeout=60) as response:
            return check_result(json.load(response))
    except HTTPError as error:
        try:
            body = json.loads(error.read())
            message = body.get('error') or body.get('message') or error.reason
        except (ValueError, AttributeError):
            message = error.reason
        retry = error.headers.get('Retry-After')
        raise ValueError(f"HTTP {error.code}: {message}" + (f"; Retry-After={retry}" if retry else '')) from None


def csv_cell(value):
    text = str(value if value is not None else '')
    # Keep external text from being interpreted as a spreadsheet formula.
    return "'" + text if text.lstrip().startswith(('=', '+', '-', '@')) or text.startswith(('\t', '\r', '\n')) else text


def export_search_csv(result, filename):
    data = result.get('data')
    if not isinstance(data, dict) or not isinstance(data.get('items'), list):
        raise ValueError('Expected data.items for note search; inspect the JSON response.')
    target = Path(filename)
    target.parent.mkdir(parents=True, exist_ok=True)
    rows = 0
    with target.open('w', newline='', encoding='utf-8-sig') as handle:
        writer = csv.writer(handle)
        writer.writerow(['note_id', 'title', 'user_id', 'nickname', 'likes', 'comments', 'collects'])
        for item in data['items']:
            if not isinstance(item, dict) or item.get('model_type') != 'note':
                continue
            note = item.get('note')
            if not isinstance(note, dict):
                continue
            user = note.get('user') or {}
            writer.writerow([csv_cell(value) for value in [note.get('id'), note.get('title'), user.get('userid'), user.get('nickname'), note.get('liked_count'), note.get('comments_count'), note.get('collected_count')]])
            rows += 1
    return rows


def main(argv=None):
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('command', choices=ENDPOINTS)
    parser.add_argument('--demo', action='store_true', help='Read local response; no network or billing')
    parser.add_argument('--csv', help='Export one page of search notes to a CSV file (search only)')
    for name in sorted({key for spec in ENDPOINTS.values() for key in spec['parameters']}):
        parser.add_argument('--' + name)
    args = parser.parse_args(argv)
    spec = ENDPOINTS[args.command]
    params = dict(spec['defaults'])
    for name, value in vars(args).items():
        if name in ('command', 'demo', 'csv') or value is None:
            continue
        if name not in spec['parameters']:
            parser.error(f'--{name} is not supported by {args.command}')
        if not value.strip():
            parser.error(f'--{name} cannot be empty')
        params[name] = value
    if args.csv and args.command != 'search':
        parser.error('--csv is only available for search')
    if args.demo:
        result = check_result(json.loads((EXAMPLES / 'responses' / (spec['id'] + '.json')).read_text(encoding='utf-8')))
    else:
        missing = [name for name in spec['required'] if not params.get(name)]
        if missing:
            parser.error('Missing: ' + ', '.join('--' + name for name in missing))
        api_key = os.environ.get('GALAXY_API_KEY', '').strip()
        if not api_key or api_key == 'YOUR_API_KEY':
            parser.error('Set GALAXY_API_KEY to your API key first')
        result = request_once(spec['path'], params, api_key)
    print(json.dumps(result, ensure_ascii=False, indent=2))
    if args.csv:
        rows = export_search_csv(result, args.csv)
        print(f'Exported {rows} notes to {args.csv}', file=sys.stderr)


if __name__ == '__main__':
    try:
        main()
    except (ValueError, OSError, URLError) as error:
        message = str(error)
        secret = os.environ.get('GALAXY_API_KEY', '').strip()
        print(message.replace(secret, '[REDACTED]') if secret else message, file=sys.stderr)
        sys.exit(1)
