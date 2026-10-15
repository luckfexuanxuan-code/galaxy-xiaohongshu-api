# 常见问题

## 没有设置密钥

先设置 `GALAXY_API_KEY` 环境变量，再运行脚本。需要预览输出时使用 `--demo`，无需真实密钥。

## HTTP 状态与业务状态

HTTP 200 并不总是意味着业务成功。脚本同时检查顶层 `code` 与 `success`，并在失败时以非零退出码结束。各接口 `data` 中的业务状态、内容删除提示等，需要结合对应文档处理。

| 状态码 | 建议处理 |
| --- | --- |
| 400 | 核对参数名称、必填项、ID 格式和取值范围 |
| 401 | 核对 API Key，确认请求头直接传完整密钥 |
| 402 | 根据返回说明检查密钥有效期、余额及配额 |
| 403 | 检查密钥是否停用或账户受限 |
| 404 | 核对接口路径和内容标识 |
| 429 | 降低请求频率；有 `Retry-After` 时按提示等待 |
| 500 / 503 | 记录接口、时间和错误说明，按提示等待后处理 |

脚本不会自动重试。接口查询可能计费，排查时应避免无限循环请求。具体计费规则以平台为准。

## 返回成功，但笔记无法展示

如果笔记详情中的 `data[].note_list[]` 出现 `model_type=error`，应结合其 `text` 判断内容是否已经删除或不可用，不要把该条目当作正常正文。

## 评论没有全部返回

评论接口分页返回。检查 `data.has_more`，按文档回传上一页游标。一级评论与二级回复是不同接口；已附带返回的回复可直接使用。

## CSV 没有数据

导出只提取搜索响应中的笔记条目。先查看打印的 JSON，确认 `data.items` 中存在 `model_type=note` 和 `note` 对象；其他搜索卡片不会导出。

## 反馈问题

[提交 Issue](https://github.com/luckfexuanxuan-code/galaxy-xiaohongshu-api/issues) 时附上接口名、时间、运行命令（隐藏密钥）和脱敏错误信息。账户及付款问题请通过平台客服处理。

[完整响应说明](https://galaxysapi.com/api-docs/?utm_source=github&utm_medium=docs&utm_campaign=xiaohongshu#response-format)
