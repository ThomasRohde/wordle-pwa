#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Minimal 1x1 green PNG (base64 decoded to binary)
const greenPixelPNG = Buffer.from([
  0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A, 0x00, 0x00, 0x00, 0x0D,
  0x49, 0x48, 0x44, 0x52, 0x00, 0x00, 0x00, 0x01, 0x00, 0x00, 0x00, 0x01,
  0x08, 0x02, 0x00, 0x00, 0x00, 0x90, 0x77, 0x53, 0xDE, 0x00, 0x00, 0x00,
  0x0C, 0x49, 0x44, 0x41, 0x54, 0x08, 0x57, 0x63, 0x60, 0x00, 0x02, 0x00,
  0x00, 0x05, 0x00, 0x01, 0x0D, 0x0A, 0x2D, 0xB4, 0x00, 0x00, 0x00, 0x00,
  0x49, 0x45, 0x4E, 0x44, 0xAE, 0x42, 0x60, 0x82
]);

const iconsDir = path.join(__dirname, 'public', 'icons');

// Create icons directory if it doesn't exist
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Create PNG files
const sizes = ['192x192', '512x512'];
sizes.forEach(size => {
  const filePath = path.join(iconsDir, `pwa-${size}.png`);
  fs.writeFileSync(filePath, greenPixelPNG);
  console.log(`✅ Created ${size} PNG icon`);
});

// Create favicon
const faviconPath = path.join(__dirname, 'public', 'favicon.ico');
fs.writeFileSync(faviconPath, greenPixelPNG);
console.log('✅ Created favicon.ico');

console.log('\n🎉 Basic PNG icons created!');
console.log('📝 These are minimal placeholder icons.');
console.log('🎨 For better icons, open generate-icons.html in your browser.');
