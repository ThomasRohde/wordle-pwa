#!/usr/bin/env node

import { createCanvas } from 'canvas';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function drawIcon(canvas, size) {
    const ctx = canvas.getContext('2d');
    
    // Background with rounded corners
    ctx.fillStyle = '#6aaa64';
    ctx.fillRect(0, 0, size, size);
    
    // Calculate proportional sizes
    const tileSize = Math.floor(size / 6);
    const gap = Math.floor(size / 24);
    const startX = (size - (4 * tileSize + 3 * gap)) / 2;
    const startY = size / 3;
    
    // Helper function to draw rounded rectangle
    function drawRoundedRect(x, y, width, height, radius, fillStyle) {
        ctx.fillStyle = fillStyle;
        ctx.beginPath();
        ctx.roundRect(x, y, width, height, radius);
        ctx.fill();
    }
    
    // Helper function to draw simple letter shapes using paths instead of text
    function drawLetter(letter, x, y, color) {
        ctx.fillStyle = color;
        ctx.strokeStyle = color;
        ctx.lineWidth = Math.max(2, size / 128);
        
        const centerX = x + tileSize / 2;
        const centerY = y + tileSize / 2;
        const letterSize = tileSize * 0.4;
        
        ctx.beginPath();
        
        // Simple geometric representations of letters
        switch(letter) {
            case 'W':
                // Draw W as connected lines
                ctx.moveTo(centerX - letterSize/2, centerY - letterSize/2);
                ctx.lineTo(centerX - letterSize/4, centerY + letterSize/2);
                ctx.lineTo(centerX, centerY);
                ctx.lineTo(centerX + letterSize/4, centerY + letterSize/2);
                ctx.lineTo(centerX + letterSize/2, centerY - letterSize/2);
                break;
            case 'O':
                // Draw O as circle
                ctx.arc(centerX, centerY, letterSize/2, 0, 2 * Math.PI);
                break;
            case 'R':
                // Draw R as lines
                ctx.moveTo(centerX - letterSize/2, centerY + letterSize/2);
                ctx.lineTo(centerX - letterSize/2, centerY - letterSize/2);
                ctx.lineTo(centerX + letterSize/2, centerY - letterSize/2);
                ctx.lineTo(centerX + letterSize/2, centerY);
                ctx.lineTo(centerX - letterSize/2, centerY);
                ctx.moveTo(centerX, centerY);
                ctx.lineTo(centerX + letterSize/2, centerY + letterSize/2);
                break;
            case 'D':
                // Draw D as rounded rectangle
                ctx.roundRect(centerX - letterSize/2, centerY - letterSize/2, letterSize, letterSize, letterSize/4);
                break;
            case 'L':
                // Draw L as lines
                ctx.moveTo(centerX - letterSize/2, centerY - letterSize/2);
                ctx.lineTo(centerX - letterSize/2, centerY + letterSize/2);
                ctx.lineTo(centerX + letterSize/2, centerY + letterSize/2);
                break;
            case 'E':
                // Draw E as lines
                ctx.moveTo(centerX - letterSize/2, centerY - letterSize/2);
                ctx.lineTo(centerX + letterSize/2, centerY - letterSize/2);
                ctx.moveTo(centerX - letterSize/2, centerY - letterSize/2);
                ctx.lineTo(centerX - letterSize/2, centerY + letterSize/2);
                ctx.moveTo(centerX - letterSize/2, centerY);
                ctx.lineTo(centerX + letterSize/4, centerY);
                ctx.moveTo(centerX - letterSize/2, centerY + letterSize/2);
                ctx.lineTo(centerX + letterSize/2, centerY + letterSize/2);
                break;
            case 'S':
                // Draw S as curved path
                ctx.arc(centerX, centerY - letterSize/4, letterSize/4, Math.PI, 0);
                ctx.arc(centerX, centerY + letterSize/4, letterSize/4, 0, Math.PI);
                break;
            case 'P':
                // Draw P as lines
                ctx.moveTo(centerX - letterSize/2, centerY + letterSize/2);
                ctx.lineTo(centerX - letterSize/2, centerY - letterSize/2);
                ctx.lineTo(centerX + letterSize/2, centerY - letterSize/2);
                ctx.lineTo(centerX + letterSize/2, centerY);
                ctx.lineTo(centerX - letterSize/2, centerY);
                break;
            case 'A':
                // Draw A as triangle with crossbar
                ctx.moveTo(centerX, centerY - letterSize/2);
                ctx.lineTo(centerX - letterSize/2, centerY + letterSize/2);
                ctx.moveTo(centerX, centerY - letterSize/2);
                ctx.lineTo(centerX + letterSize/2, centerY + letterSize/2);
                ctx.moveTo(centerX - letterSize/4, centerY + letterSize/8);
                ctx.lineTo(centerX + letterSize/4, centerY + letterSize/8);
                break;
            case '!':
                // Draw ! as line and dot
                ctx.moveTo(centerX, centerY - letterSize/2);
                ctx.lineTo(centerX, centerY + letterSize/8);
                ctx.moveTo(centerX, centerY + letterSize/3);
                ctx.lineTo(centerX, centerY + letterSize/2);
                break;
        }
        
        ctx.stroke();
    }
    
    // Row 1 - WORD
    drawRoundedRect(startX, startY, tileSize, tileSize, 4, 'white');
    drawRoundedRect(startX + tileSize + gap, startY, tileSize, tileSize, 4, 'white');
    drawRoundedRect(startX + (tileSize + gap) * 2, startY, tileSize, tileSize, 4, 'white');
    drawRoundedRect(startX + (tileSize + gap) * 3, startY, tileSize, tileSize, 4, 'white');
    
    drawLetter('W', startX, startY, '#333');
    drawLetter('O', startX + tileSize + gap, startY, '#333');
    drawLetter('R', startX + (tileSize + gap) * 2, startY, '#333');
    drawLetter('D', startX + (tileSize + gap) * 3, startY, '#333');
    
    // Row 2 - LESS
    drawRoundedRect(startX, startY + tileSize + gap, tileSize, tileSize, 4, '#c9b458');
    drawRoundedRect(startX + tileSize + gap, startY + tileSize + gap, tileSize, tileSize, 4, 'white');
    drawRoundedRect(startX + (tileSize + gap) * 2, startY + tileSize + gap, tileSize, tileSize, 4, '#6aaa64');
    drawRoundedRect(startX + (tileSize + gap) * 3, startY + tileSize + gap, tileSize, tileSize, 4, 'white');
    
    drawLetter('L', startX, startY + tileSize + gap, 'white');
    drawLetter('E', startX + tileSize + gap, startY + tileSize + gap, '#333');
    drawLetter('S', startX + (tileSize + gap) * 2, startY + tileSize + gap, 'white');
    drawLetter('S', startX + (tileSize + gap) * 3, startY + tileSize + gap, '#333');
    
    // Row 3 - PWA!
    drawRoundedRect(startX, startY + (tileSize + gap) * 2, tileSize, tileSize, 4, '#787c7e');
    drawRoundedRect(startX + tileSize + gap, startY + (tileSize + gap) * 2, tileSize, tileSize, 4, '#787c7e');
    drawRoundedRect(startX + (tileSize + gap) * 2, startY + (tileSize + gap) * 2, tileSize, tileSize, 4, '#6aaa64');
    drawRoundedRect(startX + (tileSize + gap) * 3, startY + (tileSize + gap) * 2, tileSize, tileSize, 4, '#6aaa64');
    
    drawLetter('P', startX, startY + (tileSize + gap) * 2, 'white');
    drawLetter('W', startX + tileSize + gap, startY + (tileSize + gap) * 2, 'white');
    drawLetter('A', startX + (tileSize + gap) * 2, startY + (tileSize + gap) * 2, 'white');
    drawLetter('!', startX + (tileSize + gap) * 3, startY + (tileSize + gap) * 2, 'white');
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
