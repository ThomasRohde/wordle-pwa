# PWA Install Button Troubleshooting Guide

## Issue: Install button not visible on GitHub Pages

The PWA install button works in development but disappears when deployed to GitHub Pages. This is a common issue with specific causes and solutions.

## Root Causes

### 1. PWA Installation Criteria Not Met
The `beforeinstallprompt` event only fires when ALL criteria are met:
- ✅ **HTTPS**: GitHub Pages provides this automatically
- ✅ **Valid Web App Manifest**: Must be accessible and valid JSON
- ✅ **Service Worker**: Must be registered and active
- ✅ **Icons**: Must be valid PNG files (not placeholders)
- ✅ **Not Already Installed**: Event won't fire if PWA is installed
- ✅ **User Engagement**: Requires user interaction with the site

### 2. Icon Path Issues (Most Common)
- **Problem**: Relative paths in manifest don't work on GitHub Pages
- **Solution**: Use absolute paths starting with `/repo-name/`

### 3. Service Worker Scope Issues
- **Problem**: SW scope doesn't match deployment path
- **Solution**: Ensure scope is set to `/repo-name/` in manifest

## Debugging Steps

### Step 1: Check Console Logs
Open browser DevTools Console and look for:
```
Initializing PWA...
beforeinstallprompt event fired!
PWA install prompt available
```

If you don't see "beforeinstallprompt event fired!", the criteria aren't met.

### Step 2: Run PWA Criteria Check
In the browser console, run:
```javascript
checkPWAInstallCriteria()
```

This will show which criteria are failing.

### Step 3: Verify Manifest
1. Open DevTools > Application > Manifest
2. Check for errors in the manifest
3. Verify all icon URLs return valid images (not 404s)

### Step 4: Check Service Worker
1. Open DevTools > Application > Service Workers
2. Verify SW is registered and active
3. Check for any registration errors

### Step 5: Test Icon Validity
Visit icon URLs directly:
- `https://yourusername.github.io/wordle-pwa/icons/pwa-192x192.png`
- `https://yourusername.github.io/wordle-pwa/icons/pwa-512x512.png`

Icons should display properly and be > 1KB in size.

## Solutions Applied

### 1. Fixed Icon Paths (✅ APPLIED)
Updated `vite.config.ts` to use absolute paths:
```typescript
icons: [
  {
    src: '/wordle-pwa/icons/pwa-192x192.png', // Absolute path
    sizes: '192x192',
    type: 'image/png'
  }
]
```

### 2. Enhanced Debugging (✅ APPLIED)
Added comprehensive logging to `src/utils/pwa.ts` to help identify issues.

### 3. Added Debug Function (✅ APPLIED)
Added `checkPWAInstallCriteria()` function available in browser console.

## Alternative Installation Methods

If the install button still doesn't appear, users can install manually:

### Desktop (Chrome/Edge)
1. Look for install icon (⊕) in address bar
2. Or: Menu → "Install Wordle PWA"

### Mobile (iOS Safari)
1. Tap Share button (□↗)
2. Select "Add to Home Screen"

### Mobile (Android Chrome)
1. Tap menu (⋮)
2. Select "Add to Home Screen" or "Install App"

## Testing Locally

To test PWA functionality locally:

```bash
# Build and preview production version
npm run build
npm run preview

# Test in incognito/private window to avoid cached state
# Check DevTools > Application > Manifest for errors
```

## GitHub Pages Specific Issues

### Jekyll Processing
- ✅ **Solved**: `.nojekyll` file prevents Jekyll from interfering

### Branch Configuration
- ✅ **Updated**: GitHub Actions workflow now uses `main` branch

### HTTPS Requirement
- ✅ **Built-in**: GitHub Pages provides HTTPS automatically

## Next Steps

1. **Deploy Changes**: Push the icon path fixes to trigger new deployment
2. **Wait for Propagation**: GitHub Pages can take 5-10 minutes to update
3. **Test in Fresh Browser**: Use incognito/private window to avoid cache
4. **Check Multiple Browsers**: Test in Chrome, Edge, Firefox
5. **Mobile Testing**: Test on actual mobile devices, not just DevTools simulation

## Still Not Working?

If the install button still doesn't appear after these fixes:

1. Check that icons were generated properly:
   ```bash
   node generate-icons.js
   ```

2. Verify deployment completed successfully in GitHub Actions

3. Test the deployed site in multiple browsers and devices

4. Use browser DevTools to check for any console errors

5. Verify the manifest is accessible:
   `https://yourusername.github.io/wordle-pwa/manifest.webmanifest`

Remember: PWA install prompts are intentionally restrictive to prevent spam. The criteria must be met exactly for the install button to appear.
