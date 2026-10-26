import fs from 'fs';
import path from 'path';

const brainDir = 'C:\\Users\\acer\\.gemini\\antigravity-ide\\brain\\ff314bfa-e062-483b-8961-50fc38a59c12';
const destDir = path.resolve('src', 'assets');

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const mappings = [
  { prefix: 'hero_sphere_isolated', dest: 'hero-orb.jpg' },
  { prefix: 'about_metallic_ribbon', dest: 'about-ribbon.jpg' },
  { prefix: 'banner_purple_flow', dest: 'banner-flow.jpg' },
  { prefix: 'product_ribbon_twist', dest: 'product-ribbon.jpg' },
  { prefix: 'product_liquid_chrome', dest: 'product-chrome.jpg' },
  { prefix: 'product_purple_sculpture', dest: 'product-sculpture.jpg' },
  { prefix: 'testimonial_fluid_wave', dest: 'testimonial-wave.jpg' }
];

const brainFiles = fs.readdirSync(brainDir);

for (const m of mappings) {
  const match = brainFiles.find(f => f.startsWith(m.prefix) && (f.endsWith('.jpg') || f.endsWith('.png')));
  if (match) {
    fs.copyFileSync(path.join(brainDir, match), path.join(destDir, m.dest));
    console.log(`Copied ${match} to ${m.dest}`);
  } else {
    console.warn(`Could not find file with prefix ${m.prefix}`);
  }
}
