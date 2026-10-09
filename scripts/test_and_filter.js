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

async function testSinglePlugin(pluginDir) {
  const targetJs = path.join(distDir, pluginDir, 'index.js');
  try {
    await fs.access(targetJs);
    const plugin = require(targetJs);
    const startTime = Date.now();

    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('请求超时 (7s)')), 7000)
    );

    const searchPromise = plugin.search('斗罗大陆', 1);
    const result = await Promise.race([searchPromise, timeoutPromise]);
    const duration = Date.now() - startTime;

    if (result && result.data && result.data.length > 0) {
      return {
        status: 'ok',
        dir: pluginDir,
        platform: plugin.platform,
        name: plugin.name,
        duration,
        count: result.data.length
      };
    } else {
      const retryResult = await Promise.race([plugin.search('阿凡达', 1), timeoutPromise]);
      if (retryResult && retryResult.data && retryResult.data.length > 0) {
        return {
          status: 'ok',
          dir: pluginDir,
          platform: plugin.platform,
          name: plugin.name,
          duration: Date.now() - startTime,
          count: retryResult.data.length
        };
      } else {
        return { status: 'empty', dir: pluginDir, name: plugin.name, reason: '搜索无数据返回' };
      }
    }
  } catch (err) {
    return { status: 'error', dir: pluginDir, name: pluginDir, reason: err.message };
  }
}

async function testAll() {
  console.log('🔍 开始全并发检测所有视频源插件实时连通性...\n');

  const entries = await fs.readdir(distDir, { withFileTypes: true });
  const pluginDirs = entries
    .filter(e => e.isDirectory() && !e.name.startsWith('_'))
    .map(e => e.name);

  const results = await Promise.all(pluginDirs.map(testSinglePlugin));

  const validPlugins = results.filter(r => r.status === 'ok');
  const deadPlugins = results.filter(r => r.status !== 'ok');

  validPlugins.sort((a, b) => a.duration - b.duration);

  for (const p of validPlugins) {
    console.log(`✅ [可用] ${p.name.padEnd(8, ' ')} (${p.platform.padEnd(16, ' ')}) - 耗时: ${p.duration.toString().padStart(4, ' ')}ms, 结果数: ${p.count}`);
  }

  for (const d of deadPlugins) {
    console.log(`❌ [失效] ${d.name} (${d.dir}) - 原因: ${d.reason}`);
  }

  console.log('\n=========================================');
  console.log(`📊 检测完毕: 共检测 ${results.length} 个插件源`);
  console.log(`🟢 可用源: ${validPlugins.length} 个 (${Math.round(validPlugins.length / results.length * 100)}%)`);
  console.log(`🔴 失效/异常源: ${deadPlugins.length} 个`);
  console.log('=========================================\n');

  if (deadPlugins.length > 0) {
    process.exit(1);
  } else {
    console.log('🎉 所有 JS 插件源 100% 验证通过！');
  }
}

testAll();
