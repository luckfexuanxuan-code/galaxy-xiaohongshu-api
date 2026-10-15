<p align="center"><img src="assets/banner.svg" alt="Galaxy API — Xiaohongshu Data Collection and Analysis Platform" width="100%"></p>

# Galaxy API — Xiaohongshu Data Collection and Analysis Platform

**Collect Xiaohongshu data, organize results, and understand audience feedback and content performance.**

Galaxy API is a Xiaohongshu (小红书 / RedNote / XHS) data collection and analysis platform for content teams, brand researchers and developers. Create collection tasks from keywords, note links or user profiles in the web workbench, then preview, filter, merge and export the results in Data Center.

The platform supports note searches, comment collection, creator works and user profiles. Export results to Excel or CSV, and submit comment or video content analysis requests as needed. This repository provides platform features, screenshots, practical guides and API integration examples.

**[Open the workbench](https://galaxysapi.com/platform?utm_source=github&utm_medium=readme&utm_campaign=xiaohongshu)** · **[API documentation](https://galaxysapi.com/api-docs/?utm_source=github&utm_medium=readme&utm_campaign=xiaohongshu)** · **[Create an account](https://galaxysapi.com/login?mode=register&utm_source=github&utm_medium=readme&utm_campaign=xiaohongshu)** · [简体中文](README.md)

## Platform features

| Module | What you can do |
| --- | --- |
| Collection workbench | Enter keywords, note links or user profiles in a form and configure a batch collection task |
| Task progress | Track progress, record counts and status; keep following active tasks while navigating between pages |
| Data Center | Find tasks by type, name or date and preview collected records |
| Data preparation | Search across a task, filter by keywords, numeric values and dates, sort, merge tasks of the same type and deduplicate by selected fields |
| Export and media | Export CSV/XLSX; preview images and videos and download archived media for supported tasks |
| Comment analysis | Submit task data or local files for analysis of audience concerns, purchase signals, objections, competitor mentions and individual posts |
| Video content analysis | Submit Xiaohongshu video links for transcript-based analysis of hooks, storylines, product placement and engagement, with recommendations for the next content brief |
| Developer access | Use the App, Web and Pugongying APIs; manage API keys and review usage in the console |

**Workflow: choose a tool → provide inputs → collect data → preview and organize → export or request analysis.**

[Platform guide (Chinese)](docs/platform.md) · [Data Center](https://galaxysapi.com/data?utm_source=github&utm_medium=readme&utm_campaign=xiaohongshu) · [Data analysis](https://galaxysapi.com/console/comment-reports?utm_source=github&utm_medium=readme&utm_campaign=xiaohongshu)

## Xiaohongshu practical guides

The following public guides support Chinese and English through the page language selector.

| Guide | What you will learn |
| --- | --- |
| [Comment collection](https://galaxysapi.com/guides/xiaohongshu-comment-collection?utm_source=github&utm_medium=readme&utm_campaign=xiaohongshu) | Prepare note links, configure collection, preview and export comments |
| [Excel and CSV export](https://galaxysapi.com/guides/xiaohongshu-excel-export?utm_source=github&utm_medium=readme&utm_campaign=xiaohongshu) | Search notes, filter records, merge batches and deduplicate results |
| [Comment analysis](https://galaxysapi.com/guides/xiaohongshu-comment-analysis?utm_source=github&utm_medium=readme&utm_campaign=xiaohongshu) | Prepare samples, submit reports and study audience concerns and purchase signals |
| [API integration](https://galaxysapi.com/guides/xiaohongshu-api-integration?utm_source=github&utm_medium=readme&utm_campaign=xiaohongshu) | Configure API keys, search notes and retrieve details and comments |

## Platform screenshots

**Choose a Xiaohongshu collection tool.**

![Xiaohongshu collection workbench](assets/screenshots/01-workbench.png)

**Preview note titles, text, images and engagement; search, filter and export collected records.**

![Data preview with actual notes from a Victoria Harbour search task](assets/screenshots/04-data-preview.png)

<details>
<summary>View collection progress, Data Center and analysis reports</summary>

**Batch collection and progress**

![Xiaohongshu keyword collection: parameters and progress](assets/screenshots/02-collection.png)

**Task management in Data Center**

![Data Center: task search, status, preview and batch actions](assets/screenshots/03-data-center.png)

**Comment analysis report example**

![Published comment analysis report example](assets/screenshots/05-comment-report.png)

[Open the comment report example](https://galaxysapi.com/api/reports/sample?utm_source=github&utm_medium=readme&utm_campaign=xiaohongshu)

**Video content analysis report example**

![Published video content analysis report example](assets/screenshots/06-content-report.png)

[Open the content report example](https://galaxysapi.com/api/reports/content-sample?utm_source=github&utm_medium=readme&utm_campaign=xiaohongshu)

</details>

## Xiaohongshu API capabilities

| Area | Capabilities |
| --- | --- |
| Search | Keyword searches, sorting and note-type filters |
| Notes | Image/video note details, authors and engagement fields |
| Comments | Top-level comments and replies |
| Users | Profiles, published notes and user search |
| Web | Web note details, searches and comments |
| Pugongying | Creator profiles, performance, growth, notes and audience metrics |

Browse the [endpoint directory](docs/endpoints.md) or the [online documentation](https://galaxysapi.com/api-docs/?utm_source=github&utm_medium=readme&utm_campaign=xiaohongshu).

## API quick start

Create an account, create an API key in the [console](https://galaxysapi.com/console/api-keys?utm_source=github&utm_medium=readme&utm_campaign=xiaohongshu), and check your balance and key quota. Pass the full key in the `Authorization` header **without a `Bearer ` prefix**.

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

Each command makes one request. There is no automatic retry or pagination. API requests are billed according to the platform's terms; using the example code itself is free.

For an offline preview, no key or network request is needed:

```bash
python3 examples/python/call.py search --demo --csv output/demo.csv
node examples/node/call.mjs pgy --demo
```

[Commands and parameters](examples/README.md) · [Pagination](docs/quickstart.md) · [Error handling](docs/troubleshooting.md)

## Response examples

The [response directory](examples/responses) contains sanitized, shortened excerpts derived from the published documentation. IDs, names and content are demonstration values; these files are not live results. Response structures vary by endpoint. Both clients check HTTP status and top-level business errors before treating a response as successful.

## Get access

[Create an account](https://galaxysapi.com/login?mode=register&utm_source=github&utm_medium=readme&utm_campaign=xiaohongshu) · [Read the documentation](https://galaxysapi.com/api-docs/?utm_source=github&utm_medium=readme&utm_campaign=xiaohongshu) · [Open the console](https://galaxysapi.com/console/dashboard?utm_source=github&utm_medium=readme&utm_campaign=xiaohongshu)

## Support

Report example-code issues through [Issues](https://github.com/luckfexuanxuan-code/galaxy-xiaohongshu-api/issues). Include the endpoint, time and sanitized error, never API keys or account information. For account and billing questions, use support in the [Galaxy API platform](https://galaxysapi.com/?utm_source=github&utm_medium=readme&utm_campaign=xiaohongshu).
