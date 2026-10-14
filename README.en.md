<p align="center"><img src="assets/banner.svg" alt="Galaxy API — Xiaohongshu data APIs" width="100%"></p>

# Galaxy API — Xiaohongshu Data APIs

**Connect Xiaohongshu content, comments and creator data to your application.**

Galaxy API focuses on Xiaohongshu (小红书 / RedNote / XHS), covering App, Web and Pugongying creator data. This repository provides runnable examples, integration notes and sanitized response excerpts for content discovery, comment analysis and creator research.

**[API documentation](https://galaxysapi.com/api-docs/?utm_source=github&utm_medium=readme&utm_campaign=xiaohongshu)** · **[Create an account](https://galaxysapi.com/login?mode=register&utm_source=github&utm_medium=readme&utm_campaign=xiaohongshu)** · **[Website](https://galaxysapi.com/?utm_source=github&utm_medium=readme&utm_campaign=xiaohongshu)** · [简体中文](README.md)

## Xiaohongshu capabilities

| Area | Capabilities |
| --- | --- |
| Search | Keyword searches, sorting and note-type filters |
| Notes | Image/video note details, authors and engagement fields |
| Comments | Top-level comments and replies |
| Users | Profiles, published notes and user search |
| Web | Web note details, searches and comments |
| Pugongying | Creator profiles, performance, growth, notes and audience metrics |

Browse the [endpoint directory](docs/endpoints.md) or the [online documentation](https://galaxysapi.com/api-docs/).

## Quick start

Create an account, create an API key in the [console](https://galaxysapi.com/console/api-keys), and check your balance and key quota. Pass the full key in the `Authorization` header **without a `Bearer ` prefix**.

```bash
git clone https://github.com/luckfexuanxuan-code/galaxy-xiaohongshu-api.git
cd galaxy-xiaohongshu-api
export GALAXY_API_KEY='YOUR_API_KEY'

# Python 3.10+, standard library only
python3 examples/python/call.py search --keyword coffee
python3 examples/python/call.py search --keyword coffee --csv output/notes.csv
python3 examples/python/call.py pgy --user_id YOUR_USER_ID

# Node.js 22+, no npm dependencies
node examples/node/call.mjs search --keyword coffee
node examples/node/call.mjs note --note_id YOUR_NOTE_ID

# cURL
bash examples/curl/search.sh coffee
```

Each command makes one request. There is no automatic retry or pagination. API requests are billed at your account's applicable rates; using the example code itself is free.

For an offline preview, no key or network request is needed:

```bash
python3 examples/python/call.py search --demo --csv output/demo.csv
node examples/node/call.mjs pgy --demo
```

[Commands and parameters](examples/README.md) · [Pagination](docs/quickstart.md) · [Error handling](docs/troubleshooting.md)

## Response examples

The [response directory](examples/responses) contains sanitized, shortened excerpts derived from the published documentation. IDs, names and content are demonstration values; these files are not live results. Response structures vary by endpoint. Both clients check HTTP status and top-level business errors before treating a response as successful.

## Pricing

Public default prices checked on **October 14, 2026**, in CNY per request:

| Endpoint | Default price |
| --- | ---: |
| Xiaohongshu note search V1 | ¥0.03 |
| Xiaohongshu note details V1 | ¥0.03 |
| Xiaohongshu top-level comments V1 | ¥0.03 |
| Xiaohongshu user profile V1 | ¥0.03 |
| Pugongying creator profile | ¥0.04 |

Your account-specific price is shown in the console. See [current pricing](https://galaxysapi.com/api-docs/#pricing) and [registration](https://galaxysapi.com/login?mode=register&utm_source=github&utm_medium=readme&utm_campaign=xiaohongshu).

## Companion platforms

The same service also provides [Douyin](https://galaxysapi.com/api-docs/#group-douyin-app) and [Bilibili](https://galaxysapi.com/api-docs/#group-bilibili-app) video, comment, user and search APIs. Xiaohongshu remains the focus of this repository.

## Support and license

Report example-code issues through [Issues](https://github.com/luckfexuanxuan-code/galaxy-xiaohongshu-api/issues). Include the endpoint, time and sanitized error, never API keys or account information. For account and billing questions, use support in the [Galaxy API platform](https://galaxysapi.com/).

Example code is provided under the [MIT License](LICENSE). Galaxy API is an independent service and is not officially affiliated with Xiaohongshu, Douyin or Bilibili. Use data within the scope of your authorization.
