/**
 * 自动化测试脚本：模拟宿主环境执行插件基础搜索
 */
const path = require('path');

// 注入模拟全局宿主环境
global.env = {
  getUserVariable: (key) => '',
  getUserVariables: () => ({}),
  sniffVideo: async (url) => ({ url, headers: {} })
};

async function testPlugins() {
  console.log('🧪 开始对 VideoFreePlugins 插件进行连通性测试...\n');

  const testCases = [
    { name: '苹果CMS通用源', file: '../dist/maccms/index.js', keyword: '斗罗大陆' },
    { name: '非凡影视', file: '../dist/ffzy/index.js', keyword: '凡人修仙传' },
    { name: '量子影视', file: '../dist/lzzy/index.js', keyword: '完美世界' }
  ];

  for (const tc of testCases) {
    try {
      console.log(`▶️ 正在测试插件【${tc.name}】...`);
      const plugin = require(path.resolve(__dirname, tc.file));
      console.log(`   元数据: ${plugin.name} v${plugin.version} (ID: ${plugin.platform})`);

      const searchRes = await plugin.search(tc.keyword, 1);
      const count = (searchRes && searchRes.data && searchRes.data.length) || 0;
      console.log(`   搜索测试: 关键词 "${tc.keyword}" -> 返回 ${count} 条结果`);

      if (count > 0) {
        const first = searchRes.data[0];
        console.log(`   首条记录: [${first.id}] ${first.title} (${first.remarks || ''})`);
        
        // 测试获取详情
        const detail = await plugin.getDetail(first.id);
        const linesCount = (detail.lines && detail.lines.length) || 0;
        console.log(`   详情测试: 获取到 ${linesCount} 条播放线路`);
        if (linesCount > 0 && detail.lines[0].episodes.length > 0) {
          const firstEp = detail.lines[0].episodes[0];
          const media = await plugin.getMediaSource(firstEp, detail.lines[0]);
          console.log(`   播放解析: ${firstEp.name} -> ${media.url.substring(0, 45)}...`);
        }
      }
      console.log(`✅ 【${tc.name}】测试通过！\n`);
    } catch (err) {
      console.error(`❌ 【${tc.name}】测试失败:`, err.message, '\n');
    }
  }
}

testPlugins();
