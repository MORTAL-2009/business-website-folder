import fs from 'fs';
import path from 'path';

const srcDir = path.resolve('..', 'images');
const destDir = path.resolve('public', 'original-images');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

for (const f of fs.readdirSync(srcDir)) {
  fs.copyFileSync(path.join(srcDir, f), path.join(destDir, f));
  console.log(`Copied original ${f} to public/original-images/`);
}
