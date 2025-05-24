# PWA Multi-App Deployment Guide

## Problem: PWA Conflicts on GitHub Pages

When deploying multiple Progressive Web Apps to the same GitHub Pages domain (e.g., `username.github.io/app1/`, `username.github.io/app2/`), conflicts can occur that prevent proper PWA installation and functionality.

### Common Issues:
- ❌ PWA install prompts don't appear
- ❌ Service workers interfere with each other
- ❌ Browser can't distinguish between different PWAs
- ❌ Install criteria become ambiguous across multiple apps

## Solution: Explicit PWA Scoping

This Wordle PWA has been configured with proper scoping to prevent conflicts:

### 1. Unique PWA Identity (`vite.config.ts`)

```typescript
VitePWA({
  scope: '/wordle-pwa/',  // 🔑 Explicit service worker scope
  manifest: {
    id: '/wordle-pwa/',   // 🔑 Unique PWA identifier
    scope: '/wordle-pwa/',
    start_url: '/wordle-pwa/',
    // ... other manifest properties
  }
})
```

### 2. Service Worker Scope Restrictions

```typescript
workbox: {
  navigateFallback: '/wordle-pwa/index.html',
  navigateFallbackDenylist: [
    /^\/api/, 
    /^\/[^/]+$/, 
    /^\/$/, 
    /^\/(?!wordle-pwa)/  // 🔑 Only handle this app's routes
  ],
}
```

### 3. Explicit Service Worker Registration (`src/utils/pwa.ts`)

```typescript
export async function registerServiceWorker() {
  const swPath = import.meta.env.PROD ? '/wordle-pwa/sw.js' : '/sw.js';
  const scope = import.meta.env.PROD ? '/wordle-pwa/' : '/';
  
  const registration = await navigator.serviceWorker.register(swPath, {
    scope: scope  // 🔑 Match manifest scope
  });
}
```

## Debugging Tools

### Browser Console Commands

Once the app loads, these debugging functions are available:

```javascript
// Check PWA installation criteria
window.checkPWA()

// Full PWA status and conflict detection
await window.debugPWA()

// Check for service worker conflicts
await window.checkPWAConflicts()
```

### What to Look For:

#### ✅ Good (No Conflicts):
```
✅ No PWA scope conflicts detected
📱 Can install PWA: ✅ YES
✓ Install prompt available: true
```

#### ⚠️ Warning (Potential Conflicts):
```
⚠️ Potential PWA conflicts detected: ["https://username.github.io/other-app/"]
📱 Can install PWA: ❌ NO
✓ Install prompt available: false
```

## Testing Multi-PWA Deployments

### 1. Check Service Worker Scopes
```javascript
// In browser DevTools console
navigator.serviceWorker.getRegistrations().then(regs => {
  regs.forEach(reg => console.log('Scope:', reg.scope));
});
```

### 2. Verify Unique PWA IDs
- Open DevTools → Application → Manifest
- Check that each PWA has a unique `id` field
- Verify `scope` and `start_url` are app-specific

### 3. Test in Clean Environment
- Use incognito/private browsing mode
- Clear browser data between tests
- Test each PWA in separate browser profiles

## Deployment Checklist

### Before Deployment:
- [ ] Unique `id` in manifest: `"id": "/your-app-name/"`
- [ ] Explicit `scope` in VitePWA config
- [ ] Service worker registration with matching scope
- [ ] Navigation fallback restrictions configured
- [ ] Base path correctly set for GitHub Pages

### After Deployment:
- [ ] Test PWA install in fresh browser session
- [ ] Verify no service worker scope conflicts
- [ ] Check manifest loads correctly
- [ ] Confirm offline functionality works
- [ ] Test with other PWAs on same domain

## Alternative Solutions

If conflicts persist despite proper scoping:

### Option A: Separate Domains
Deploy different PWAs to different services:
- App 1: GitHub Pages (`username.github.io/app1/`)
- App 2: Netlify (`app2.netlify.app`)
- App 3: Vercel (`app3.vercel.app`)

### Option B: Subdomain Approach
Use custom domain with subdomains:
- `app1.yourdomain.com`
- `app2.yourdomain.com`
- `app3.yourdomain.com`

### Option C: Separate GitHub Accounts
Create dedicated GitHub accounts for different PWA projects.

## Key Implementation Details

### Environment-Aware Paths
The app automatically handles development vs production paths:

```typescript
// Development: http://localhost:3000/
// Production: https://username.github.io/wordle-pwa/

const swPath = import.meta.env.PROD ? '/wordle-pwa/sw.js' : '/sw.js';
const scope = import.meta.env.PROD ? '/wordle-pwa/' : '/';
```

### Conflict Detection
Automatic checking for other service workers on the same domain:

```typescript
const conflictingScopes = registrations
  .filter(reg => reg.scope !== window.location.origin + currentScope)
  .map(reg => reg.scope);

if (conflictingScopes.length > 0) {
  console.warn('⚠️ Potential PWA conflicts detected:', conflictingScopes);
}
```

## Browser DevTools Debugging

### Chrome DevTools:
1. **Application Tab → Service Workers**: Check active registrations
2. **Application Tab → Manifest**: Verify manifest loading
3. **Network Tab**: Monitor service worker requests
4. **Console**: Use built-in debugging functions

### Service Worker Internals:
- Visit `chrome://serviceworker-internals/`
- Check for scope overlaps and conflicts
- Verify correct service worker is active

## Production Testing

### Test Sequence:
1. Deploy app to GitHub Pages
2. Open in incognito window
3. Run `window.debugPWA()` in console
4. Interact with page to trigger install prompt
5. Verify install works correctly
6. Test offline functionality
7. Check for conflicts with other PWAs

### Success Indicators:
- ✅ Install prompt appears after user interaction
- ✅ App installs successfully
- ✅ Offline functionality works
- ✅ No console errors related to service workers
- ✅ Unique service worker scope registered

This configuration ensures your Wordle PWA can coexist with other PWAs on the same GitHub Pages domain without conflicts.
