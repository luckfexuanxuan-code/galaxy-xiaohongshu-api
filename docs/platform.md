# 小红书数据采集分析平台

Galaxy API 将网页采集工具、数据管理、分析报告和 API 接入放在同一平台。内容研究、运营和分析人员可以通过界面完成采集与整理，开发者则可以调用接口连接自己的系统。

[进入工作台](https://galaxysapi.com/platform?utm_source=github&utm_medium=docs&utm_campaign=xiaohongshu) · [注册账号](https://galaxysapi.com/login?mode=register&utm_source=github&utm_medium=docs&utm_campaign=xiaohongshu) · [API 文档](https://galaxysapi.com/api-docs/?utm_source=github&utm_medium=docs&utm_campaign=xiaohongshu)

## 1. 选择工具，批量采集

功能广场支持按平台、功能分类和能力标签筛选，也可以直接搜索工具。小红书功能覆盖笔记搜索、评论与回复、笔记详情、博主发帖、用户资料，以及商品和话题相关采集。

进入对应功能后，填写关键词、笔记 ID/链接或用户主页，按该功能配置页数、排序等参数，即可创建采集任务。部分功能支持文件导入或从数据中心已有任务导入。

![小红书采集工作台](../assets/screenshots/01-workbench.png)

## 2. 查看任务进度

任务运行时可以查看采集进度、数量、用时和状态，并按需要停止任务。切换到数据中心等页面后，仍可通过浮动任务进度查看运行情况。

![关键词采集与进度展示，使用演示数据](../assets/screenshots/02-collection.png)

## 3. 在数据中心整理结果

- 按任务类型、名称、任务 ID 和创建日期查找数据。
- 打开任务表格，预览正文、评论、作者和互动字段。
- 全任务搜索，结合关键词、数值区间、时间范围和排序筛选记录。
- 将同类型任务合并为新任务，保留全部记录或按选定字段去重，原任务保留。
- 导出 CSV 或 XLSX；预览页导出沿用当前筛选与排序。

支持的任务还可预览图片和视频，下载成功归档的媒体 ZIP。实际可下载内容与账户权限、任务类型和归档状态有关。

![数据中心任务列表，使用演示数据](../assets/screenshots/03-data-center.png)

![数据预览与处理入口，展示维多利亚港搜索任务的真实笔记数据](../assets/screenshots/04-data-preview.png)

上图使用任务 `search_20261004192802_c39f` 的真实采集结果：关键词“维多利亚港”，共 20 条笔记，可查看笔记标题、正文、图片与互动字段。

## 4. 评论分析：理解用户反馈

从数据中心选择评论任务，或上传本地 CSV/XLSX 等支持的文件，提交分析范围。报告围绕用户关注点、高频问题、购买与回购信号、负面顾虑、竞品提及和逐篇评论表现展开，并提供行动建议与评论区回复参考。

当前评论分析面向小红书美妆、个护类目。报告中的异常评论判断、用户信号和行动建议应结合业务背景理解。

![评论分析报告公开示例](../assets/screenshots/05-comment-report.png)

[查看完整评论报告示例](https://galaxysapi.com/api/reports/sample?utm_source=github&utm_medium=docs&utm_campaign=xiaohongshu)

## 5. 视频内容分析：复盘表达方式

小红书视频内容分析支持从同平台的数据任务导入、直接粘贴链接，或上传 TXT/CSV/XLSX 链接清单。围绕视频口播原文及可获得的公开互动数据，分析开头、内容主线、产品出现位置、证据表达、达人人设与转化引导，形成下一轮内容 brief 的调整建议。

内容分析当前支持视频口播，图文暂不支持；无法访问或无法获取口播的视频需联系平台处理。缺失的公开指标会标记为未获取。

![视频内容分析报告公开示例](../assets/screenshots/06-content-report.png)

[查看完整内容报告示例](https://galaxysapi.com/api/reports/content-sample?utm_source=github&utm_medium=docs&utm_campaign=xiaohongshu)

评论与内容报告均在提交数据、确认订单后，由分析人员处理、复核和交付。可在 [控制台 → 数据分析](https://galaxysapi.com/console/comment-reports?utm_source=github&utm_medium=docs&utm_campaign=xiaohongshu) 跟踪状态、查看和下载已交付文件。

## 6. 开发者接入

小红书 App、Web 和蒲公英接口用于连接自有业务系统。仓库中的 Python、Node.js、cURL 示例提供请求方式、参数传递和响应检查；控制台提供密钥管理与调用记录。

[API 快速开始](quickstart.md) · [接口目录](endpoints.md) · [运行示例](../examples/README.md)

## 截图说明

数据预览截图更新于 2026-10-15，使用当前平台前端展示任务 `search_20261004192802_c39f` 已保存的 20 条真实笔记，账户头像使用演示信息。其余截图拍摄于 2026-10-14，工作台、采集进度及数据中心任务列表使用合成演示数据。截图过程未重新运行采集任务。

评论与内容报告截图来自官网公开历史示例，用于展示分析维度；历史样例可能包含当前暂不支持提交的内容类型，当前范围以上文及平台页面为准。具体功能以当前平台及账户权限为准。
