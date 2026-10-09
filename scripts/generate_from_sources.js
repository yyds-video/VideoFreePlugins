const fs = require('fs/promises');
const path = require('path');

const sources = [
  { platform: 'wujin', name: '无尽影视', url: 'https://api.wujinapi.com/api.php/provide/vod/', desc: '无尽资源稳定高清源' },
  { platform: 'uku', name: 'U酷影视', url: 'https://api.ukuapi88.com/api.php/provide/vod/', desc: 'U酷资源极速专线' },
  { platform: 'aikun', name: '爱坤影视', url: 'https://ikunzyapi.com/api.php/provide/vod/', desc: '爱坤影视秒播专线' },
  { platform: 'bfzy', name: '暴风影视', url: 'https://bfzyapi.com/api.php/provide/vod/', desc: '暴风资源高清秒播源' },
  { platform: 'wujin_net', name: '无尽专线', url: 'https://api.wujinapi.net/api.php/provide/vod/', desc: '无尽资源BGP专线节点' },
  { platform: 'tiantang', name: '天堂影视', url: 'http://caiji.dyttzyapi.com/api.php/provide/vod/', desc: '电影天堂经典片源' },
  { platform: 'lzzy', name: '量子影视', url: 'https://cj.lziapi.com/api.php/provide/vod/', desc: '量子资源极速影视源' },
  { platform: 'guangsu', name: '光速影视', url: 'https://api.guangsuapi.com/api.php/provide/vod/', desc: '光速资源极速播放' },
  { platform: 'ffzy', name: '非凡影视', url: 'https://cj.ffzyapi.com/api.php/provide/vod/', desc: '非凡影视高清视频资源' },
  { platform: 'hongniu', name: '红牛影视', url: 'https://www.hongniuzy2.com/api.php/provide/vod/', desc: '红牛资源秒播线路' },
  { platform: 'jisu', name: '极速影视', url: 'https://jszyapi.com/api.php/provide/vod/', desc: '极速资源专线' },
  { platform: 'modu', name: '魔都动漫', url: 'https://caiji.moduapi.cc/api.php/provide/vod/', desc: '魔都动漫与综合资源' },
  { platform: 'modu_zy', name: '魔都专线', url: 'https://www.mdzyapi.com/api.php/provide/vod/', desc: '魔都影视官方专线' },
  { platform: 'yaoling', name: '妖灵超清', url: 'https://api.1080zyku.com/inc/apijson.php/', desc: '1080P 超清片源' },
  { platform: 'subo', name: '速播影视', url: 'https://subocaiji.com/api.php/provide/vod/', desc: '速播资源高速片源' },
  { platform: 'huya', name: '虎牙影视', url: 'https://www.huyaapi.com/api.php/provide/vod/at/json/', desc: '虎牙官方采集资源' },
  { platform: 'jinying', name: '金鹰影视', url: 'https://jyzyapi.com/provide/vod', desc: '金鹰影视稳定接口' },
  { platform: 'xinlang', name: '新浪影视', url: 'https://api.xinlangapi.com/xinlangapi.php/provide/vod/at/json', desc: '新浪秒播专线' },
  { platform: 'maoyan', name: '猫眼影视', url: 'https://api.maoyanapi.top/api.php/provide/vod/', desc: '猫眼高清采集资源' },
  { platform: 'zuid', name: '最大影视', url: 'https://api.zuidapi.com/api.php/provide/vod/', desc: '最大资源老牌稳定片库' },
  { platform: 'haohua', name: '豪华影视', url: 'https://hhzyapi.com/api.php/provide/vod/at/json/', desc: '豪华资源全网热播' },
  { platform: 'baiduyun', name: '百度云盘', url: 'https://api.apibdzy.com/api.php/provide/vod/', desc: '百度云盘超清秒播源' },
  { platform: 'sanliu', name: '360影视', url: 'https://360zy.com/api.php/provide/vod/', desc: '360资源秒播线路' },
  { platform: 'ruyi', name: '如意影视', url: 'https://cj.rycjapi.com/api.php/provide/vod/at/json', desc: '如意资源综合高清片库' }
];

const pluginsDir = path.resolve(__dirname, '../plugins');

function generatePluginCode(src) {
  return `/**
 * ${src.name} (${src.platform.toUpperCase()}) 插件
 * 基于苹果CMS标准采集接口
 */
const axios = require('axios');

module.exports = {
  platform: '${src.platform}_plugin',
  name: '${src.name}',
  version: '1.0.0',
  author: 'VideoFree Community',
  description: '${src.desc}',
  srcUrl: 'https://cdn.jsdelivr.net/gh/yyds-video/VideoFreePlugins@main/dist/${src.platform}/index.js',
  supportedSearchType: ['all', 'movie', 'tv'],
  userVariables: [
    {
      key: 'apiUrl',
      title: '采集接口地址',
      description: '默认使用${src.name}官方接口',
      defaultValue: '${src.url}'
    }
  ],

  _getApiUrl() {
    let url = (typeof env !== 'undefined' && env.getUserVariable && env.getUserVariable('apiUrl')) || '';
    if (!url || !url.trim()) {
      url = '${src.url}';
    }
    url = url.trim();
    if (!url.endsWith('/') && !url.includes('?')) {
      url += '/';
    }
    return url;
  },

  async search(query, page = 1) {
    const baseUrl = this._getApiUrl();
    const sep = baseUrl.includes('?') ? '&' : '?';
    const targetUrl = \`\${baseUrl}\${sep}ac=detail&wd=\${encodeURIComponent(query)}&pg=\${page}\`;

    const res = await axios.get(targetUrl, { responseType: 'json' });
    const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
    const rawList = (data && data.list) || [];

    const list = rawList.map(item => ({
      id: String(item.vod_id || item.id || ''),
      title: String(item.vod_name || item.name || ''),
      cover: String(item.vod_pic || item.pic || ''),
      remarks: String(item.vod_remarks || ''),
      year: String(item.vod_year || ''),
      area: String(item.vod_area || ''),
      typeName: String(item.type_name || ''),
      score: String(item.vod_score || ''),
    }));

    return {
      isEnd: rawList.length === 0,
      data: list
    };
  },

  async getDetail(vodId) {
    const baseUrl = this._getApiUrl();
    const sep = baseUrl.includes('?') ? '&' : '?';
    const targetUrl = \`\${baseUrl}\${sep}ac=detail&ids=\${encodeURIComponent(vodId)}\`;

    const res = await axios.get(targetUrl, { responseType: 'json' });
    const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
    const item = (data && data.list && data.list[0]) || {};

    const playFroms = (item.vod_play_from || '').split('$$$');
    const playUrls = (item.vod_play_url || '').split('$$$');

    const lines = [];
    for (let i = 0; i < playFroms.length; i++) {
      if (!playFroms[i]) continue;
      const lineName = playFroms[i];
      const rawEpisodes = (playUrls[i] || '').split('#');
      const episodes = [];

      for (const ep of rawEpisodes) {
        if (!ep) continue;
        const parts = ep.split('$');
        if (parts.length >= 2) {
          episodes.push({
            id: parts[0],
            name: parts[0],
            url: parts[1]
          });
        } else if (parts.length === 1) {
          episodes.push({
            id: parts[0],
            name: parts[0],
            url: parts[0]
          });
        }
      }

      if (episodes.length > 0) {
        lines.push({
          id: \`line_\${i}\`,
          name: lineName,
          episodes: episodes
        });
      }
    }

    return {
      id: String(item.vod_id || vodId),
      title: String(item.vod_name || item.name || ''),
      cover: String(item.vod_pic || item.pic || ''),
      remarks: String(item.vod_remarks || ''),
      year: String(item.vod_year || ''),
      area: String(item.vod_area || ''),
      typeName: String(item.type_name || ''),
      score: String(item.vod_score || ''),
      director: String(item.vod_director || ''),
      actor: String(item.vod_actor || ''),
      intro: String(item.vod_content || ''),
      lines: lines
    };
  },

  async getMediaSource(episode, line) {
    const url = episode.url || '';
    if (url.includes('.m3u8')) {
      return {
        url: url,
        type: 'hls'
      };
    }
    if (url.includes('.mp4')) {
      return {
        url: url,
        type: 'mp4'
      };
    }
    return {
      url: url,
      isSniff: true
    };
  }
};
`;
}

async function run() {
  console.log(`🚀 开始批量生成 ${sources.length} 个本地内置源插件...`);

  for (const src of sources) {
    const targetFolder = path.join(pluginsDir, src.platform);
    await fs.mkdir(targetFolder, { recursive: true });
    const targetFile = path.join(targetFolder, 'index.js');
    await fs.writeFile(targetFile, generatePluginCode(src), 'utf-8');
    console.log(`✅ 已生成插件源码: ${src.name} (${src.platform}) -> plugins/${src.platform}/index.js`);
  }

  console.log('🎉 批量生成全部完成！');
}

run().catch(err => {
  console.error('❌ 生成失败:', err);
  process.exit(1);
});
