import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const fs = require('fs');
const path = require('path');
const { Jimp } = require('jimp');

async function cropAssets() {
  const imgDir = path.resolve('..', 'images');
  const outDir = path.resolve('src', 'assets');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const heroImg = await Jimp.read(path.join(imgDir, 'image.png'));
  const fullImg = await Jimp.read(path.join(imgDir, 'image copy.png'));
  const bannerImg = await Jimp.read(path.join(imgDir, 'image copy 3.png'));

  console.log('image.png size:', heroImg.bitmap.width, heroImg.bitmap.height);
  console.log('image copy.png size:', fullImg.bitmap.width, fullImg.bitmap.height);

  // In image.png:
  // Center orb:
  // Let's crop a region around the sphere:
  const sphere = heroImg.clone().crop({ x: 175, y: 110, w: 185, h: 245 });
  await sphere.write(path.join(outDir, 'hero-sphere.png'));

  // About us preview (bottom left card in image.png):
  const aboutArt = heroImg.clone().crop({ x: 60, y: 495, w: 115, h: 65 });
  await aboutArt.write(path.join(outDir, 'about-art.png'));

  // From fullImg (image copy.png, 752x564):
  // Left column goes from ~x=25 to ~x=395
  // Right column goes from ~x=410 to ~x=735
  
  // Service Card 1 ribbon (bottom left of left column):
  const serviceCard1 = fullImg.clone().crop({ x: 45, y: 410, w: 135, h: 105 });
  await serviceCard1.write(path.join(outDir, 'service-card1.png'));

  // Product 02 card graphic:
  const prodCard1 = fullImg.clone().crop({ x: 432, y: 8, w: 88, h: 95 });
  await prodCard1.write(path.join(outDir, 'product-card1.png'));

  // Product 03 card graphic:
  const prodCard2 = fullImg.clone().crop({ x: 524, y: 30, w: 90, h: 95 });
  await prodCard2.write(path.join(outDir, 'product-card2.png'));

  // Product 04 card graphic:
  const prodCard3 = fullImg.clone().crop({ x: 618, y: 55, w: 90, h: 95 });
  await prodCard3.write(path.join(outDir, 'product-card3.png'));

  // Why choose us left ribbon:
  const whyRibbon = fullImg.clone().crop({ x: 435, y: 215, w: 65, h: 80 });
  await whyRibbon.write(path.join(outDir, 'why-ribbon.png'));

  // Why choose us right orb:
  const whyOrb = fullImg.clone().crop({ x: 660, y: 285, w: 46, h: 48 });
  await whyOrb.write(path.join(outDir, 'why-orb.png'));

  // Testimonial visual:
  const testVisual = fullImg.clone().crop({ x: 638, y: 388, w: 65, h: 65 });
  await testVisual.write(path.join(outDir, 'testimonial-avatar.png'));

  // Video banner (from image copy 3.png):
  // Look at the angled banner in the middle:
  const bannerArt = bannerImg.clone().crop({ x: 270, y: 270, w: 450, h: 180 });
  await bannerArt.write(path.join(outDir, 'banner-art.png'));

  console.log('All crops created successfully!');
}

cropAssets().catch(console.error);
