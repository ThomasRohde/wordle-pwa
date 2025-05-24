# PWA App Generator. 

**PWA Essentials**
    - Generate a **`manifest.webmanifest`** with name, short_name, description, theme_color, background_color, display mode `standalone`, start_url matching base path, and a full icon set (192 px & 512 px PNGs plus maskable).    - **CRITICAL PWA Icon Requirements**:
        - Generate **VALID PNG files** (not placeholder/empty files) - browsers will show 404 errors for invalid images even if files exist
        - Use automated icon generation with canvas/node libraries to ensure consistency
        - Add `prebuild` script to generate icons before every build: `"prebuild": "node generate-icons.js"`
        - Icon paths in manifest must be absolute for GitHub Pages: `/repo-name/icons/icon.png`
        - Test icon validity: files should be >1KB and display properly when opened directly
        - **DEBUGGING**: Add comprehensive logging to PWA utils to track `beforeinstallprompt` event
        - **USER ENGAGEMENT**: Install prompt requires user interaction - ensure app is used before testing install    - Configure **vite-plugin-pwa** to:
        - Register the Service Worker automatically (`registerType: "prompt"`).
        - Use explicit configuration: `filename: 'sw.js'` and `strategies: 'generateSW'`
        - Use **Workbox** defaults for precaching build assets.
        - Add runtime caching for same-origin images and JSON using a stale-while-revalidate strategy.
        - Set proper scope and start_url for subfolder deployment: `scope: '/repo-name/'`
        - **CRITICAL**: Ensure Service Worker scope matches GitHub Pages deployment path    - Create a custom **Service Worker** extension (if needed) to:
        - Cache API responses or dynamic JSON in IndexedDB when offline.
        - Show an "offline fallback page" for navigation requests.
        - Listen for the `beforeinstallprompt` event and expose a UI button to trigger install.
        - **DEBUGGING**: Include comprehensive logging and PWA criteria checking function
        - **FALLBACK**: Provide alternative installation instructions for manual install
    - Provide an **offline-ready** landing page and ensure all critical routes work without network.ect Idea:** `<insert your app idea here>`

**Task:** Scaffold a new **Progressive Web App (PWA)** that is fully static, stores data in browser storage, and can be deployed to GitHub Pages. Follow these guidelines:

**First step:**

1. **Generate a `TODO.md` file** at the project root listing the major tasks and subtasks.
2. Keep this `TODO.md` up to date—append/modify checklist items as the scaffold progresses so it always reflects remaining work.

**General requirements:**

1. **Project Setup**
    - Use **Vite** with **React + TypeScript**.
    - Add **vite-plugin-pwa** for automatic Service Worker generation and manifest injection.
    - **CRITICAL Vite Configuration for GitHub Pages**:
        ```typescript
        // vite.config.ts
        export default defineConfig({
          base: process.env.NODE_ENV === 'production' ? '/repo-name/' : '/',
          plugins: [
            VitePWA({
              registerType: 'prompt',
              filename: 'sw.js',
              strategies: 'generateSW',
              manifest: {
                scope: '/repo-name/',
                start_url: '/repo-name/',
                icons: [
                  {
                    src: '/repo-name/icons/pwa-192x192.png', // Absolute paths!
                    sizes: '192x192',
                    type: 'image/png'
                  }
                ]
              }
            })
          ]
        })
        ```
    - Include scripts in `package.json` for `dev`, `build`, `prebuild` (icon generation), and `deploy`.
    - **Dependency Management**: Install canvas for icon generation: `npm install --save-dev canvas`
    - Set proper package.json homepage: `"homepage": "https://username.github.io/repo-name"`
2. **PWA Essentials**
    - Generate a **`manifest.webmanifest`** with name, short_name, description, theme_color, background_color, display mode `standalone`, start_url `"./"`, and a full icon set (192 px & 512 px PNGs plus maskable).
    - Configure **vite-plugin-pwa** to:
        - Register the Service Worker automatically (`registerType: "prompt"`).
        - Use **Workbox** defaults for precaching build assets.
        - Add runtime caching for same-origin images and JSON using a stale-while-revalidate strategy.
    - Create a custom **Service Worker** extension (if needed) to:
        - Cache API responses or dynamic JSON in IndexedDB when offline.
        - Show an “offline fallback page” for navigation requests.
        - Listen for the `beforeinstallprompt` event and expose a UI button to trigger install.
    - Provide an **offline-ready** landing page and ensure all critical routes work without network.
3. **Data Persistence**
    - Use **Local Storage** (or optionally **IndexedDB** via a wrapper) for core user data.
    - Implement a context or custom hook that syncs React state ↔ storage with debounce saving.
    - Guarantee read/write still works when offline.
4. **State Management & Architecture**
    - Organize code into `components`, `pages`, `hooks`, `context`, `utils`, and `types`.
    - Keep components modular and responsive using **Tailwind CSS** (mobile-first).
    - Use React Router for navigation; ensure each route’s resources are precached.
5. **Enhanced PWA Features (Optional but scaffold-ready)**
    - Integrate **push notifications**: include a stub `notifications.ts` that requests permission and shows a local notification via the Service Worker.
    - Add **background sync** scaffolding to queue mutations while offline and replay them when back online (even though no real backend is used yet).
    - Provide a Lighthouse config and npm script (`npm run audit`) to test PWA scores.
6. **GitHub Pages Deployment**
    - **CRITICAL**: Configure `vite.config.ts` with proper base path for GitHub Pages subfolder deployment:
        ```typescript
        base: process.env.NODE_ENV === 'production' ? '/your-repo-name/' : '/',
        ```
    - **PWA Manifest Icon Paths**: Use absolute paths in manifest for GitHub Pages:
        ```typescript
        icons: [
          {
            src: '/your-repo-name/icons/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          }
        ]
        ```
    - **GitHub Actions Deployment** (Recommended over gh-pages package):
        - Create `.github/workflows/deploy.yml` with proper Node.js setup
        - Enable GitHub Pages with source: "GitHub Actions" in repo settings
        - Ensures consistent builds and proper asset handling
    - **Jekyll Prevention**: Always include `public/.nojekyll` file to prevent GitHub Pages Jekyll processing
    - **Icon Generation**: Create automated icon generation in build process with `prebuild` script
    - **Service Worker Scope**: Ensure SW scope matches the GitHub Pages base path
7. **Example Feature Implementation**
    - Build a minimal UI demonstrating:
        - Adding, editing, and deleting items (saved to storage).
        - An install-PWA button.
        - A toast/banner indicating offline or online status (listen to `navigator.onLine`).
8. **Documentation**
    - Generate a **README** explaining: setup, dev server, PWA testing (Chrome DevTools & Lighthouse), deployment steps, and how offline support works.
    - Include badges or instructions for verifying the PWA passes all core requirements.
    - Keep `TODO.md` current until all tasks are complete.
    - **Create DEPLOYMENT.md** with GitHub Pages specific instructions and troubleshooting
    - **Create PWA_TROUBLESHOOTING.md** with comprehensive debugging guide for install issues
    - Document icon generation process and automation
    - **Include debugging utilities**: Add `checkPWAInstallCriteria()` function for developer testing

## Common Pitfalls & Troubleshooting

**PWA Install Button Issues:**
- ❌ **Problem**: Install button works locally but disappears on GitHub Pages
- ✅ **Solution**: User must interact with site first - install prompt requires engagement
- ❌ **Problem**: `beforeinstallprompt` event not firing
- ✅ **Solution**: Check all PWA criteria - use debugging function to identify failures

**Icon Issues:**
- ❌ **Problem**: "Download error or resource isn't a valid image" in console
- ✅ **Solution**: Ensure PNG files are >1KB and valid. Use automated generation with canvas library.
- ❌ **Problem**: Icons show 404 errors on GitHub Pages
- ✅ **Solution**: Use absolute paths in manifest: `/repo-name/icons/icon.png`

**Service Worker Issues:**
- ❌ **Problem**: Service Worker 404 on deployment
- ✅ **Solution**: Explicitly set `filename: 'sw.js'` and `strategies: 'generateSW'` in VitePWA config
- ❌ **Problem**: SW scope issues with GitHub Pages subfolder
- ✅ **Solution**: Set `scope: '/repo-name/'` in manifest

**Build & Deployment:**
- ❌ **Problem**: Assets not found on GitHub Pages
- ✅ **Solution**: Set correct `base: '/repo-name/'` in vite.config.ts for production
- ❌ **Problem**: Jekyll interfering with _files
- ✅ **Solution**: Add `.nojekyll` file to public folder
- ❌ **Problem**: Inconsistent deployments
- ✅ **Solution**: Use GitHub Actions instead of gh-pages package

**Testing & Debugging:**
- ❌ **Problem**: Can't determine why install button won't appear
- ✅ **Solution**: Add comprehensive logging and `checkPWAInstallCriteria()` debug function
- ❌ **Problem**: Cached state interfering with testing
- ✅ **Solution**: Always test in incognito/private windows for clean state
- **IMPORTANT**: Use incognito/private windows to avoid cached state
- **REQUIREMENT**: User must interact with site before install prompt appears
- **DEBUGGING**: Run `checkPWAInstallCriteria()` in browser console to diagnose issues

**Output:** Produce the complete file structure—with starter code, manifest, Service Worker, icons, and README—ready for a developer to run `npm install`, `npm run dev`, and instantly have an installable, offline-capable PWA deployable via `npm run deploy`.

## Essential Files Checklist

**Root Level:**
- ✅ `.github/workflows/deploy.yml` - GitHub Actions deployment
- ✅ `public/.nojekyll` - Prevents Jekyll processing  
- ✅ `generate-icons.js` - Automated icon generation
- ✅ `vite.config.ts` - Proper base path and PWA config

**Package.json Scripts:**
```json
{
  "scripts": {
    "prebuild": "node generate-icons.js",
    "build": "tsc && vite build",
    "generate-icons": "node generate-icons.js"
  },
  "homepage": "https://username.github.io/repo-name"
}
```

**GitHub Actions Workflow (.github/workflows/deploy.yml):**
```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: ['main'] # or 'master'
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '22'
          cache: 'npm'
      - run: npm ci
      - run: npm run build
        env:
          NODE_ENV: production
      - uses: actions/configure-pages@v4
      - uses: actions/upload-pages-artifact@v3
        with:
          path: './dist'
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - uses: actions/deploy-pages@v4
        id: deployment
```

## PWA Debugging & Troubleshooting Features

When scaffolding the PWA, include these debugging utilities:

**1. PWA Criteria Checker Function**
```typescript
// Add to src/utils/pwa.ts
export function checkPWAInstallCriteria() {
  console.log('🔍 Checking PWA Install Criteria...');
  
  // Check HTTPS
  const isHTTPS = location.protocol === 'https:';
  console.log(`✅ HTTPS: ${isHTTPS ? 'Yes' : 'No'}`);
  
  // Check Service Worker
  const hasSW = 'serviceWorker' in navigator;
  console.log(`✅ Service Worker Support: ${hasSW ? 'Yes' : 'No'}`);
  
  // Check if already installed
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
  console.log(`❗ Already Installed: ${isStandalone ? 'Yes (won\'t show prompt)' : 'No'}`);
  
  // Check user engagement
  console.log('❗ User Engagement: Required for install prompt');
  
  return { isHTTPS, hasSW, isStandalone };
}

// Make available globally for console debugging
(window as any).checkPWAInstallCriteria = checkPWAInstallCriteria;
```

**2. Enhanced PWA Event Logging**
```typescript
// Comprehensive logging for PWA events
window.addEventListener('beforeinstallprompt', (e) => {
  console.log('🎉 beforeinstallprompt event fired!');
  console.log('✅ PWA install prompt available');
  // Store the event
});

window.addEventListener('appinstalled', () => {
  console.log('✅ PWA was installed successfully');
});
```

**3. Icon Validation Helper**
```typescript
// Function to validate icon URLs
export async function validateIcons() {
  const iconSizes = ['192x192', '512x512'];
  const basePath = import.meta.env.PROD ? '/wordle-pwa' : '';
  
  for (const size of iconSizes) {
    const iconUrl = `${basePath}/icons/pwa-${size}.png`;
    try {
      const response = await fetch(iconUrl);
      console.log(`Icon ${size}: ${response.ok ? '✅ Valid' : '❌ Failed'} (${response.status})`);
    } catch (error) {
      console.log(`Icon ${size}: ❌ Error - ${error}`);
    }
  }
}
```

**4. Alternative Install Instructions Component**
Create a fallback component that shows manual installation instructions when the install button isn't available:

```typescript
// src/components/AlternativeInstall.tsx
export function AlternativeInstall() {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
      <h3 className="font-semibold mb-2">Alternative Installation Methods</h3>
      <div className="text-sm space-y-2">
        <div>
          <strong>Desktop (Chrome/Edge):</strong> Look for install icon (⊕) in address bar
        </div>
        <div>
          <strong>Mobile (iOS Safari):</strong> Tap Share → "Add to Home Screen"
        </div>
        <div>
          <strong>Mobile (Android):</strong> Menu → "Add to Home Screen"
        </div>
      </div>
    </div>
  );
}
```