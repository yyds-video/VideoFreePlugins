# VideoFreePlugins 插件集合

VideoFreePlugins 是专为 **VideoFree (flutter_v)** 视频播放器打造的官方与社区精选插件库。

设计理念与规范深度对标 [MusicFreePlugins](https://github.com/maotoumao/MusicFreePlugins)，已将原项目 30+ 优质影视采集源与全网综合资源全部插件化，支持通过 JavaScript 脚本扩展任意第三方视频源（包括开放 API、网页爬虫、防盗链解析与网页嗅探）。

---

## 📌 订阅与安装

### 1. 批量订阅安装（推荐）

在 VideoFree 客户端中进入 **「数据源管理」 -> 「扩展插件源」 -> 「+ 安装插件」 -> 「批量订阅 (JSON)」**，粘贴以下任意一个链接即可一次性导入所有精选插件：

- **jsDelivr CDN（免翻墙，推荐）**：
  ```text
  https://cdn.jsdelivr.net/gh/yyds-video/VideoFreePlugins@main/plugins.json
  ```
- **GitHub Raw**：
  ```text
  https://raw.githubusercontent.com/yyds-video/VideoFreePlugins/main/plugins.json
  ```

---

## 🧩 插件列表 (共 32 个)

| 插件名称 | 唯一标识 (platform) | 版本 | 功能说明 | 单插件直链 |
| :--- | :--- | :--- | :--- | :--- |
| **苹果CMS通用源** | `maccms_universal` | 1.0.0 | 支持用户在 App 内自定义任意苹果 CMS v10 API 接口 | [下载](https://cdn.jsdelivr.net/gh/yyds-video/VideoFreePlugins@main/dist/maccms/index.js) |
| **猫眼影视** | `maoyan_plugin` | 1.0.0 | 猫眼高清采集资源 | [下载](https://cdn.jsdelivr.net/gh/yyds-video/VideoFreePlugins@main/dist/maoyan/index.js) |
| **电影天堂** | `tiantang_plugin` | 1.0.0 | 电影天堂经典片源 | [下载](https://cdn.jsdelivr.net/gh/yyds-video/VideoFreePlugins@main/dist/tiantang/index.js) |
| **360影视** | `sanliu_plugin` | 1.0.0 | 360资源秒播线路 | [下载](https://cdn.jsdelivr.net/gh/yyds-video/VideoFreePlugins@main/dist/sanliu/index.js) |
| **非凡影视** | `ffzy_plugin` | 1.0.0 | 非凡影视官方高清视频资源 | [下载](https://cdn.jsdelivr.net/gh/yyds-video/VideoFreePlugins@main/dist/ffzy/index.js) |
| **牛牛影视** | `niuniu_plugin` | 1.0.0 | 牛牛资源极速线路 | [下载](https://cdn.jsdelivr.net/gh/yyds-video/VideoFreePlugins@main/dist/niuniu/index.js) |
| **红牛影视** | `hongniu_plugin` | 1.0.0 | 红牛资源秒播线路 | [下载](https://cdn.jsdelivr.net/gh/yyds-video/VideoFreePlugins@main/dist/hongniu/index.js) |
| **快车影视** | `kuaiche_plugin` | 1.0.0 | 快车资源海量剧集 | [下载](https://cdn.jsdelivr.net/gh/yyds-video/VideoFreePlugins@main/dist/kuaiche/index.js) |
| **索尼影视** | `snzy_plugin` | 1.0.0 | 索尼资源超清片源 | [下载](https://cdn.jsdelivr.net/gh/yyds-video/VideoFreePlugins@main/dist/snzy/index.js) |
| **卧龙影视** | `wolong_plugin` | 1.0.0 | 卧龙资源超清剧库 | [下载](https://cdn.jsdelivr.net/gh/yyds-video/VideoFreePlugins@main/dist/wolong/index.js) |
| **虎牙影视** | `huya_plugin` | 1.0.0 | 虎牙官方采集资源 | [下载](https://cdn.jsdelivr.net/gh/yyds-video/VideoFreePlugins@main/dist/huya/index.js) |
| **奇异影视** | `qiyi_plugin` | 1.0.0 | 奇异高清秒播 | [下载](https://cdn.jsdelivr.net/gh/yyds-video/VideoFreePlugins@main/dist/qiyi/index.js) |
| **豪华影视** | `haohua_plugin` | 1.0.0 | 豪华资源全网热播 | [下载](https://cdn.jsdelivr.net/gh/yyds-video/VideoFreePlugins@main/dist/haohua/index.js) |
| **极速影视** | `jisu_plugin` | 1.0.0 | 极速资源专线 | [下载](https://cdn.jsdelivr.net/gh/yyds-video/VideoFreePlugins@main/dist/jisu/index.js) |
| **最大影视** | `zuid_plugin` | 1.0.0 | 最大资源老牌稳定片库 | [下载](https://cdn.jsdelivr.net/gh/yyds-video/VideoFreePlugins@main/dist/zuid/index.js) |
| **金鹰影视** | `jinying_plugin` | 1.0.0 | 金鹰影视稳定接口 | [下载](https://cdn.jsdelivr.net/gh/yyds-video/VideoFreePlugins@main/dist/jinying/index.js) |
| **瀑布影视** | `pubu_plugin` | 1.0.0 | 瀑布资源综合片源 | [下载](https://cdn.jsdelivr.net/gh/yyds-video/VideoFreePlugins@main/dist/pubu/index.js) |
| **量子影视** | `lzzy_plugin` | 1.0.0 | 量子资源极速影视源 | [下载](https://cdn.jsdelivr.net/gh/yyds-video/VideoFreePlugins@main/dist/lzzy/index.js) |
| **速播影视** | `subo_plugin` | 1.0.0 | 速播资源高速片源 | [下载](https://cdn.jsdelivr.net/gh/yyds-video/VideoFreePlugins@main/dist/subo/index.js) |
| **四圈影视** | `siquan_plugin` | 1.0.0 | 四圈影视专线 | [下载](https://cdn.jsdelivr.net/gh/yyds-video/VideoFreePlugins@main/dist/siquan/index.js) |
| **暴风影视** | `bfzy_plugin` | 1.0.0 | 暴风资源高清秒播源 | [下载](https://cdn.jsdelivr.net/gh/yyds-video/VideoFreePlugins@main/dist/bfzy/index.js) |
| **光速影视** | `guangsu_plugin` | 1.0.0 | 光速资源极速播放 | [下载](https://cdn.jsdelivr.net/gh/yyds-video/VideoFreePlugins@main/dist/guangsu/index.js) |
| **无尽影视** | `wujin_plugin` | 1.0.0 | 无尽资源稳定高清源 | [下载](https://cdn.jsdelivr.net/gh/yyds-video/VideoFreePlugins@main/dist/wujin/index.js) |
| **魔都影视** | `modu_plugin` | 1.0.0 | 魔都动漫与综合资源 | [下载](https://cdn.jsdelivr.net/gh/yyds-video/VideoFreePlugins@main/dist/modu/index.js) |
| **新浪影视** | `xinlang_plugin` | 1.0.0 | 新浪秒播专线 | [下载](https://cdn.jsdelivr.net/gh/yyds-video/VideoFreePlugins@main/dist/xinlang/index.js) |
| **鸭鸭影视** | `yaya_plugin` | 1.0.0 | 鸭鸭资源影视片库 | [下载](https://cdn.jsdelivr.net/gh/yyds-video/VideoFreePlugins@main/dist/yaya/index.js) |
| **飘零影视** | `piaoling_plugin` | 1.0.0 | 飘零网络超清源 | [下载](https://cdn.jsdelivr.net/gh/yyds-video/VideoFreePlugins@main/dist/piaoling/index.js) |
| **茅台影视** | `maotai_plugin` | 1.0.0 | 茅台资源海量片库 | [下载](https://cdn.jsdelivr.net/gh/yyds-video/VideoFreePlugins@main/dist/maotai/index.js) |
| **豆瓣影视** | `dbzy_plugin` | 1.0.0 | 豆瓣资源精选片单 | [下载](https://cdn.jsdelivr.net/gh/yyds-video/VideoFreePlugins@main/dist/dbzy/index.js) |
| **妖灵影视** | `yaoling_plugin` | 1.0.0 | 1080P 超清片源 | [下载](https://cdn.jsdelivr.net/gh/yyds-video/VideoFreePlugins@main/dist/yaoling/index.js) |
| **爱坤影视** | `aikun_plugin` | 1.0.0 | 爱坤影视专线 | [下载](https://cdn.jsdelivr.net/gh/yyds-video/VideoFreePlugins@main/dist/aikun/index.js) |
| **哔哩哔哩** | `bilibili_video` | 1.0.0 | B 站公开视频搜索与在线嗅探播放，支持配置 Cookie | [下载](https://cdn.jsdelivr.net/gh/yyds-video/VideoFreePlugins@main/dist/bilibili/index.js) |

---

## 🛠️ 插件开发指南

一个标准的 VideoFree 插件为一个符合 CommonJS 规范的 `.js` 文件。

### 1. 基础结构

```javascript
const axios = require('axios');

module.exports = {
  platform: 'my_source',          // 唯一标识 (必填，字母/下划线)
  name: '我的视频源',              // 显示名称 (必填)
  version: '1.0.0',               // 版本号 (必填)
  author: 'YourName',             // 作者
  description: '插件描述信息',
  srcUrl: 'https://.../index.js',  // 插件发布下载链接
  supportedSearchType: ['all', 'movie', 'tv'],

  // 用户变量配置（选填）：用户可在客户端界面输入自定义参数
  userVariables: [
    {
      key: 'apiUrl',
      title: '采集接口',
      description: '输入完整的 API 地址',
      defaultValue: 'https://api.example.com/api.php/provide/vod/'
    }
  ],

  /**
   * 1. 搜索影片 (必选)
   */
  async search(query, page = 1, type = 'all') {
    const res = await axios.get(`https://api.example.com/search?wd=${encodeURIComponent(query)}&pg=${page}`);
    return {
      isEnd: false, // 是否最后一页
      data: [
        {
          id: '12345',
          title: '影片标题',
          cover: 'https://.../cover.jpg',
          remarks: '完结',
          year: '2024',
          typeName: '动作片'
        }
      ]
    };
  },

  /**
   * 2. 获取详情与剧集列表 (必选)
   */
  async getDetail(id) {
    const res = await axios.get(`https://api.example.com/detail?id=${id}`);
    return {
      id: id,
      title: '影片标题',
      cover: 'https://.../cover.jpg',
      intro: '简介内容...',
      lines: [
        {
          id: 'line_1',
          name: '默认线路',
          episodes: [
            { id: 'ep_1', name: '第1集', url: 'https://.../1.m3u8' },
            { id: 'ep_2', name: '第2集', url: 'https://.../2.m3u8' }
          ]
        }
      ]
    };
  },

  /**
   * 3. 播放地址解析 (必选)
   */
  async getMediaSource(episode, line) {
    // 若直接为可播放直链
    return {
      url: episode.url,
      type: 'hls', // 'hls' 或 'mp4'
      headers: {
        'Referer': 'https://example.com/' // 防盗链请求头
      }
    };

    // 若需要客户端 WebView 进行网页嗅探
    // return { url: episode.url, isSniff: true };
  }
};
```

---

## 💻 本地工程调试与构建

```bash
# 1. 安装开发依赖
npm install

# 2. 编译插件并生成订阅文件 plugins.json
npm run build

# 3. 本地自动化测试各插件连通性
npm run test-all

# 4. 本地启动 HTTP 静态服务供手机或模拟器安装测试
npm run serve
```

---

## ⚖️ 免责声明

1. 本仓库内的所有插件均仅作为技术学习与交流参考，所有接口均来源于互联网公开检索。
2. 开发者不对任何插件内容的真实性、合法性或有效性承担任何责任。
3. 请合理、合法使用相关代码，切勿用于任何商业用途。
