/**
 * 红牛影视 (HONGNIU) 插件
 * 基于苹果CMS标准采集接口
 */
const axios = require('axios');

module.exports = {
  platform: 'hongniu_plugin',
  name: '红牛影视',
  version: '1.0.0',
  author: 'VideoFree Community',
  description: '红牛资源秒播线路',
  srcUrl: 'https://cdn.jsdelivr.net/gh/yyds-video/VideoFreePlugins@main/dist/hongniu/index.js',
  supportedSearchType: ['all', 'movie', 'tv'],
  userVariables: [
    {
      key: 'apiUrl',
      title: '采集接口地址',
      description: '默认使用红牛影视官方接口',
      defaultValue: 'https://www.hongniuzy2.com/api.php/provide/vod/at/josn/'
    }
  ],

  _getApiUrl() {
    let url = (typeof env !== 'undefined' && env.getUserVariable && env.getUserVariable('apiUrl')) || '';
    if (!url || !url.trim()) {
      url = 'https://www.hongniuzy2.com/api.php/provide/vod/at/josn/';
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
    const targetUrl = `${baseUrl}${sep}ac=detail&wd=${encodeURIComponent(query)}&pg=${page}`;

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
    const targetUrl = `${baseUrl}${sep}ac=detail&ids=${encodeURIComponent(vodId)}`;

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
          id: `line_${i}`,
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
