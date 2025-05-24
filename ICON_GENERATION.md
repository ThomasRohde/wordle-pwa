
# Icon Generation Instructions

The SVG icons have been created, but you need to convert them to PNG format.

## Option 1: Use the generate-icons.html file
1. Open generate-icons.html in your browser
2. The icons will be generated automatically
3. Click the download buttons to save as PNG files
4. Move the downloaded files to public/icons/

## Option 2: Use an online converter
1. Go to an SVG to PNG converter (like convertio.co or cloudconvert.com)
2. Upload public/icons/pwa-192x192.svg and convert to PNG
3. Upload public/icons/pwa-512x512.svg and convert to PNG
4. Save the PNG files in public/icons/

## Option 3: Use command line tools
If you have ImageMagick or Inkscape installed:

# With ImageMagick:
convert public/icons/pwa-192x192.svg public/icons/pwa-192x192.png
convert public/icons/pwa-512x512.svg public/icons/pwa-512x512.png

# With Inkscape:
inkscape --export-png=public/icons/pwa-192x192.png --export-width=192 --export-height=192 public/icons/pwa-192x192.svg
inkscape --export-png=public/icons/pwa-512x512.png --export-width=512 --export-height=512 public/icons/pwa-512x512.svg

## Note:
For now, placeholder PNG files will be created that you can replace with proper ones.
