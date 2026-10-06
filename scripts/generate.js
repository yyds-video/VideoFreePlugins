const fs = require('fs/promises');
const path = require('path');

const distDir = path.resolve(__dirname, '../dist');
const rootJsonFile = path.resolve(__dirname, '../plugins.json');

async function generate() {
  console.log('📦 正在生成 plugins.json 订阅文件...');
  
  const entries = await fs.readdir(distDir, { withFileTypes: true });
  const plugins = [];

  for (const entry of entries) {
    if (entry.isDirectory() && !entry.name.startsWith('_')) {
      const pluginDir = entry.name;
      const targetJs = path.join(distDir, pluginDir, 'index.js');

      try {
        await fs.access(targetJs);
        // 动态 require 或正则表达式提取元数据
        const content = await fs.readFile(targetJs, 'utf-8');
        
        let platformMatch = content.match(/platform:\s*['"`](.*?)['"`]/);
        let nameMatch = content.match(/name:\s*['"`](.*?)['"`]/);
        let versionMatch = content.match(/version:\s*['"`](.*?)['"`]/);
        let descMatch = content.match(/description:\s*['"`](.*?)['"`]/);
        let srcUrlMatch = content.match(/srcUrl:\s*['"`](.*?)['"`]/);

        const platform = platformMatch ? platformMatch[1] : pluginDir;
        const name = nameMatch ? nameMatch[1] : pluginDir;
        const version = versionMatch ? versionMatch[1] : '1.0.0';
        const description = descMatch ? descMatch[1] : '';
        const srcUrl = srcUrlMatch ? srcUrlMatch[1] : `dist/${pluginDir}/index.js`;

        plugins.push({
          name: name,
          platform: platform,
          version: version,
          url: `dist/${pluginDir}/index.js`,
          srcUrl: srcUrl,
          description: description
        });
      } catch (err) {
        console.warn(`⚠️ 解析插件元数据失败 (${pluginDir}):`, err.message);
      }
    }
  }

  const output = {
    name: "VideoFreePlugins 官方精选插件库",
    version: "1.0.0",
    description: "VideoFree 视频播放器精选插件集合，包含苹果CMS通用源、非凡、量子、暴风、索尼与B站公开源",
    plugins: plugins
  };

  const jsonStr = JSON.stringify(output, null, 2);
  
  // 写入根目录 plugins.json
  await fs.writeFile(rootJsonFile, jsonStr, 'utf-8');
  console.log(`✅ 已生成根目录订阅文件: ${rootJsonFile}`);

  // 写入 dist/_plugins/plugins.json
  const distPluginDir = path.join(distDir, '_plugins');
  await fs.mkdir(distPluginDir, { recursive: true });
  await fs.writeFile(path.join(distPluginDir, 'plugins.json'), jsonStr, 'utf-8');
  console.log(`✅ 已生成 dist/_plugins/plugins.json`);
  console.log(`🎉 订阅生成完毕，当前已包含 ${plugins.length} 个视频源插件！`);
}

generate().catch(err => {
  console.error('❌ 生成失败:', err);
  process.exit(1);
});
