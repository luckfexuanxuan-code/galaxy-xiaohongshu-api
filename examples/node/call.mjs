#!/usr/bin/env node
import { readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';

const endpoints = JSON.parse(await readFile(new URL('../endpoints.json', import.meta.url), 'utf8'));

export function checkResult(result) {
  if (!result || typeof result !== 'object' || Array.isArray(result)) {
    throw new Error('Expected a JSON object; see the endpoint response documentation.');
  }
  if (result.success === false || !['0', '200'].includes(String(result.code ?? 200))) {
    throw new Error(`API code=${result.code}: ${result.message || result.error || 'Request failed'}`);
  }
  return result;
}

export async function main(argv = process.argv.slice(2)) {
  if (!argv.length || argv.includes('--help')) {
    console.log('Usage: node examples/node/call.mjs <command> [--parameter value] [--demo]');
    for (const [name, spec] of Object.entries(endpoints)) {
      console.log(`${name}: ${spec.title}; parameters: ${spec.parameters.join(', ')}`);
    }
    return;
  }
  const [command, ...options] = argv;
  if (!Object.hasOwn(endpoints, command)) throw new Error(`Unknown command: ${command}`);
  const spec = endpoints[command];
  const params = { ...spec.defaults };
  let demo = false;
  for (let i = 0; i < options.length; i++) {
    if (options[i] === '--demo') { demo = true; continue; }
    if (!options[i].startsWith('--')) throw new Error(`Expected --parameter, got: ${options[i]}`);
    const name = options[i].slice(2);
    if (!spec.parameters.includes(name)) throw new Error(`Unsupported parameter: ${name}`);
    const value = options[++i];
    if (!value?.trim() || value.startsWith('--')) throw new Error(`Missing value for --${name}`);
    params[name] = value;
  }
  let result;
  if (demo) {
    result = checkResult(JSON.parse(await readFile(new URL(`../responses/${spec.id}.json`, import.meta.url), 'utf8')));
  } else {
    for (const name of spec.required) {
      if (!params[name]) throw new Error(`Missing --${name}`);
    }
    const key = process.env.GALAXY_API_KEY?.trim();
    if (!key || key === 'YOUR_API_KEY') throw new Error('Set GALAXY_API_KEY to your API key first');
    const url = new URL(spec.path, 'https://api.galaxysapi.com');
    url.search = new URLSearchParams(params).toString();
    const response = await fetch(url, {
      headers: { Authorization: key, Accept: 'application/json' },
      signal: AbortSignal.timeout(60_000),
    });
    const body = await response.text();
    try { result = JSON.parse(body); }
    catch { throw new Error(`HTTP ${response.status}: response is not JSON`); }
    if (!response.ok) {
      const retry = response.headers.get('retry-after');
      throw new Error(`HTTP ${response.status}: ${result?.error || result?.message || 'Request failed'}${retry ? `; Retry-After=${retry}` : ''}`);
    }
    checkResult(result);
  }
  console.log(JSON.stringify(result, null, 2));
}

// Importing this file in offline checks does not send requests.
if (process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url) {
  main().catch(error => {
    const key = process.env.GALAXY_API_KEY?.trim();
    console.error(key ? error.message.replaceAll(key, '[REDACTED]') : error.message);
    process.exitCode = 1;
  });
}
