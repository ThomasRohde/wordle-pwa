// PWA installation and update utilities
import { PWAInstallPrompt } from '../types'

let deferredPrompt: any = null

// Register Service Worker with explicit scope to prevent conflicts
export async function registerServiceWorker(): Promise<ServiceWorkerRegistration | null> {
  if (!('serviceWorker' in navigator)) {
    console.log('Service Worker not supported');
    return null;
  }

  try {
    const swPath = import.meta.env.PROD ? '/wordle-pwa/sw.js' : '/sw.js';
    const scope = import.meta.env.PROD ? '/wordle-pwa/' : '/';
    
    const registration = await navigator.serviceWorker.register(swPath, {
      scope: scope  // 🔑 Critical: Match manifest scope to prevent conflicts
    });
    
    console.log('✅ Service Worker registered with scope:', registration.scope);
    console.log('📱 SW registration details:', {
      scope: registration.scope,
      active: !!registration.active,
      waiting: !!registration.waiting,
      installing: !!registration.installing
    });
    
    return registration;
  } catch (error) {
    console.error('❌ Service Worker registration failed:', error);
    return null;
  }
}

// Check for conflicts with other PWAs on the same domain
export async function checkPWAConflicts(): Promise<void> {
  if (!('serviceWorker' in navigator)) return;
  
  try {
    const registrations = await navigator.serviceWorker.getRegistrations();
    console.log('🔍 Checking for PWA conflicts...');
    console.log(`Found ${registrations.length} service worker registration(s):`);
    
    registrations.forEach((reg, index) => {
      console.log(`SW ${index + 1}:`, {
        scope: reg.scope,
        active: !!reg.active,
        scriptURL: reg.active?.scriptURL
      });
    });
    
    // Check for scope conflicts
    const currentScope = import.meta.env.PROD ? '/wordle-pwa/' : '/';
    const conflictingScopes = registrations
      .filter(reg => reg.scope !== window.location.origin + currentScope)
      .map(reg => reg.scope);
    
    if (conflictingScopes.length > 0) {
      console.warn('⚠️  Potential PWA conflicts detected:', conflictingScopes);
      console.warn('This may affect PWA installation. Consider using separate domains for different PWAs.');
    } else {
      console.log('✅ No PWA scope conflicts detected');
    }
  } catch (error) {
    console.error('Error checking PWA conflicts:', error);
  }
}

// Listen for the beforeinstallprompt event
export const initializePWA = (): void => {
  console.log('🔧 Initializing PWA...')
  console.log('User agent:', navigator.userAgent)
  console.log('Is HTTPS:', location.protocol === 'https:')
  console.log('Current URL:', window.location.href)

  // Register service worker with explicit scoping
  registerServiceWorker();
  
  // Check for conflicts with other PWAs
  checkPWAConflicts();

  window.addEventListener('beforeinstallprompt', (e) => {
    console.log('beforeinstallprompt event fired!')
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault()
    // Stash the event so it can be triggered later
    deferredPrompt = e
    // Update UI to notify the user they can install the PWA
    console.log('PWA install prompt available')
  })

  // Listen for the app being installed
  window.addEventListener('appinstalled', () => {
    console.log('PWA was installed')
    deferredPrompt = null
  })

  // Check if PWA is already installed
  console.log('PWA already installed:', isPWAInstalled())
  
  // Log manifest status with environment-aware path checking
  const manifestLink = document.querySelector('link[rel="manifest"]')
  if (manifestLink) {
    const manifestPath = manifestLink.getAttribute('href');
    console.log('📄 Manifest link found:', manifestPath)
    
    // Verify manifest can be loaded
    fetch(manifestPath || '/manifest.webmanifest')
      .then(response => response.json())
      .then(manifest => {
        console.log('✅ Manifest loaded successfully:', {
          name: manifest.name,
          scope: manifest.scope,
          id: manifest.id,
          start_url: manifest.start_url
        });
      })
      .catch(error => {
        console.error('❌ Manifest loading failed:', error);
      });
  } else {
    console.log('❌ No manifest link found')
  }
}

// Check if the app can be installed
export const canInstallPWA = (): boolean => {
  return deferredPrompt !== null
}

// Trigger the install prompt
export const installPWA = async (): Promise<void> => {
  if (!deferredPrompt) {
    throw new Error('PWA install prompt not available')
  }

  // Show the prompt
  deferredPrompt.prompt()
  
  // Wait for the user to respond to the prompt
  const { outcome } = await deferredPrompt.userChoice
  
  console.log(`User response to the install prompt: ${outcome}`)
  
  // Clear the deferredPrompt for next time
  deferredPrompt = null
}

// Check if the app is running in standalone mode (installed)
export const isPWAInstalled = (): boolean => {
  return window.matchMedia('(display-mode: standalone)').matches ||
         (window.navigator as any).standalone ||
         document.referrer.includes('android-app://')
}

// Create a PWA install hook
export const usePWAInstall = (): PWAInstallPrompt => {
  return {
    canInstall: canInstallPWA(),
    install: installPWA
  }
}

// Check if the device is iOS
export const isIOS = (): boolean => {
  return /iPad|iPhone|iPod/.test(navigator.userAgent)
}

// Check if the device is Android
export const isAndroid = (): boolean => {
  return /Android/.test(navigator.userAgent)
}

// Get installation instructions based on device
export const getInstallInstructions = (): string => {
  if (isIOS()) {
    return 'To install this app on your iOS device, tap the Share button and then "Add to Home Screen".'
  } else if (isAndroid()) {
    return 'To install this app on your Android device, tap the menu button and then "Add to Home Screen" or "Install App".'
  } else {
    return 'To install this app, look for the install button in your browser\'s address bar or menu.'
  }
}

// Register for updates
export const registerForUpdates = (): void => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      // The service worker has been updated
      console.log('Service worker updated')
      // You might want to show a notification to the user
      if (confirm('A new version of the app is available. Reload to update?')) {
        window.location.reload()
      }
    })
  }
}

// Check for updates manually
export const checkForUpdates = async (): Promise<boolean> => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.getRegistration()
      if (registration) {
        await registration.update()
        return true
      }
    } catch (error) {
      console.error('Failed to check for updates:', error)
    }
  }
  return false
}

// Share API integration
export const shareGame = async (text: string): Promise<boolean> => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: 'Wordle PWA',
        text: text,
        url: window.location.origin
      })
      return true
    } catch (error) {
      console.error('Error sharing:', error)
    }
  }
  
  // Fallback to clipboard
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch (error) {
    console.error('Failed to copy to clipboard:', error)
    return false
  }
}

// Check if the app is online
export const isOnline = (): boolean => {
  return navigator.onLine
}

// Listen for online/offline events
export const addNetworkListeners = (onOnline: () => void, onOffline: () => void): (() => void) => {
  const handleOnline = () => onOnline()
  const handleOffline = () => onOffline()
  
  window.addEventListener('online', handleOnline)
  window.addEventListener('offline', handleOffline)
  
  // Return cleanup function
  return () => {
    window.removeEventListener('online', handleOnline)
    window.removeEventListener('offline', handleOffline)
  }
}

// Debug function to check PWA installation criteria
export const checkPWAInstallCriteria = (): void => {
  console.group('🔍 PWA Installation Criteria Check')
  
  // Check HTTPS
  const isHTTPS = location.protocol === 'https:' || location.hostname === 'localhost';
  console.log('✓ HTTPS:', isHTTPS)
  
  // Check service worker
  const hasSW = 'serviceWorker' in navigator;
  console.log('✓ Service Worker supported:', hasSW)
  
  // Check manifest
  const manifestLink = document.querySelector('link[rel="manifest"]')
  const hasManifest = !!manifestLink;
  console.log('✓ Manifest link:', hasManifest)
  if (manifestLink) {
    console.log('  - Manifest URL:', manifestLink.getAttribute('href'))
  }
  
  // Check if already installed
  const notInstalled = !isPWAInstalled();
  console.log('✓ Not already installed:', notInstalled)
  
  // Check beforeinstallprompt availability
  const hasPrompt = !!deferredPrompt;
  console.log('✓ Install prompt available:', hasPrompt)
  
  // Check user engagement (this is harder to determine)
  console.log('✓ User engagement: (requires user interaction)')
  
  // Overall assessment
  const canInstall = isHTTPS && hasSW && hasManifest && notInstalled;
  console.log(`📱 Can install PWA: ${canInstall ? '✅ YES' : '❌ NO'}`);
  
  if (!hasPrompt && canInstall) {
    console.warn('⚠️  Install criteria met but prompt not available. This may be due to:');
    console.warn('   - User needs to interact with the page first');
    console.warn('   - PWA scope conflicts with other apps on same domain');
    console.warn('   - Browser-specific install criteria not met');
  }
  
  console.groupEnd()
}

// Enhanced debugging function for PWA conflicts and status
export const debugPWAStatus = async (): Promise<void> => {
  console.group('🛠️  PWA Status & Conflict Debug')
  
  // Basic PWA criteria
  checkPWAInstallCriteria();
  
  // Service Worker registrations check
  await checkPWAConflicts();
  
  // Manifest validation
  try {
    const manifestPath = import.meta.env.PROD 
      ? '/wordle-pwa/manifest.webmanifest' 
      : '/manifest.webmanifest';
    const manifestResponse = await fetch(manifestPath);
    const manifest = await manifestResponse.json();
    console.log('📄 Manifest details:', {
      name: manifest.name,
      id: manifest.id,
      scope: manifest.scope,
      start_url: manifest.start_url,
      display: manifest.display,
      icons: manifest.icons?.length + ' icons'
    });
  } catch (error) {
    console.error('❌ Manifest validation failed:', error);
  }
  
  // Current environment info
  console.log('🌐 Environment:', {
    prod: import.meta.env.PROD,
    dev: import.meta.env.DEV,
    currentURL: window.location.href,
    origin: window.location.origin,
    pathname: window.location.pathname
  });
  
  console.groupEnd();
}

// Make functions available globally for debugging
declare global {
  interface Window {
    checkPWA: () => void;
    debugPWA: () => Promise<void>;
    checkPWAConflicts: () => Promise<void>;
  }
}

// Make function available globally for debugging
if (typeof window !== 'undefined') {
  window.checkPWA = checkPWAInstallCriteria;
  window.debugPWA = debugPWAStatus;
  window.checkPWAConflicts = checkPWAConflicts;
  
  console.log('🔧 PWA Debug utilities available:');
  console.log('  - window.checkPWA() - Check install criteria');
  console.log('  - window.debugPWA() - Full PWA status debug');
  console.log('  - window.checkPWAConflicts() - Check for PWA conflicts');
}
