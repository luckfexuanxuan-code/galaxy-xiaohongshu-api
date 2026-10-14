# 接口目录

按 2026-10-14 的公开 API 文档整理。小红书 App、Web 和蒲公英优先列出，其他平台在下方。最新参数、价格和可用情况以 [在线文档](https://galaxysapi.com/api-docs/) 为准。

下面的路径均以 `https://api.galaxysapi.com` 为前缀，通过 `Authorization` 请求头传入完整 API Key。

## 小红书 App

| 接口 | 请求 | 参数与返回 |
| --- | --- | --- |
| 小红书笔记搜索V1 | `GET /api/search_note_v1` | [查看文档](https://galaxysapi.com/api-docs/#api-search_note_v1) |
| 小红书一级评论V1 | `GET /api/get_note_comment_v1` | [查看文档](https://galaxysapi.com/api-docs/#api-get_note_comment_v1) |
| 小红书二级评论V1 | `GET /api/get_note_sub_comment_v1` | [查看文档](https://galaxysapi.com/api-docs/#api-get_note_sub_comment_v1) |
| 小红书笔记详情V1 | `GET /api/get_note_detail_v1` | [查看文档](https://galaxysapi.com/api-docs/#api-get_note_detail_v1) |
| 小红书用户信息V1 | `GET /api/get_user_info_v1` | [查看文档](https://galaxysapi.com/api-docs/#api-get_user_info_v1) |
| 小红书用户作品列表V1 | `GET /api/user_note_list_v1` | [查看文档](https://galaxysapi.com/api-docs/#api-user_note_list_v1) |
| 小红书用户搜索V1 | `GET /api/search_user_v1` | [查看文档](https://galaxysapi.com/api-docs/#api-search_user_v1) |
| 小红书用户粉丝列表V1 | `GET /api/user_followers_v1` | [查看文档](https://galaxysapi.com/api-docs/#api-user_followers_v1) |
| 小红书商品搜索V1 | `GET /api/search_products_v1` | [查看文档](https://galaxysapi.com/api-docs/#api-search_products_v1) |
| 小红书商品详情V1 | `GET /api/get_product_detail_v1` | [查看文档](https://galaxysapi.com/api-docs/#api-get_product_detail_v1) |
| 小红书商品评论V1 | `GET /api/get_product_reviews_v1` | [查看文档](https://galaxysapi.com/api-docs/#api-get_product_reviews_v1) |
| 视频笔记详情 | `GET /api/get_note_detail_video` | [查看文档](https://galaxysapi.com/api-docs/#api-get_note_detail_video) |
| 小红书更新xsec_token(App) | `GET /api/update_xsec_token_web` | [查看文档](https://galaxysapi.com/api-docs/#api-update_xsec_token_web) |
| 话题标签笔记 | `GET /api/tag_notes` | [查看文档](https://galaxysapi.com/api-docs/#api-tag_notes) |

## 小红书 Web

| 接口 | 请求 | 参数与返回 |
| --- | --- | --- |
| 小红书笔记详情(Web) | `GET /api/get_note_detail_web` | [查看文档](https://galaxysapi.com/api-docs/#api-get_note_detail_web) |
| 小红书红薯号转用户ID(Web) | `GET /api/get_user_id_by_red_id` | [查看文档](https://galaxysapi.com/api-docs/#api-get_user_id_by_red_id) |
| 小红书用户搜索(Web) | `GET /api/search_user_web` | [查看文档](https://galaxysapi.com/api-docs/#api-search_user_web) |
| 小红书笔记搜索(Web) | `GET /api/search_note_web` | [查看文档](https://galaxysapi.com/api-docs/#api-search_note_web) |
| 小红书关联词搜索(Web) | `GET /api/search_related_words_web` | [查看文档](https://galaxysapi.com/api-docs/#api-search_related_words_web) |
| 小红书一级评论(Web) | `GET /api/get_note_comment_web` | [查看文档](https://galaxysapi.com/api-docs/#api-get_note_comment_web) |
| 小红书笔记二级评论(Web) | `GET /api/get_note_sub_comment_web` | [查看文档](https://galaxysapi.com/api-docs/#api-get_note_sub_comment_web) |
| 达人商品笔记列表(Web) | `GET /api/get_user_posts_web` | [查看文档](https://galaxysapi.com/api-docs/#api-get_user_posts_web) |
| 小红书商品详情(Web) | `GET /api/xhs_goods_detail_web` | [查看文档](https://galaxysapi.com/api-docs/#api-xhs_goods_detail_web) |

## 小红书蒲公英

| 接口 | 请求 | 参数与返回 |
| --- | --- | --- |
| 蒲公英作者信息 | `GET /api/pgy_author_info` | [查看文档](https://galaxysapi.com/api-docs/#api-pgy_author_info) |
| 蒲公英作者数据表现 | `GET /api/pgy_author_data_performance` | [查看文档](https://galaxysapi.com/api-docs/#api-pgy_author_data_performance) |
| 蒲公英作者成长表现 | `GET /api/pgy_author_growth_performance` | [查看文档](https://galaxysapi.com/api-docs/#api-pgy_author_growth_performance) |
| 蒲公英作者笔记列表 | `GET /api/pgy_author_notes_list` | [查看文档](https://galaxysapi.com/api-docs/#api-pgy_author_notes_list) |
| 蒲公英作者推广成本估算 | `GET /api/pgy_author_promotion_cost` | [查看文档](https://galaxysapi.com/api-docs/#api-pgy_author_promotion_cost) |
| 蒲公英达人列表 | `GET /api/pgy_blogger_list` | [查看文档](https://galaxysapi.com/api-docs/#api-pgy_blogger_list) |
| 蒲公英核心指标 | `GET /api/pgy_core_metrics` | [查看文档](https://galaxysapi.com/api-docs/#api-pgy_core_metrics) |
| 蒲公英数据概览 | `GET /api/pgy_data_overview` | [查看文档](https://galaxysapi.com/api-docs/#api-pgy_data_overview) |
| 蒲公英粉丝增长 | `GET /api/pgy_fans_growth` | [查看文档](https://galaxysapi.com/api-docs/#api-pgy_fans_growth) |
| 蒲公英粉丝标签 | `GET /api/pgy_fans_tags` | [查看文档](https://galaxysapi.com/api-docs/#api-pgy_fans_tags) |
| 蒲公英笔记详情 | `GET /api/pgy_note_detail` | [查看文档](https://galaxysapi.com/api-docs/#api-pgy_note_detail) |

## 抖音 App（配套）

| 接口 | 请求 | 参数与返回 |
| --- | --- | --- |
| 抖音视频详情 | `GET /api/douyin_video_detail` | [查看文档](https://galaxysapi.com/api-docs/#api-douyin_video_detail) |
| 获取抖音短链 | `GET /api/douyin_short_url` | [查看文档](https://galaxysapi.com/api-docs/#api-douyin_short_url) |
| 抖音视频评论 | `GET /api/douyin_video_comments` | [查看文档](https://galaxysapi.com/api-docs/#api-douyin_video_comments) |
| 抖音视频二级评论 | `GET /api/douyin_comment_replies` | [查看文档](https://galaxysapi.com/api-docs/#api-douyin_comment_replies) |
| 抖音用户信息 | `GET /api/douyin_user_profile` | [查看文档](https://galaxysapi.com/api-docs/#api-douyin_user_profile) |
| 抖音用户粉丝列表 | `GET /api/douyin_user_fans` | [查看文档](https://galaxysapi.com/api-docs/#api-douyin_user_fans) |
| 抖音用户作品列表 | `GET /api/douyin_user_videos` | [查看文档](https://galaxysapi.com/api-docs/#api-douyin_user_videos) |
| 抖音综合搜索 | `POST /api/douyin_general_search` | [查看文档](https://galaxysapi.com/api-docs/#api-douyin_general_search) |

## 哔哩哔哩APP（配套）

| 接口 | 请求 | 参数与返回 |
| --- | --- | --- |
| 哔哩哔哩App视频详情 | `GET /api/bilibili_video_detail` | [查看文档](https://galaxysapi.com/api-docs/#api-bilibili_video_detail) |
| 哔哩哔哩App一级评论 | `GET /api/bilibili_video_comments` | [查看文档](https://galaxysapi.com/api-docs/#api-bilibili_video_comments) |
| 哔哩哔哩App二级回复 | `GET /api/bilibili_comment_replies` | [查看文档](https://galaxysapi.com/api-docs/#api-bilibili_comment_replies) |
| 哔哩哔哩App用户资料 | `GET /api/bilibili_user_info` | [查看文档](https://galaxysapi.com/api-docs/#api-bilibili_user_info) |
| 哔哩哔哩App用户作品 | `GET /api/bilibili_user_videos` | [查看文档](https://galaxysapi.com/api-docs/#api-bilibili_user_videos) |
| 哔哩哔哩App综合搜索 | `GET /api/bilibili_search_all` | [查看文档](https://galaxysapi.com/api-docs/#api-bilibili_search_all) |
| 哔哩哔哩App分类搜索 | `GET /api/bilibili_search_by_type` | [查看文档](https://galaxysapi.com/api-docs/#api-bilibili_search_by_type) |
