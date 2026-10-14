<p align="center"><img src="assets/banner.svg" alt="Galaxy API 小红书数据接口：笔记搜索、内容详情、评论、用户资料与蒲公英达人数据" width="100%"></p>

# Galaxy API｜小红书数据接口

**把小红书笔记、评论和达人数据接入你的应用。**

Galaxy API 提供小红书 App、Web 及蒲公英数据接口，覆盖笔记搜索、内容详情、评论回复、用户作品与达人数据查询。本仓库提供接入说明、可运行代码和脱敏返回示例，适用于内容检索、评论分析、达人研究与数据看板。

**[查看接口文档](https://galaxysapi.com/api-docs/?utm_source=github&utm_medium=readme&utm_campaign=xiaohongshu)** · **[注册账号](https://galaxysapi.com/login?mode=register&utm_source=github&utm_medium=readme&utm_campaign=xiaohongshu)** · **[访问官网](https://galaxysapi.com/?utm_source=github&utm_medium=readme&utm_campaign=xiaohongshu)** · [English](README.en.md)

## 小红书：从内容发现到达人研究

| 能力 | 可以获取什么 | 文档 |
| --- | --- | --- |
| 笔记搜索 | 按关键词查找笔记，按排序、内容类型等条件筛选 | [搜索接口](https://galaxysapi.com/api-docs/#api-search_note_v1) |
| 笔记详情 | 图文或视频笔记的正文、作者与互动信息 | [详情接口](https://galaxysapi.com/api-docs/#api-get_note_detail_v1) |
| 评论与回复 | 一级评论、二级回复，按接口参数分页读取 | [评论接口](https://galaxysapi.com/api-docs/#api-get_note_comment_v1) |
| 用户与作品 | 用户资料、作品列表、用户搜索 | [小红书 App](https://galaxysapi.com/api-docs/#group-xiaohongshu-app) |
| Web 接口 | Web 端笔记详情、搜索、评论等能力 | [小红书 Web](https://galaxysapi.com/api-docs/#group-xiaohongshu-web) |
| 商品与话题 | 商品搜索、详情、评论及话题笔记 | [完整目录](docs/endpoints.md) |

### 蒲公英：小红书达人数据

查看达人资料、数据表现、成长表现、笔记列表、粉丝增长和粉丝标签，将内容数据与达人研究结合起来。

- [作者信息](https://galaxysapi.com/api-docs/#api-pgy_author_info)：从小红书用户 ID 查询达人资料。
- [全部蒲公英接口](https://galaxysapi.com/api-docs/#group-xiaohongshu-pgy)：按场景选择指标与参数。
- [本地返回示例](examples/responses/pgy_author_info.json)：查看脱敏后的字段结构。

## 快速开始

1. [注册 Galaxy API 账号](https://galaxysapi.com/login?mode=register&utm_source=github&utm_medium=readme&utm_campaign=xiaohongshu)，完成邮箱验证。
2. 在控制台的 [API 密钥](https://galaxysapi.com/console/api-keys) 页面创建密钥，并确认账户余额及密钥配额。
3. 通过请求头 `Authorization` 直接传入完整 API Key。

请求地址：`https://api.galaxysapi.com`。这里直接填写密钥，不加 `Bearer ` 前缀。

```bash
export GALAXY_API_KEY='替换为你的_API_Key'

curl --get 'https://api.galaxysapi.com/api/search_note_v1' \
  --header "Authorization: $GALAXY_API_KEY" \
  --data-urlencode 'keyword=咖啡' \
  --data-urlencode 'page=1' \
  --data-urlencode 'page_size=20' \
  --connect-timeout 10 --max-time 60 --fail-with-body
```

API 调用按账户对应单价计费；示例代码本身不收费。以下脚本每次运行只请求一页，不自动重试或连续翻页。

### Python / Node.js

Python 3.10+、Node.js 22+，均使用标准库，无需安装第三方依赖。

```bash
git clone https://github.com/luckfexuanxuan-code/galaxy-xiaohongshu-api.git
cd galaxy-xiaohongshu-api

# 搜索小红书笔记
python3 examples/python/call.py search --keyword 咖啡
node examples/node/call.mjs search --keyword 咖啡

# 将这一页搜索结果整理为 CSV
python3 examples/python/call.py search --keyword 咖啡 --csv output/notes.csv

# 查询笔记、评论、用户或蒲公英达人资料：替换为真实有效的 ID
python3 examples/python/call.py note --note_id YOUR_NOTE_ID
python3 examples/python/call.py comments --note_id YOUR_NOTE_ID
python3 examples/python/call.py user --user_id YOUR_USER_ID
python3 examples/python/call.py pgy --user_id YOUR_USER_ID
```

想先看输出结构，可以运行离线演示；`--demo` 不需要密钥，不发起 API 请求，也不产生费用。

```bash
python3 examples/python/call.py search --demo --csv output/demo.csv
node examples/node/call.mjs pgy --demo
```

[全部运行方式](examples/README.md) · [参数与分页说明](docs/quickstart.md) · [错误处理](docs/troubleshooting.md)

## 返回示例

下面节选自笔记搜索响应。名称、标识和内容已经替换为示例值，部分字段省略；仅用于展示结构，不代表实时查询结果。

```json
{
  "code": 200,
  "message": "成功",
  "data": {
    "items": [
      {
        "model_type": "note",
        "note": {
          "id": "EXAMPLE_NOTE_ID",
          "title": "示例笔记标题",
          "user": { "userid": "EXAMPLE_USER_ID", "nickname": "示例用户" },
          "liked_count": 381,
          "comments_count": 95,
          "collected_count": 348
        }
      }
    ]
  }
}
```

各接口的 `data` 结构可能不同。完整字段及更多示例请查看对应的 [API 文档](https://galaxysapi.com/api-docs/)。

## 价格与开通

以下为 **2026-10-14 核对的公开默认价格**，单位为人民币元/次；账户实际价格以控制台为准。

| 接口 | 公开默认单价 |
| --- | ---: |
| 小红书笔记搜索 V1 | ¥0.03 |
| 小红书笔记详情 V1 | ¥0.03 |
| 小红书一级评论 V1 | ¥0.03 |
| 小红书用户信息 V1 | ¥0.03 |
| 蒲公英作者信息 | ¥0.04 |

[查看完整定价](https://galaxysapi.com/api-docs/#pricing) · [注册并创建密钥](https://galaxysapi.com/login?mode=register&utm_source=github&utm_medium=readme&utm_campaign=xiaohongshu) · [控制台](https://galaxysapi.com/console/dashboard)

## 配套接口

在小红书之外，同一平台还提供：

- **抖音**：视频详情、评论与回复、用户资料、作品列表和搜索。[文档](https://galaxysapi.com/api-docs/#group-douyin-app)
- **哔哩哔哩**：视频详情、评论与回复、用户资料、作品列表和搜索。[文档](https://galaxysapi.com/api-docs/#group-bilibili-app)

对应运行命令见 [示例说明](examples/README.md)，完整接口见 [接口目录](docs/endpoints.md)。

## 反馈与维护

- 接入或示例问题：提交 [Issue](https://github.com/luckfexuanxuan-code/galaxy-xiaohongshu-api/issues)，附接口名、时间、状态码和脱敏后的错误说明。
- 价格、余额、密钥等账户事项：登录 [Galaxy API](https://galaxysapi.com/) 后通过平台客服处理。不要在 Issue 中提交 API Key 或账户信息。
- 版本记录：[CHANGELOG](CHANGELOG.md)。示例代码采用 [MIT License](LICENSE)；API 服务按平台规则计费。

Galaxy API 为独立服务，与小红书、抖音、哔哩哔哩不存在官方隶属关系。请在获得所需授权的范围内使用数据。
