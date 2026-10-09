const axios = require('axios');
const fs = require('fs');
const path = require('path');

const rulesPath = path.resolve(__dirname, '../default_cms_rules.json');
const rawData = fs.readFileSync(rulesPath, 'utf8');
const cmsConfig = JSON.parse(rawData);

async function checkSingleRule(rule) {
  let apiUrl = rule.api.trim();
  const sep = apiUrl.includes('?') ? '&' : '?';
  const searchUrl = `${apiUrl}${sep}ac=detail&wd=%E6%96%97%E7%BD%97%E5%A4%A7%E9%99%86`; // "斗罗大陆"

  const startTime = Date.now();
  try {
    const res = await axios.get(searchUrl, {
      timeout: 7000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
      validateStatus: (s) => s === 200
    });
    const cost = Date.now() - startTime;
    const data = res.data;
    if (data && typeof data === 'object') {
      const list = data.list || [];
      if (Array.isArray(list) && list.length > 0) {
        const first = list[0];
        const playUrl = first.vod_play_url || '';
        const hasPlayUrl = playUrl.length > 15 && (playUrl.includes('.m3u8') || playUrl.includes('.mp4') || playUrl.includes('$'));
        if (hasPlayUrl) {
          return {
            status: 'ok',
            rule,
            cost,
            total: data.total || list.length,
            sampleVod: first.vod_name
          };
        } else {
          return {
            status: 'fail',
            rule,
            cost,
            error: '无有效播放链接 (vod_play_url)'
          };
        }
      }
    }

    return {
      status: 'empty',
      rule,
      cost,
      error: '返回数据为空或无有效 list'
    };
  } catch (err) {
    const cost = Date.now() - startTime;
    return {
      status: 'error',
      rule,
      cost,
      error: err.code || err.message
    };
  }
}

async function run() {
  console.log(`🚀 开始测试 ${cmsConfig.rules.length} 个 CMS 规则的可用性、播放链接与网络延迟...\n`);
  
  const results = await Promise.all(
    cmsConfig.rules.map(rule => checkSingleRule(rule))
  );

  const active = [];
  const dead = [];

  for (const r of results) {
    if (r.status === 'ok') {
      console.log(`✅ [可用] ${r.rule.name.padEnd(8, ' ')} (${r.rule.id.padEnd(12, ' ')}) - 延迟: ${r.cost.toString().padStart(4, ' ')}ms, 示例: 《${r.sampleVod}》`);
      active.push(r);
    } else {
      console.log(`❌ [失效] ${r.rule.name.padEnd(8, ' ')} (${r.rule.id.padEnd(12, ' ')}) - 延迟: ${r.cost.toString().padStart(4, ' ')}ms, 错误: ${r.error}`);
      dead.push(r);
    }
  }

  console.log(`\n==========================================`);
  console.log(`总数: ${results.length}`);
  console.log(`🟢 可用: ${active.length} (${Math.round(active.length / results.length * 100)}%)`);
  console.log(`🔴 失效: ${dead.length}`);
  console.log(`==========================================\n`);

  active.sort((a, b) => a.cost - b.cost);
  console.log('⚡ 速度最快的有效源 TOP 10:');
  active.slice(0, 10).forEach((a, i) => {
    console.log(`  ${(i + 1).toString().padStart(2, ' ')}. ${a.rule.name.padEnd(8, ' ')} - ${a.cost}ms (${a.rule.api})`);
  });

  if (dead.length > 0) {
    process.exit(1);
  } else {
    console.log('\n🎉 所有规则 100% 验证通过！');
  }
}

run();
