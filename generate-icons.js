#!/usr/bin/env node

import { createCanvas } from 'canvas';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function drawIcon(canvas, size) {
    const ctx = canvas.getContext('2d');
    const tileSize = size === 192 ? 32 : 80;
    const padding = size === 192 ? 24 : 64;
    const fontSize = size === 192 ? 18 : 48;
    const startY = size === 192 ? 48 : 128;
    
    // Background
    ctx.fillStyle = '#6aaa64';
    ctx.fillRect(0, 0, size, size);
    
    // Helper function to draw rounded rectangle
    function drawRoundedRect(x, y, width, height, radius, fillStyle) {
        ctx.fillStyle = fillStyle;
        ctx.beginPath();
        ctx.roundRect(x, y, width, height, radius);
        ctx.fill();
    }
    
    // Helper function to draw text
    function drawText(text, x, y, color) {
        ctx.fillStyle = color;
        ctx.font = `bold ${fontSize}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, x + tileSize/2, y + tileSize/2);
    }
    
    // Row 1 - WORD
    drawRoundedRect(padding, startY, tileSize, tileSize, 4, 'white');
    drawRoundedRect(padding + tileSize + 8, startY, tileSize, tileSize, 4, 'white');
    drawRoundedRect(padding + (tileSize + 8) * 2, startY, tileSize, tileSize, 4, 'white');
    drawRoundedRect(padding + (tileSize + 8) * 3, startY, tileSize, tileSize, 4, 'white');
    
    drawText('W', padding, startY, '#333');
    drawText('O', padding + tileSize + 8, startY, '#333');
    drawText('R', padding + (tileSize + 8) * 2, startY, '#333');
    drawText('D', padding + (tileSize + 8) * 3, startY, '#333');
    
    // Row 2 - LESS
    drawRoundedRect(padding, startY + tileSize + 8, tileSize, tileSize, 4, '#c9b458');
    drawRoundedRect(padding + tileSize + 8, startY + tileSize + 8, tileSize, tileSize, 4, 'white');
    drawRoundedRect(padding + (tileSize + 8) * 2, startY + tileSize + 8, tileSize, tileSize, 4, '#6aaa64');
    drawRoundedRect(padding + (tileSize + 8) * 3, startY + tileSize + 8, tileSize, tileSize, 4, 'white');
    
    drawText('L', padding, startY + tileSize + 8, 'white');
    drawText('E', padding + tileSize + 8, startY + tileSize + 8, '#333');
    drawText('S', padding + (tileSize + 8) * 2, startY + tileSize + 8, 'white');
    drawText('S', padding + (tileSize + 8) * 3, startY + tileSize + 8, '#333');
    
    // Row 3 - PWA!
    drawRoundedRect(padding, startY + (tileSize + 8) * 2, tileSize, tileSize, 4, '#787c7e');
    drawRoundedRect(padding + tileSize + 8, startY + (tileSize + 8) * 2, tileSize, tileSize, 4, '#787c7e');
    drawRoundedRect(padding + (tileSize + 8) * 2, startY + (tileSize + 8) * 2, tileSize, tileSize, 4, '#6aaa64');
    drawRoundedRect(padding + (tileSize + 8) * 3, startY + (tileSize + 8) * 2, tileSize, tileSize, 4, '#6aaa64');
    
    drawText('P', padding, startY + (tileSize + 8) * 2, 'white');
    drawText('W', padding + tileSize + 8, startY + (tileSize + 8) * 2, 'white');
    drawText('A', padding + (tileSize + 8) * 2, startY + (tileSize + 8) * 2, 'white');
    drawText('!', padding + (tileSize + 8) * 3, startY + (tileSize + 8) * 2, 'white');
}

function generateIcons() {
    const iconsDir = path.join(__dirname, 'public', 'icons');
    
    // Ensure icons directory exists
    if (!fs.existsSync(iconsDir)) {
        fs.mkdirSync(iconsDir, { recursive: true });
    }
    
    console.log('Generating PWA icons...');
    
    // Generate 192x192 icon
    const canvas192 = createCanvas(192, 192);
    drawIcon(canvas192, 192);
    const buffer192 = canvas192.toBuffer('image/png');
    fs.writeFileSync(path.join(iconsDir, 'pwa-192x192.png'), buffer192);
    console.log('Generated pwa-192x192.png');
    
    // Generate 512x512 icon
    const canvas512 = createCanvas(512, 512);
    drawIcon(canvas512, 512);
    const buffer512 = canvas512.toBuffer('image/png');
    fs.writeFileSync(path.join(iconsDir, 'pwa-512x512.png'), buffer512);
    console.log('Generated pwa-512x512.png');
    
    console.log('Icons generated successfully!');
}

generateIcons();
