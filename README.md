<div align="center">

# 🎬 VideoFreePlugins

**为 [VideoFree (flutter_v)](https://github.com/yyds-store/flutter_v) 打造的开源、高质量、全连通视频插件生态集合**

[![License](https://img.shields.io/badge/license-GPL--3.0-blue.svg)](LICENSE)
[![Plugins](https://img.shields.io/badge/plugins-21%20verified-success.svg)](plugins.json)
[![Status](https://img.shields.io/badge/health-100%25%20passing-brightgreen.svg)](#-经过连通性验证的可用插件列表-共-21-个)
[![Node](https://img.shields.io/badge/node-%3E%3D16.0.0-orange.svg)](package.json)
[![MusicFree Compatible](https://img.shields.io/badge/spec-MusicFree%20Protocol-blueviolet.svg)](https://github.com/maotoumao/MusicFreePlugins)

[📌 订阅与安装](#-订阅与安装) • [🧩 可用插件列表](#-经过连通性验证的可用插件列表-共-21-个) • [🛠️ 开发规范](#-插件开发规范-plugin-specification) • [💻 本地构建与调试](#-本地工程调试与构建) • [❓ 常见问题](#-常见问题-faq) • [⚖️ 免责声明](#-免责声明-disclaimer)

</div>

---

## 📖 项目简介

**VideoFreePlugins** 是专为开源影视播放器 **VideoFree (flutter_v)** 打造的官方与社区精选扩展插件仓库。

- 🎯 **设计哲学**：设计理念与技术规范深度对标 [MusicFreePlugins](https://github.com/maotoumao/MusicFreePlugins)。播放器客户端保持极致轻量、纯粹与无广告，所有影视搜索、详情展示、选集解析和播放线路全部委托给基于 CommonJS 规范的独立 JavaScript 插件执行。
- ⚡ **100% 连通与自动化探活**：所有插件均接入自动化测试体系，定期自动检索测试词与嗅探播放切片，**已严格剔除所有失效与关停接口，当前收录的 21 个源均保持 100% 连通、可正常播放**。
- 🧩 **支持用户自定义变量**：内置通用苹果CMS等高级插件，支持在客户端界面中直接配置自定义 API 地址与备用解析线路。
- 🚀 **全球高速 CDN 加速**：提供 jsDelivr CDN 节点免代理极速拉取，同时保留 GitHub Raw 直链。

---

## 📌 订阅与安装

### 1. 批量订阅安装（强烈推荐）

在 VideoFree 客户端中：
> 进入 **「数据源管理」 -> 「扩展插件源」 -> 点击右上角「+」 -> 选择「批量订阅 (JSON)」**

复制并粘贴以下任意一个链接即可一次性导入全量精选插件：

| 节点类型 | 订阅 URL | 适用场景 |
| :--- | :--- | :--- |
| **🚀 jsDelivr CDN（国内加速，推荐）** | `https://cdn.jsdelivr.net/gh/yyds-video/VideoFreePlugins@main/plugins.json` | 国内网络免代理，解析速度快 |
| **🌐 GitHub Raw（官方直链）** | `https://raw.githubusercontent.com/yyds-video/VideoFreePlugins/main/plugins.json` | 全球海外直连，实时同步最新提交 |
| **⚡ Fastly CDN（备用镜像）** | `https://fastly.jsdelivr.net/gh/yyds-video/VideoFreePlugins@main/plugins.json` | 备用 CDN 线路 |

---

### 2. 单插件独立安装

如果仅需安装个别特定的视频源，在客户端选择 **「从网络安装单个插件」**，粘贴下表中对应插件的「CDN 直链」即可完成单个安装。

---

### 3. 本地文件安装

下载单插件的 `index.js` 或整库 `plugins.json` 至手机本地存储，在客户端中选择 **「从本地文件安装」** 即可无网离线导入。

---

## 🧩 经过连通性验证的可用插件列表 (共 21 个)

> 💡 **健康度保证**：以下所有插件已通过自动化脚本实测，搜索与播放响应时间处于 1.5s ~ 4.8s 优良区间。

| 序号 | 插件名称 | 唯一标识 (`platform`) | 平均响应 | 特性与功能说明 | 单插件 CDN 直链 | 单插件 GitHub 直链 |
| :---: | :--- | :--- | :---: | :--- | :---: | :---: |
| 1 | **电影天堂** | `tiantang_plugin` | ~1.5s | 电影天堂经典热播片源 | [CDN 直链](https://cdn.jsdelivr.net/gh/yyds-video/VideoFreePlugins@main/dist/tiantang/index.js) | [GitHub](https://raw.githubusercontent.com/yyds-video/VideoFreePlugins/main/dist/tiantang/index.js) |
| 2 | **红牛影视** | `hongniu_plugin` | ~1.6s | 红牛资源秒播高清专线 | [CDN 直链](https://cdn.jsdelivr.net/gh/yyds-video/VideoFreePlugins@main/dist/hongniu/index.js) | [GitHub](https://raw.githubusercontent.com/yyds-video/VideoFreePlugins/main/dist/hongniu/index.js) |
| 3 | **豪华影视** | `haohua_plugin` | ~2.0s | 豪华资源全网热播剧集 | [CDN 直链](https://cdn.jsdelivr.net/gh/yyds-video/VideoFreePlugins@main/dist/haohua/index.js) | [GitHub](https://raw.githubusercontent.com/yyds-video/VideoFreePlugins/main/dist/haohua/index.js) |
| 4 | **金鹰影视** | `jinying_plugin` | ~2.2s | 金鹰影视老牌稳定接口 | [CDN 直链](https://cdn.jsdelivr.net/gh/yyds-video/VideoFreePlugins@main/dist/jinying/index.js) | [GitHub](https://raw.githubusercontent.com/yyds-video/VideoFreePlugins/main/dist/jinying/index.js) |
| 5 | **虎牙影视** | `huya_plugin` | ~2.3s | 虎牙官方优质采集资源 | [CDN 直链](https://cdn.jsdelivr.net/gh/yyds-video/VideoFreePlugins@main/dist/huya/index.js) | [GitHub](https://raw.githubusercontent.com/yyds-video/VideoFreePlugins/main/dist/huya/index.js) |
| 6 | **无尽影视** | `wujin_plugin` | ~2.6s | 无尽资源超清稳定源 | [CDN 直链](https://cdn.jsdelivr.net/gh/yyds-video/VideoFreePlugins@main/dist/wujin/index.js) | [GitHub](https://raw.githubusercontent.com/yyds-video/VideoFreePlugins/main/dist/wujin/index.js) |
| 7 | **非凡影视** | `ffzy_plugin` | ~2.6s | 非凡影视官方高清视频资源 | [CDN 直链](https://cdn.jsdelivr.net/gh/yyds-video/VideoFreePlugins@main/dist/ffzy/index.js) | [GitHub](https://raw.githubusercontent.com/yyds-video/VideoFreePlugins/main/dist/ffzy/index.js) |
| 8 | **苹果CMS通用源** | `maccms_universal` | ~2.7s | **支持自定义任意 MacCMS API 接口** | [CDN 直链](https://cdn.jsdelivr.net/gh/yyds-video/VideoFreePlugins@main/dist/maccms/index.js) | [GitHub](https://raw.githubusercontent.com/yyds-video/VideoFreePlugins/main/dist/maccms/index.js) |
| 9 | **哔哩哔哩** | `bilibili_video` | ~2.8s | B 站公开视频搜索与在线嗅探播放 | [CDN 直链](https://cdn.jsdelivr.net/gh/yyds-video/VideoFreePlugins@main/dist/bilibili/index.js) | [GitHub](https://raw.githubusercontent.com/yyds-video/VideoFreePlugins/main/dist/bilibili/index.js) |
| 10 | **新浪影视** | `xinlang_plugin` | ~3.0s | 新浪秒播极速专线 | [CDN 直链](https://cdn.jsdelivr.net/gh/yyds-video/VideoFreePlugins@main/dist/xinlang/index.js) | [GitHub](https://raw.githubusercontent.com/yyds-video/VideoFreePlugins/main/dist/xinlang/index.js) |
| 11 | **奇异影视** | `qiyi_plugin` | ~3.3s | 奇异高清秒播片源 | [CDN 直链](https://cdn.jsdelivr.net/gh/yyds-video/VideoFreePlugins@main/dist/qiyi/index.js) | [GitHub](https://raw.githubusercontent.com/yyds-video/VideoFreePlugins/main/dist/qiyi/index.js) |
| 12 | **猫眼影视** | `maoyan_plugin` | ~3.5s | 猫眼高清采集线路 | [CDN 直链](https://cdn.jsdelivr.net/gh/yyds-video/VideoFreePlugins@main/dist/maoyan/index.js) | [GitHub](https://raw.githubusercontent.com/yyds-video/VideoFreePlugins/main/dist/maoyan/index.js) |
| 13 | **妖灵影视** | `yaoling_plugin` | ~3.6s | 1080P 高清片源库 | [CDN 直链](https://cdn.jsdelivr.net/gh/yyds-video/VideoFreePlugins@main/dist/yaoling/index.js) | [GitHub](https://raw.githubusercontent.com/yyds-video/VideoFreePlugins/main/dist/yaoling/index.js) |
| 14 | **速播影视** | `subo_plugin` | ~3.6s | 速播资源高速流畅线路 | [CDN 直链](https://cdn.jsdelivr.net/gh/yyds-video/VideoFreePlugins@main/dist/subo/index.js) | [GitHub](https://raw.githubusercontent.com/yyds-video/VideoFreePlugins/main/dist/subo/index.js) |
| 15 | **360影视** | `sanliu_plugin` | ~3.7s | 360资源秒播线路 | [CDN 直链](https://cdn.jsdelivr.net/gh/yyds-video/VideoFreePlugins@main/dist/sanliu/index.js) | [GitHub](https://raw.githubusercontent.com/yyds-video/VideoFreePlugins/main/dist/sanliu/index.js) |
| 16 | **量子影视** | `lzzy_plugin` | ~3.8s | 量子资源极速影视源 | [CDN 直链](https://cdn.jsdelivr.net/gh/yyds-video/VideoFreePlugins@main/dist/lzzy/index.js) | [GitHub](https://raw.githubusercontent.com/yyds-video/VideoFreePlugins/main/dist/lzzy/index.js) |
| 17 | **光速影视** | `guangsu_plugin` | ~3.9s | 光速资源极速播放专线 | [CDN 直链](https://cdn.jsdelivr.net/gh/yyds-video/VideoFreePlugins@main/dist/guangsu/index.js) | [GitHub](https://raw.githubusercontent.com/yyds-video/VideoFreePlugins/main/dist/guangsu/index.js) |
| 18 | **极速影视** | `jisu_plugin` | ~4.0s | 极速资源专线 | [CDN 直链](https://cdn.jsdelivr.net/gh/yyds-video/VideoFreePlugins@main/dist/jisu/index.js) | [GitHub](https://raw.githubusercontent.com/yyds-video/VideoFreePlugins/main/dist/jisu/index.js) |
| 19 | **最大影视** | `zuid_plugin` | ~4.6s | 最大资源老牌稳定片库 | [CDN 直链](https://cdn.jsdelivr.net/gh/yyds-video/VideoFreePlugins@main/dist/zuid/index.js) | [GitHub](https://raw.githubusercontent.com/yyds-video/VideoFreePlugins/main/dist/zuid/index.js) |
| 20 | **暴风影视** | `bfzy_plugin` | ~4.8s | 暴风资源超清秒播源 | [CDN 直链](https://cdn.jsdelivr.net/gh/yyds-video/VideoFreePlugins@main/dist/bfzy/index.js) | [GitHub](https://raw.githubusercontent.com/yyds-video/VideoFreePlugins@main/dist/bfzy/index.js) |
| 21 | **爱坤影视** | `aikun_plugin` | ~6.7s | 爱坤影视专线 | [CDN 直链](https://cdn.jsdelivr.net/gh/yyds-video/VideoFreePlugins@main/dist/aikun/index.js) | [GitHub](https://raw.githubusercontent.com/yyds-video/VideoFreePlugins/main/dist/aikun/index.js) |

---

## 🛠️ 插件开发规范 (Plugin Specification)

VideoFree 插件为一个符合 **CommonJS 规范**的 JavaScript 文件，在客户端独立的 WebView/QuickJS 沙箱环境中运行。

### 1. 全局内置运行环境

插件沙箱中已内置常用前端工具库，**无需额外打包进插件即可直接 `require` 使用**：
- `axios`：标准 HTTP 请求库，用于接口通信；
- `cheerio`：轻量级 HTML 解析库，用于网页嗅探与 DOM 选择；
- `crypto-js`：提供 MD5、AES、SHA256、Base64 等算法；
- `qs`：URL 查询参数序列化工具。

### 2. 标准插件结构代码范例

```javascript
const axios = require('axios');

module.exports = {
  platform: 'my_source',     // 插件全局唯一标识（全英文下划线）
  name: '我的视频源',         // 客户端显示的插件名称
  version: '1.0.0',          // 语义化版本号
  author: '开发者名称',
  description: '支持高清秒播的高画质影视源',
  srcUrl: 'https://.../index.js', // 插件自身在线更新直链
  supportedSearchType: ['all', 'movie', 'tv'], // 支持的搜索分类

  // 用户可自定义变量（客户端可在设置页面直接修改）
  userVariables: [
    {
      key: 'apiUrl',
      title: '采集接口',
      description: '输入完整的苹果CMS采集 API 地址',
      defaultValue: 'https://api.example.com/api.php/provide/vod/'
    }
  ],

  /**
   * 1. 视频搜索接口（必选）
   * @param {string} query 搜索关键词
   * @param {number} page 页码，从 1 开始
   * @param {string} type 搜索分类 ('all' | 'movie' | 'tv')
   * @returns {Promise<{ isEnd: boolean, data: Array<IVideoItem> }>}
   */
  async search(query, page = 1, type = 'all') {
    const res = await axios.get(`https://api.example.com/search?wd=${encodeURIComponent(query)}&pg=${page}`);
    return {
      isEnd: false, // 是否已到达末页
      data: [
        {
          id: '12345',
          title: '影片标题',
          cover: 'https://example.com/cover.jpg',
          remarks: '全24集',
          year: '2024',
          typeName: '动作片'
        }
      ]
    };
  },

  /**
   * 2. 视频详情与选集线路（必选）
   * @param {string} id 视频唯一 ID
   * @returns {Promise<IVideoDetail>}
   */
  async getDetail(id) {
    const res = await axios.get(`https://api.example.com/detail?id=${id}`);
    return {
      id: id,
      title: '影片标题',
      cover: 'https://example.com/cover.jpg',
      intro: '影片简介剧情梗概...',
      director: '导演',
      actor: '主演1, 主演2',
      lines: [
        {
          id: 'line_1',
          name: '默认秒播线路',
          episodes: [
            { id: 'ep_1', name: '第1集', url: 'https://example.com/1.m3u8' },
            { id: 'ep_2', name: '第2集', url: 'https://example.com/2.m3u8' }
          ]
        }
      ]
    };
  },

  /**
   * 3. 媒体播放源解析（必选）
   * @param {object} episode 剧集项对象
   * @param {object} line 所属线路对象
   * @returns {Promise<{ url: string, type?: 'hls'|'mp4', headers?: object }>}
   */
  async getMediaSource(episode, line) {
    return {
      url: episode.url,
      type: 'hls', // 'hls' | 'mp4' | 'auto'
      headers: {
        'User-Agent': 'Mozilla/5.0 ...'
      }
    };
  }
};
```

---

## 💻 本地工程调试与构建

本工程包含完整的 TypeScript 类型支持、连通性自动化测试套件与打包脚本：

```bash
# 1. 克隆本仓库并安装开发依赖
git clone https://github.com/yyds-video/VideoFreePlugins.git
cd VideoFreePlugins
npm install

# 2. 运行自动化连通性与健康状态测试（真实检索与嗅探）
npm run test-all

# 3. 编译打包插件并生成订阅总表 plugins.json
npm run build

# 4. 启动本地静态 HTTP 服务供局域网手机/模拟器测试
npm run serve
# 打开终端提示的本地服务，在手机客户端中输入 http://<局域网IP>:8888/plugins.json 即可即时调试
```

---

## ❓ 常见问题 (FAQ)

<details>
<summary><b>Q1: 为什么部分影视源在某些网络环境下搜索变慢？</b></summary>
国内公网影视源接口由各站长独立维护，偶遇源站高峰或网络波动属于正常现象。建议：
1. 客户端支持多源同时搜索与多线路秒切，可在搜索结果中挑选最快线路；
2. 推荐优先使用「红牛」、「豪华」、「非凡」、「量子」等响应时间在 2 秒内的优质源。
</details>

<details>
<summary><b>Q2: 订阅链接导入失败提示网络错误怎么办？</b></summary>
部分地区网络运营商可能对 GitHub 或 jsDelivr 产生临时干扰：
1. 首选国内加速 CDN：<code>https://cdn.jsdelivr.net/gh/yyds-video/VideoFreePlugins@main/plugins.json</code>；
2. 次选备用节点 Fastly CDN 或 GitHub Raw 直链；
3. 或用浏览器下载 <code>plugins.json</code> 后，在客户端选择「从本地文件安装」。
</details>

<details>
<summary><b>Q3: 如何在客户端中配置「苹果CMS通用源」？</b></summary>
在 VideoFree 客户端进入「数据源管理」->「扩展插件源」-> 找到「苹果CMS通用源」-> 点击「配置」，在用户变量输入框中填入任意支持 JSON 格式的 MacCMS API 采集接口即可。
</details>

---

## 🤝 贡献指南 (Contributing)

欢迎提交 Issue 和 Pull Request 共建视频源生态！

1. Fork 本仓库并新建分支；
2. 在 `plugins/<源名称>/` 目录下添加或优化插件；
3. 运行 `npm run test-all`，确保搜索、详情、线路播放三大核心方法均通过自动化健康检测；
4. 运行 `npm run build` 生成最新 `plugins.json` 与 `dist/`；
5. 提交 PR，维护团队将第一时间审核合并。

---

## ⚖️ 免责声明 (Disclaimer)

1. **学习与交流用途**：本仓库中收录的所有插件代码、数据及脚本仅用于编程技术学习、网络协议分析和学术交流。
2. **非存储方声明**：本仓库不提供任何音视频存储、托管、录制或转播服务，所有视频源链接均抓取自第三方互联网公开接口。
3. **合法合规使用**：请使用者自觉遵守相关法律法规，切勿将本仓库内容用于任何商业盈利或侵权用途。如有侵权问题，请联系相关第三方资源站点处理。

---

<div align="center">
Made with ❤️ by VideoFree Community
</div>
