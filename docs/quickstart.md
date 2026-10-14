# 接入与分页

## 准备密钥

在 [Galaxy API](https://galaxysapi.com/login?mode=register&utm_source=github&utm_medium=docs&utm_campaign=xiaohongshu) 注册并验证邮箱，前往 [API 密钥](https://galaxysapi.com/console/api-keys) 创建密钥。确认密钥启用、未过期，且余额及配额足够。

将密钥设置为环境变量，示例不会自动读取 `.env` 文件：

```bash
export GALAXY_API_KEY='你的_API_Key'
```

Windows PowerShell：

```powershell
$env:GALAXY_API_KEY = '你的_API_Key'
python examples/python/call.py search --keyword 咖啡
```

所有示例通过 `Authorization: <完整 API Key>` 鉴权。不要添加 `Bearer ` 前缀。

## 先用离线模式查看输出

在仓库根目录执行：

```bash
python3 examples/python/call.py search --demo
node examples/node/call.mjs comments --demo
```

离线模式读取本地脱敏 JSON，不需要密钥，不会联网。示例 ID、名称和令牌不能用于真实调用。在线模式请使用你的有效内容 ID。

## 查询小红书笔记

```bash
python3 examples/python/call.py search --keyword 咖啡 --page 1 --page_size 20
```

关键词由客户端 URL 编码，支持中文及特殊字符。搜索可选参数包括 `sort`、`note_type`、`note_range`、`note_time`、`search_id`、`session_id`，具体取值见 [接口文档](https://galaxysapi.com/api-docs/#api-search_note_v1)。

图文笔记详情默认使用 `node_type=images`；查询视频笔记时按文档传 `node_type=video`：

```bash
python3 examples/python/call.py note --note_id YOUR_VIDEO_NOTE_ID --node_type video
```

## 分页与请求次数

- **搜索**：使用 `page`、`page_size`。如响应提供后续请求所需的搜索或会话标识，按接口文档回传。不要把请求参数名直接当作响应字段名。
- **评论**：查看响应 `data.has_more`；需要下一页时，把上一页实际返回的 `data.cursor` 原样传入 `--cursor`。游标可能是 JSON 字符串，请在命令行中使用引号。
- **其它接口**：以各自文档的分页参数为准，不同接口的响应结构和游标字段可能不同。

脚本每次只发送一个请求，不自动分页、不自动重试。页大小不等同于最终返回条数；数据实际可用性以接口响应为准。

## 导出 CSV

```bash
python3 examples/python/call.py search --keyword 咖啡 --csv output/notes.csv
```

仅提取 `data.items` 中 `model_type=note` 的条目，保留笔记 ID、标题、作者 ID、作者名称、点赞、评论、收藏。CSV 使用 UTF-8 BOM，文本字段处理了常见的表格公式前缀。每次运行覆盖指定 CSV；可为不同页指定不同文件名。

## 响应检查

Python 和 Node.js 示例会检查 HTTP 状态和顶层 `code` / `success`。`code=0` 或 `200` 表示通过这一层检查。`data` 内的内容状态仍需由你的业务判断，例如笔记详情中的 `model_type=error` 表示该内容不可正常展示。

遇到错误时查看 [排查说明](troubleshooting.md)。API 消费可在 [用量页面](https://galaxysapi.com/console/api-usage) 核对。
