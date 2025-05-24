---
mode: 'agent'
tools: ['codebase', 'run_in_terminal', 'create_file', 'replace_string_in_file']
description: 'Scaffold a complete Progressive Web App (PWA) with React, TypeScript, and Vite'
---

# PWA Scaffold Generator

You are an expert PWA developer specializing in creating production-ready Progressive Web Apps. Generate a complete, installable PWA following modern best practices and mobile-first design principles.

## Core Technologies
- **Frontend**: React 18+ with TypeScript
- **Build Tool**: Vite with vite-plugin-pwa
- **Styling**: Tailwind CSS (mobile-first approach)
- **Routing**: React Router with precached routes
- **Storage**: Local Storage with IndexedDB fallback
- **Deployment**: GitHub Pages with GitHub Actions

## Project Structure Requirements

Organize code into a clean, scalable architecture:
```
src/
├── components/     # Reusable UI components
├── pages/         # Route components
├── hooks/         # Custom React hooks
├── context/       # React context providers
├── utils/         # Utility functions
└── types/         # TypeScript definitions
```

## Critical PWA Configuration

### 1. Vite Configuration
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
            src: '/repo-name/icons/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          }
        ]
      }
    })
  ]
})
```

### 2. Icon Generation
- Create automated icon generation with canvas library
- Generate valid PNG files (>1KB) for all required sizes
- Use absolute paths for GitHub Pages deployment
- Add prebuild script: `"prebuild": "node generate-icons.js"`

### 3. Service Worker Setup
- Enable automatic registration with prompt
- Configure Workbox for asset precaching
- Add runtime caching for images/JSON
- Implement offline fallback page

## Mobile-First UI Requirements

### Dynamic Viewport Handling
Handle iOS Safari address bar changes:
```css
.mobile-vh {
  min-height: 100vh;
  min-height: calc(var(--vh, 1vh) * 100);
  min-height: 100dvh;
}
```

```typescript
useEffect(() => {
  const setVH = () => {
    const vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty('--vh', `${vh}px`)
  }
  setVH()
  window.addEventListener('resize', setVH)
  window.addEventListener('orientationchange', () => setTimeout(setVH, 100))
}, [])
```

### iOS Safe Area Support
```css
body {
  padding-bottom: env(safe-area-inset-bottom);
  overflow-x: hidden;
}
```

### Touch Optimization
```css
.touch-optimized {
  touch-action: manipulation;
  user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: transparent;
}

/* Prevent iOS zoom */
input, textarea, select {
  font-size: 16px;
}
```

## PWA Features Implementation

### Install Prompt
```typescript
export function usePWA() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [isInstallable, setIsInstallable] = useState(false)

  useEffect(() => {
    const handler = (e: BeforeInstallPromptEvent) => {
      e.preventDefault()
      setDeferredPrompt(e)
      setIsInstallable(true)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const installApp = async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    console.log(`Install outcome: ${outcome}`)
    setDeferredPrompt(null)
    setIsInstallable(false)
  }

  return { isInstallable, installApp }
}
```

### Offline Detection
```typescript
export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  return isOnline
}
```

### Local Storage with Debouncing
```typescript
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  const setValue = useMemo(
    () => debounce((value: T) => {
      try {
        setStoredValue(value)
        window.localStorage.setItem(key, JSON.stringify(value))
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error)
      }
    }, 500),
    [key]
  )

  return [storedValue, setValue] as const
}
```

## GitHub Pages Deployment

### GitHub Actions Workflow
```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: ['main']
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

### Required Files
- `public/.nojekyll` - Prevent Jekyll processing
- `generate-icons.js` - Automated icon generation
- Proper `package.json` scripts with prebuild step

## Debugging & Troubleshooting

### PWA Criteria Checker
```typescript
export function checkPWAInstallCriteria() {
  console.log('🔍 Checking PWA Install Criteria...')
  
  const isHTTPS = location.protocol === 'https:'
  console.log(`✅ HTTPS: ${isHTTPS ? 'Yes' : 'No'}`)
  
  const hasSW = 'serviceWorker' in navigator
  console.log(`✅ Service Worker Support: ${hasSW ? 'Yes' : 'No'}`)
  
  const isStandalone = window.matchMedia('(display-mode: standalone)').matches
  console.log(`❗ Already Installed: ${isStandalone ? 'Yes (won\'t show prompt)' : 'No'}`)
  
  console.log('❗ User Engagement: Required for install prompt')
  
  return { isHTTPS, hasSW, isStandalone }
}

// Make available globally for console debugging
(window as any).checkPWAInstallCriteria = checkPWAInstallCriteria
```

### Icon Validation
```typescript
export async function validateIcons() {
  const iconSizes = ['192x192', '512x512']
  const basePath = import.meta.env.PROD ? '/repo-name' : ''
  
  for (const size of iconSizes) {
    const iconUrl = `${basePath}/icons/pwa-${size}.png`
    try {
      const response = await fetch(iconUrl)
      console.log(`Icon ${size}: ${response.ok ? '✅ Valid' : '❌ Failed'} (${response.status})`)
    } catch (error) {
      console.log(`Icon ${size}: ❌ Error - ${error}`)
    }
  }
}
```

## Common Pitfalls Solutions

1. **Install Button Issues**
   - User must interact with site before install prompt appears
   - Use debugging function to check PWA criteria
   - Provide alternative install instructions

2. **Icon Problems**
   - Generate valid PNG files >1KB using canvas library
   - Use absolute paths in manifest for GitHub Pages
   - Test icon validity by opening directly

3. **Service Worker Issues**
   - Set explicit `filename: 'sw.js'` and `strategies: 'generateSW'`
   - Match SW scope with GitHub Pages deployment path
   - Include comprehensive logging

4. **Mobile UI Problems**
   - Implement dynamic viewport height handling
   - Use safe area CSS variables
   - Optimize touch interactions and prevent zoom

## Package.json Scripts
```json
{
  "scripts": {
    "dev": "vite",
    "prebuild": "node generate-icons.js",
    "build": "tsc && vite build",
    "generate-icons": "node generate-icons.js",
    "audit": "npm audit && lighthouse --output=html --output-path=./lighthouse-report.html http://localhost:4173"
  },
  "homepage": "https://username.github.io/repo-name"
}
```

## Dependencies
Install these packages:
```bash
npm install react react-dom react-router-dom
npm install -D @types/react @types/react-dom @vitejs/plugin-react
npm install -D vite vite-plugin-pwa workbox-window
npm install -D typescript tailwindcss postcss autoprefixer
npm install -D canvas  # For icon generation
```

## Output Requirements

Generate a complete, production-ready PWA with:
- ✅ Installable with working install button
- ✅ Offline functionality with service worker
- ✅ Mobile-optimized UI with iOS Safari support
- ✅ Automated icon generation
- ✅ GitHub Pages deployment ready
- ✅ Comprehensive debugging tools
- ✅ TypeScript throughout
- ✅ Modern React patterns with hooks
- ✅ Responsive design with Tailwind CSS

The final app should work perfectly on mobile devices, handle offline scenarios gracefully, and be ready for production deployment to GitHub Pages.
