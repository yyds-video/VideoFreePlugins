const fs = require('fs/promises');
const path = require('path');
const axios = require('axios');

// 注入模拟环境
global.env = {
  getUserVariable: (key) => '',
  getUserVariables: () => ({}),
  sniffVideo: async (url) => ({ url, headers: {} })
};

const distDir = path.resolve(__dirname, '../dist');

async function testAll() {
  console.log('🔍 开始全量检测 32 个视频源插件的实时连通性...\n');

  const entries = await fs.readdir(distDir, { withFileTypes: true });
  const validPlugins = [];
  const deadPlugins = [];

  for (const entry of entries) {
    if (!entry.isDirectory() || entry.name.startsWith('_')) continue;
    const pluginDir = entry.name;
    const targetJs = path.join(distDir, pluginDir, 'index.js');

    try {
      await fs.access(targetJs);
      const plugin = require(targetJs);
      const startTime = Date.now();

      // 设置 7 秒超时
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('请求超时 (7s)')), 7000)
      );

      // 搜索测试（使用超高覆盖率关键词）
      const searchPromise = plugin.search('斗罗大陆', 1);
      const result = await Promise.race([searchPromise, timeoutPromise]);
      const duration = Date.now() - startTime;

      if (result && result.data && result.data.length > 0) {
        console.log(`✅ [可用] ${plugin.name} (${plugin.platform}) - 耗时: ${duration}ms, 结果数: ${result.data.length}`);
        validPlugins.push({
          dir: pluginDir,
          platform: plugin.platform,
          name: plugin.name,
          version: plugin.version,
          duration: duration,
          count: result.data.length
        });
      } else {
        // 尝试用另一个词 "阿凡达"
        const retryResult = await Promise.race([plugin.search('阿凡达', 1), timeoutPromise]);
        if (retryResult && retryResult.data && retryResult.data.length > 0) {
          console.log(`✅ [可用] ${plugin.name} (${plugin.platform}) - 耗时: ${duration}ms (重试命中)`);
          validPlugins.push({
            dir: pluginDir,
            platform: plugin.platform,
            name: plugin.name,
            version: plugin.version,
            duration: duration,
            count: retryResult.data.length
          });
        } else {
          console.warn(`❌ [失效: 无数据] ${plugin.name} (${plugin.platform})`);
          deadPlugins.push({ dir: pluginDir, name: plugin.name, reason: '搜索无数据返回' });
        }
      }
    } catch (err) {
      console.error(`❌ [失效: 异常] ${pluginDir} - 原因: ${err.message}`);
      deadPlugins.push({ dir: pluginDir, name: pluginDir, reason: err.message });
    }
  }

  console.log('\n=========================================');
  console.log(`📊 检测完毕: 共检测 ${validPlugins.length + deadPlugins.length} 个源`);
  console.log(`🟢 可用源: ${validPlugins.length} 个`);
  console.log(`🔴 失效/异常源: ${deadPlugins.length} 个`);
  console.log('=========================================\n');

  console.log('可用源清单:');
  validPlugins.forEach(p => console.log(`  - ${p.name} (${p.platform}) [${p.duration}ms]`));

  console.log('\n失效源清单:');
  deadPlugins.forEach(p => console.log(`  - ${p.name} (${p.reason})`));
}

testAll();
