import assert from 'node:assert/strict';
import { test } from 'node:test';
import { main, checkResult } from '../examples/node/call.mjs';

test('offline demos, query encoding, authentication and error handling', async () => {
  const originalFetch = globalThis.fetch;
  const originalLog = console.log;
  const originalKey = process.env.GALAXY_API_KEY;
  const output = [];
  console.log = value => output.push(value);
  let calls = 0;
  try {
    delete process.env.GALAXY_API_KEY;
    globalThis.fetch = () => { throw new Error('Offline demo must not send a request'); };
    for (const command of ['search', 'note', 'comments', 'user', 'pgy', 'douyin', 'bilibili']) {
      await main([command, '--demo']);
      assert.equal(JSON.parse(output.at(-1)).code, 200);
    }
    process.env.GALAXY_API_KEY = 'test-key';
    globalThis.fetch = async (url, options) => {
      calls++;
      assert.equal(url.hostname, 'api.galaxysapi.com');
      assert.equal(url.searchParams.get('keyword'), '咖啡 & 茶');
      assert.equal(options.headers.Authorization, 'test-key');
      return new Response(JSON.stringify({ code: 200, data: {} }));
    };
    await main(['search', '--keyword', '咖啡 & 茶']);
    assert.equal(calls, 1);
    globalThis.fetch = async () => {
      calls++;
      return new Response(JSON.stringify({ error: 'Too frequent' }), { status: 429, headers: { 'Retry-After': '5' } });
    };
    await assert.rejects(main(['search']), /HTTP 429.*Retry-After=5/);
    assert.equal(calls, 2);
    globalThis.fetch = async () => new Response(JSON.stringify({ code: 402, message: 'Balance required' }));
    await assert.rejects(main(['search']), /402/);
    globalThis.fetch = () => { throw new Error('Validation must happen before the request'); };
    await assert.rejects(main(['note']), /Missing --note_id/);
    await assert.rejects(main(['search', '--unknown', 'x']), /Unsupported parameter/);
    await assert.rejects(main(['search', '--keyword']), /Missing value/);
    assert.throws(() => checkResult({ code: 200, success: false }));
  } finally {
    globalThis.fetch = originalFetch;
    console.log = originalLog;
    if (originalKey === undefined) delete process.env.GALAXY_API_KEY;
    else process.env.GALAXY_API_KEY = originalKey;
  }
});
