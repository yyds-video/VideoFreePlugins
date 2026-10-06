/**
 * 哔哩哔哩 (Bilibili) 插件
 * 支持 B 站视频搜索与视频播放（基于开放 API 与嗅探）
 */
const axios = require('axios');

module.exports = {
  platform: 'bilibili_video',
  name: '哔哩哔哩',
  version: '1.0.0',
  author: 'VideoFree Community',
  description: '哔哩哔哩公开视频搜索与在线播放',
  srcUrl: 'https://cdn.jsdelivr.net/gh/yyds-video/VideoFreePlugins@main/dist/bilibili/index.js',
  supportedSearchType: ['all', 'video'],
  userVariables: [
    {
      key: 'cookie',
      title: 'B站 Cookie (SESSDATA)',
      description: '填入包含 SESSDATA 的 Cookie 可解锁更高画质',
      defaultValue: ''
    }
  ],

  async search(query, page = 1) {
    const url = `https://api.bilibili.com/x/web-interface/search/type?search_type=video&keyword=${encodeURIComponent(query)}&page=${page}`;
    
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Referer': 'https://www.bilibili.com/'
    };

    const cookie = (typeof env !== 'undefined' && env.getUserVariable && env.getUserVariable('cookie')) || '';
    if (cookie) {
      headers['Cookie'] = cookie;
    }

    const res = await axios.get(url, { headers, responseType: 'json' });
    const data = res.data && res.data.data;
    const rawList = (data && data.result) || [];

    const list = rawList.map(item => {
      // 过滤高亮标签 <em> </em>
      const cleanTitle = (item.title || '').replace(/<[^>]+>/g, '');
      let pic = item.pic || '';
      if (pic.startsWith('//')) pic = 'https:' + pic;

      return {
        id: String(item.bvid || ''),
        title: cleanTitle,
        cover: pic,
        remarks: item.duration || '',
        year: item.pubdate ? new Date(item.pubdate * 1000).getFullYear().toString() : '',
        typeName: item.typename || '视频',
        author: item.author || '',
        score: item.play ? `${Math.round(item.play / 10000)}万播放` : ''
      };
    });

    return {
      isEnd: rawList.length === 0 || page >= (data.numPages || 1),
      data: list
    };
  },

  async getDetail(bvid) {
    const url = `https://api.bilibili.com/x/web-interface/view?bvid=${encodeURIComponent(bvid)}`;
    const headers = {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Referer': 'https://www.bilibili.com/'
    };

    const res = await axios.get(url, { headers, responseType: 'json' });
    const data = res.data && res.data.data;
    if (!data) throw new Error('获取B站视频详情失败');

    let cover = data.pic || '';
    if (cover.startsWith('//')) cover = 'https:' + cover;

    const pages = data.pages || [];
    const episodes = pages.map((p, idx) => ({
      id: String(p.cid),
      name: p.part || `第${idx + 1}P`,
      url: `https://www.bilibili.com/video/${bvid}?p=${p.page}`
    }));

    return {
      id: bvid,
      title: data.title || '',
      cover: cover,
      remarks: `${pages.length}P`,
      typeName: data.tname || 'B站视频',
      director: data.owner ? data.owner.name : '',
      intro: data.desc || '',
      lines: [
        {
          id: 'bilibili_web',
          name: 'B站播放',
          episodes: episodes
        }
      ]
    };
  },

  async getMediaSource(episode, line) {
    // B站直接走嗅探或原生网页解析
    return {
      url: episode.url,
      isSniff: true,
      headers: {
        'Referer': 'https://www.bilibili.com/',
        'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1'
      }
    };
  }
};
