const fs = require('fs/promises');
const path = require('path');

const srcDir = path.resolve(__dirname, '../plugins');
const distDir = path.resolve(__dirname, '../dist');

async function build() {
  console.log('🚀 开始构建 VideoFreePlugins...');
  await fs.mkdir(distDir, { recursive: true });

  const entries = await fs.readdir(srcDir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      const pluginName = entry.name;
      const targetDir = path.join(distDir, pluginName);
      await fs.mkdir(targetDir, { recursive: true });

      const srcFile = path.join(srcDir, pluginName, 'index.js');
      const distFile = path.join(targetDir, 'index.js');

      try {
        await fs.access(srcFile);
        await fs.copyFile(srcFile, distFile);
        console.log(`✅ 已编译插件: ${pluginName} -> dist/${pluginName}/index.js`);
      } catch (err) {
        console.warn(`⚠️ 未找到源文件: ${srcFile}`);
      }
    }
  }

  console.log('🎉 编译完成！');
}

build().catch(err => {
  console.error('❌ 编译失败:', err);
  process.exit(1);
});
