// Notification utilities for PWA

// Request notification permission
export const requestNotificationPermission = async (): Promise<NotificationPermission> => {
  if (!('Notification' in window)) {
    console.warn('This browser does not support notifications')
    return 'denied'
  }

  if (Notification.permission === 'granted') {
    return 'granted'
  }

  if (Notification.permission === 'denied') {
    return 'denied'
  }

  // Request permission
  const permission = await Notification.requestPermission()
  return permission
}

// Show a local notification
export const showNotification = async (title: string, body: string, icon?: string): Promise<boolean> => {
  try {
    const permission = await requestNotificationPermission()
    
    if (permission !== 'granted') {
      console.warn('Notification permission not granted')
      return false
    }

    // Try to use service worker notification first
    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.ready
      if (registration) {
        await registration.showNotification(title, {
          body,
          icon: icon || '/icons/pwa-192x192.png',
          badge: '/icons/pwa-192x192.png',
          tag: 'wordle-notification',
          requireInteraction: false
        })
        return true
      }
    }

    // Fallback to regular notification
    new Notification(title, {
      body,
      icon: icon || '/icons/pwa-192x192.png'
    })
    
    return true
  } catch (error) {
    console.error('Failed to show notification:', error)
    return false
  }
}

// Show game completion notification
export const showGameCompletionNotification = async (won: boolean, attempts: number): Promise<void> => {
  const title = won ? 'Congratulations!' : 'Better luck tomorrow!'
  const body = won 
    ? `You solved today's Wordle in ${attempts} attempt${attempts === 1 ? '' : 's'}!`
    : "Don't worry, there's always tomorrow's puzzle!"

  await showNotification(title, body)
}

// Check if notifications are supported
export const areNotificationsSupported = (): boolean => {
  return 'Notification' in window && 'serviceWorker' in navigator
}

// Get current notification permission status
export const getNotificationPermission = (): NotificationPermission => {
  if (!('Notification' in window)) {
    return 'denied'
  }
  return Notification.permission
}
