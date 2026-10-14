# 调用示例

在仓库根目录执行命令。Python 3.10+ 与 Node.js 22+ 均无需第三方依赖。

| 命令 | 接口 | 在线调用必需参数 |
| --- | --- | --- |
| `search` | 小红书笔记搜索 V1 | `--keyword`，默认“咖啡” |
| `note` | 小红书笔记详情 V1 | `--note_id` |
| `comments` | 小红书一级评论 V1 | `--note_id` |
| `user` | 小红书用户信息 V1 | `--user_id` |
| `pgy` | 蒲公英作者信息 | `--user_id` |
| `douyin` | 抖音视频详情（配套） | `--aweme_id` |
| `bilibili` | 哔哩哔哩视频详情（配套） | `--bv_id` |

通用格式：

```bash
export GALAXY_API_KEY='你的_API_Key'
python3 examples/python/call.py COMMAND --参数名 参数值
node examples/node/call.mjs COMMAND --参数名 参数值
```

参数通过 query string 传递。完整参数以 [在线文档](https://galaxysapi.com/api-docs/) 为准；示例支持的参数列表保存在 [endpoints.json](endpoints.json)。哔哩哔哩视频详情在服务端也支持 AV 号，这里的快捷示例使用 BV 号。

## 小红书与蒲公英

```bash
python3 examples/python/call.py search --keyword 露营 --sort time_descending
node examples/node/call.mjs search --keyword 露营 --note_type video
python3 examples/python/call.py note --note_id YOUR_NOTE_ID --node_type images
node examples/node/call.mjs comments --note_id YOUR_NOTE_ID --num 15
python3 examples/python/call.py user --user_id YOUR_USER_ID
node examples/node/call.mjs pgy --user_id YOUR_USER_ID
```

每次在线运行只调用一次，按平台规则计费。不会自动重试或连续翻页。

## CSV 导出（Python）

```bash
python3 examples/python/call.py search --keyword 露营 --csv output/notes.csv
```

`--csv` 仅适用于 `search`，导出当前这一页。Node.js 示例输出 JSON，不提供 CSV 选项。

## 离线演示

全部七个命令均支持 `--demo`，使用本地脱敏节选，不检查密钥、不联网、不计费：

```bash
python3 examples/python/call.py search --demo --csv output/demo.csv
node examples/node/call.mjs pgy --demo
```

## 配套接口

```bash
python3 examples/python/call.py douyin --aweme_id YOUR_AWEME_ID
node examples/node/call.mjs bilibili --bv_id YOUR_BV_ID
```

## cURL

```bash
bash examples/curl/search.sh 咖啡
```

cURL 示例需要支持 `--fail-with-body` 的版本（7.76+），会保留 HTTP 错误响应体。它不解析业务 `code`；需要自动检查业务错误时，使用 Python 或 Node.js 示例。

## 返回样例来源

[responses](responses) 中的文件来自 Galaxy API 已公开文档的返回样例，并进一步挑选字段、替换名称与标识。它们是**脱敏节选**，不代表完整字段清单或实时结果。生成日期：2026-10-14。完整返回与字段类型见各接口在线文档。

## 本地检查

以下检查使用本地样例和模拟 HTTP 响应，不调用计费接口：

```bash
python3 -m unittest discover -s tests -v
node --test tests/node.test.mjs
bash -n examples/curl/search.sh
```
