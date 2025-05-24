# Wordle PWA Icon Generation

This directory contains the icon files for the Wordle PWA.

## Current Files

- `pwa-192x192.svg` - Vector icon (192x192)
- `pwa-512x512.svg` - Vector icon (512x512)

## Missing Files (To Be Generated)

- `pwa-192x192.png` - Required for PWA manifest
- `pwa-512x512.png` - Required for PWA manifest

## How to Generate PNG Icons

### Option 1: Use the HTML Generator (Recommended)
1. Open `../generate-icons.html` in your web browser
2. The icons will be automatically generated
3. Click the download buttons to save the PNG files
4. Move the downloaded files to this directory

### Option 2: Command Line Tools
If you have ImageMagick installed:
```bash
convert pwa-192x192.svg pwa-192x192.png
convert pwa-512x512.svg pwa-512x512.png
```

### Option 3: Online Converters
1. Visit an SVG to PNG converter website
2. Upload the SVG files
3. Convert and download the PNG versions
4. Ensure the dimensions are exactly 192x192 and 512x512

## Notes
- The setup script creates minimal placeholder PNG files
- Replace these with proper icons for the best user experience
- Icons should have rounded corners and good contrast
- Test the icons on different devices and backgrounds
