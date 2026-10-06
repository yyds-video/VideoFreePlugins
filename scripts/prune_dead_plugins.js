const fs = require('fs/promises');
const path = require('path');

const deadList = [
  'dbzy',
  'kuaiche',
  'maotai',
  'modu',
  'niuniu',
  'piaoling',
  'pubu',
  'siquan',
  'snzy',
  'wolong',
  'yaya'
];

async function prune() {
  console.log(`🧹 开始清理 ${deadList.length} 个失效源插件...`);

  for (const name of deadList) {
    // 1. 删除 plugins/ 目录
    const pluginDir = path.resolve(__dirname, '../plugins', name);
    try {
      await fs.rm(pluginDir, { recursive: true, force: true });
      console.log(`🗑️ 已删除 plugins/${name}`);
    } catch (_) {}

    // 2. 删除 dist/ 目录
    const distDir = path.resolve(__dirname, '../dist', name);
    try {
      await fs.rm(distDir, { recursive: true, force: true });
      console.log(`🗑️ 已删除 dist/${name}`);
    } catch (_) {}

    // 3. 删除 assets/plugins/ 中的文件
    const assetFile = path.resolve(__dirname, '../../assets/plugins', `${name}.js`);
    try {
      await fs.unlink(assetFile);
      console.log(`🗑️ 已删除 assets/plugins/${name}.js`);
    } catch (_) {}
  }

  console.log('✨ 清理完成！');
}

prune().catch(console.error);
