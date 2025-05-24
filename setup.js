#!/usr/bin/env node

/**
 * Project Setup Script for Wordle PWA
 * This script helps set up the project and generates necessary files
 */

const fs = require('fs');
const path = require('path');

console.log('🎮 Setting up Wordle PWA...\n');

// Function to create a minimal PNG file (1x1 green pixel)
function createMinimalPNG() {
  // This is a base64-encoded 1x1 green PNG
  const base64PNG = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';
  return Buffer.from(base64PNG, 'base64');
}

// Create proper PNG icon files if they don't exist
function createIconFiles() {
  const iconsDir = path.join(__dirname, 'public', 'icons');
  
  if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir, { recursive: true });
  }

  const iconSizes = ['192x192', '512x512'];
  
  iconSizes.forEach(size => {
    const iconPath = path.join(iconsDir, `pwa-${size}.png`);
    
    if (!fs.existsSync(iconPath) || fs.statSync(iconPath).size < 100) {
      console.log(`📱 Creating placeholder icon: pwa-${size}.png`);
      
      // Create a minimal PNG file
      const pngData = createMinimalPNG();
      fs.writeFileSync(iconPath, pngData);
      
      console.log(`✅ Created placeholder icon: pwa-${size}.png`);
      console.log(`   ⚠️  Replace this with a proper ${size} icon later`);
    }
  });
}

// Create favicon.ico if it doesn't exist
function createFavicon() {
  const faviconPath = path.join(__dirname, 'public', 'favicon.ico');
  
  if (!fs.existsSync(faviconPath)) {
    console.log('🔗 Creating favicon...');
    const pngData = createMinimalPNG();
    fs.writeFileSync(faviconPath, pngData);
    console.log('✅ Created placeholder favicon.ico');
  }
}

// Update package.json homepage if needed
function updatePackageJson() {
  const packagePath = path.join(__dirname, 'package.json');
  
  if (fs.existsSync(packagePath)) {
    const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    
    if (packageJson.homepage === 'https://yourusername.github.io/wordle-pwa') {
      console.log('\n⚠️  Don\'t forget to update the homepage URL in package.json');
      console.log('   Replace "yourusername" with your GitHub username');
    }
  }
}

// Update vite.config.ts if needed
function checkViteConfig() {
  const vitePath = path.join(__dirname, 'vite.config.ts');
  
  if (fs.existsSync(vitePath)) {
    const viteConfig = fs.readFileSync(vitePath, 'utf8');
    
    if (viteConfig.includes("const REPO_NAME = 'wordle-pwa'")) {
      console.log('\n⚠️  Don\'t forget to update the REPO_NAME in vite.config.ts');
      console.log('   Set it to your actual GitHub repository name');
    }
  }
}

// Main setup function
function setup() {
  try {
    createIconFiles();
    createFavicon();
    updatePackageJson();
    checkViteConfig();
    
    console.log('\n🎉 Setup complete!');
    console.log('\n📋 Next steps:');
    console.log('   1. Run: npm install');
    console.log('   2. Run: npm run dev');
    console.log('   3. Open: http://localhost:3000');
    console.log('   4. Generate proper icons using generate-icons.html');
    console.log('   5. Update GitHub repository settings for deployment');
    
    console.log('\n📝 For better icons:');
    console.log('   1. Open generate-icons.html in your browser');
    console.log('   2. Download the generated PNG files');
    console.log('   3. Replace the placeholder files in public/icons/');
    
    console.log('\n🚀 To deploy to GitHub Pages:');
    console.log('   1. Update repository name in vite.config.ts');
    console.log('   2. Update homepage in package.json');
    console.log('   3. Run: npm run build && npm run deploy');
    
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    process.exit(1);
  }
}

// Run setup
setup();
