// PWA installation and update utilities
import { PWAInstallPrompt } from '../types'

let deferredPrompt: any = null

// Listen for the beforeinstallprompt event
export const initializePWA = (): void => {
  window.addEventListener('beforeinstallprompt', (e) => {
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
