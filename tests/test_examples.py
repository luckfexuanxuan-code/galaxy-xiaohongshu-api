"""Offline checks: no real API keys, network requests or billing."""
import contextlib
import importlib.util
import io
import json
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch
from urllib.error import HTTPError
from urllib.parse import parse_qs, urlsplit

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('example', ROOT / 'examples/python/call.py')
example = importlib.util.module_from_spec(spec)
spec.loader.exec_module(example)


class ExampleTests(unittest.TestCase):
    def test_every_demo_works_without_network_or_key(self):
        for command in example.ENDPOINTS:
            with self.subTest(command=command), patch.dict('os.environ', {}, clear=True), patch.object(example, 'urlopen') as network, contextlib.redirect_stdout(io.StringIO()) as output:
                example.main([command, '--demo'])
                self.assertEqual(json.loads(output.getvalue())['code'], 200)
                network.assert_not_called()

    def test_query_encoding_and_raw_authorization(self):
        with patch.object(example, 'urlopen', return_value=io.BytesIO(b'{"code":200,"data":{}}')) as network:
            example.request_once('/api/search_note_v1', {'keyword': '咖啡 & 茶'}, 'test-key')
            request = network.call_args[0][0]
            self.assertEqual(urlsplit(request.full_url).hostname, 'api.galaxysapi.com')
            self.assertEqual(parse_qs(urlsplit(request.full_url).query)['keyword'], ['咖啡 & 茶'])
            self.assertEqual(request.get_header('Authorization'), 'test-key')
            self.assertEqual(network.call_args[1]['timeout'], 60)

    def test_http_error_preserves_retry_hint_without_retrying(self):
        error = HTTPError('https://api.galaxysapi.com', 429, 'Too Many Requests', {'Retry-After': '5'}, io.BytesIO(b'{"error":"Too frequent"}'))
        with patch.object(example, 'urlopen', side_effect=error) as network:
            with self.assertRaisesRegex(ValueError, 'HTTP 429.*Retry-After=5'):
                example.request_once('/api/search_note_v1', {}, 'test-key')
            self.assertEqual(network.call_count, 1)

    def test_http_success_with_business_error_is_rejected(self):
        with patch.object(example, 'urlopen', return_value=io.BytesIO(b'{"code":402,"message":"Balance required"}')):
            with self.assertRaisesRegex(ValueError, '402'):
                example.request_once('/api/search_note_v1', {}, 'test-key')
        with self.assertRaises(ValueError):
            example.check_result({'code': 200, 'success': False})

    def test_csv_filters_cards_and_escapes_formulas(self):
        result = {'data': {'items': [{'model_type': 'ad'}, {'model_type': 'note', 'note': {'id': 'example', 'title': '=1+1', 'user': {'nickname': '@demo'}, 'liked_count': 3}}]}}
        with tempfile.TemporaryDirectory() as directory:
            filename = Path(directory) / 'notes.csv'
            self.assertEqual(example.export_search_csv(result, filename), 1)
            text = filename.read_text(encoding='utf-8-sig')
            self.assertIn("'=1+1", text)
            self.assertIn("'@demo", text)

    def test_missing_required_parameter_fails_before_request(self):
        with patch.object(example, 'urlopen') as network, contextlib.redirect_stderr(io.StringIO()):
            with self.assertRaises(SystemExit):
                example.main(['note'])
            network.assert_not_called()


if __name__ == '__main__':
    unittest.main()
