const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const LOGO_PATH = 'public/monotosh_logo_1.1.png';

async function generateFavicon(size) {
  // Resize the original logo using fit: 'contain' to preserve aspect ratio
  // within the square and keep the background transparent.
  const finalImage = await sharp(LOGO_PATH)
    .resize(size, size, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .png()
    .toBuffer();

  return finalImage;
}

function pngToIco(pngBuffer, width, height) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: ICO
  header.writeUInt16LE(1, 4); // number of images: 1

  const dir = Buffer.alloc(16);
  dir.writeUInt8(width >= 256 ? 0 : width, 0);
  dir.writeUInt8(height >= 256 ? 0 : height, 1);
  dir.writeUInt8(0, 2); // color palette
  dir.writeUInt8(0, 3); // reserved
  dir.writeUInt16LE(1, 4); // color planes
  dir.writeUInt16LE(32, 6); // bits per pixel
  dir.writeUInt32LE(pngBuffer.length, 8); // size of image data
  dir.writeUInt32LE(22, 12); // offset of image data

  return Buffer.concat([header, dir, pngBuffer]);
}

async function run() {
  console.log('Generating premium favicons with transparent background...');

  // Test with 512 first
  const img512 = await generateFavicon(512);
  fs.writeFileSync('public/android-chrome-512x512.png', img512);
  console.log('Generated android-chrome-512x512.png');

  // 192x192
  const img192 = await generateFavicon(192);
  fs.writeFileSync('public/android-chrome-192x192.png', img192);
  console.log('Generated android-chrome-192x192.png');

  // 180x180 (Apple Touch Icon)
  const img180 = await generateFavicon(180);
  fs.writeFileSync('public/apple-touch-icon.png', img180);
  console.log('Generated apple-touch-icon.png');

  // 32x32
  const img32 = await generateFavicon(32);
  fs.writeFileSync('public/favicon-32x32.png', img32);
  console.log('Generated favicon-32x32.png');

  // 16x16
  const img16 = await generateFavicon(16);
  fs.writeFileSync('public/favicon-16x16.png', img16);
  console.log('Generated favicon-16x16.png');

  // favicon.ico (containing 32x32)
  const icoBuffer = pngToIco(img32, 32, 32);
  fs.writeFileSync('public/favicon.ico', icoBuffer);
  console.log('Generated favicon.ico');

  console.log('All favicons successfully generated!');
}

run().catch(console.error);
