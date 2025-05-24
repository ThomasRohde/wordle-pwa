import { useState, useEffect } from 'react'
import { NetworkStatus } from '../types'
import { 
  initializePWA, 
  canInstallPWA, 
  installPWA, 
  isPWAInstalled,
  addNetworkListeners,
  isOnline as checkIsOnline
} from '../utils/pwa'

export const usePWA = () => {
  const [canInstall, setCanInstall] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)
  const [networkStatus, setNetworkStatus] = useState<NetworkStatus>({
    isOnline: checkIsOnline(),
    isOffline: !checkIsOnline()
  })

  useEffect(() => {
    // Initialize PWA functionality
    initializePWA()
    
    // Check initial states
    setCanInstall(canInstallPWA())
    setIsInstalled(isPWAInstalled())

    // Set up network status listeners
    const cleanup = addNetworkListeners(
      () => setNetworkStatus({ isOnline: true, isOffline: false }),
      () => setNetworkStatus({ isOnline: false, isOffline: true })
    )

    // Listen for beforeinstallprompt event updates
    const handleBeforeInstallPrompt = () => {
      setCanInstall(true)
    }

    const handleAppInstalled = () => {
      setCanInstall(false)
      setIsInstalled(true)
    }

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    window.addEventListener('appinstalled', handleAppInstalled)

    return () => {
      cleanup()
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [])

  const handleInstall = async (): Promise<boolean> => {
    try {
      await installPWA()
      setCanInstall(false)
      return true
    } catch (error) {
      console.error('Failed to install PWA:', error)
      return false
    }
  }

  return {
    canInstall,
    isInstalled,
    networkStatus,
    install: handleInstall
  }
}
