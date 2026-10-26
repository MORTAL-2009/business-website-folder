import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const fs = require('fs');
const path = require('path');
const { Jimp } = require('jimp');

async function main() {
  const imgDir = path.resolve('..', 'images');
  const files = fs.readdirSync(imgDir);
  for (const f of files) {
    if (f.endsWith('.png') || f.endsWith('.jpg')) {
      const fullPath = path.join(imgDir, f);
      const img = await Jimp.read(fullPath);
      console.log(`${f}: width=${img.bitmap.width}, height=${img.bitmap.height}`);
    }
  }
}
main().catch(console.error);
