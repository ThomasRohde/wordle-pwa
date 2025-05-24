// Notification utilities for PWA
export interface NotificationOptions {
  title: string
  body: string
  icon?: string
  badge?: string
  tag?: string
  requireInteraction?: boolean
  actions?: NotificationAction[]
}

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
export const showNotification = async (options: NotificationOptions): Promise<boolean> => {
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
        await registration.showNotification(options.title, {
          body: options.body,
          icon: options.icon || '/icons/pwa-192x192.png',
          badge: options.badge || '/icons/pwa-192x192.png',
          tag: options.tag || 'wordle-notification',
          requireInteraction: options.requireInteraction || false,
          actions: options.actions || []
        })
        return true
      }
    }

    // Fallback to regular notification
    new Notification(options.title, {
      body: options.body,
      icon: options.icon || '/icons/pwa-192x192.png'
    })
    
    return true
  } catch (error) {
    console.error('Failed to show notification:', error)
    return false
  }
}

// Schedule a daily reminder notification
export const scheduleDailyReminder = async (): Promise<void> => {
  if (!('serviceWorker' in navigator)) {
    return
  }

  try {
    const registration = await navigator.serviceWorker.ready
    
    // Calculate time until next day at 9 AM
    const now = new Date()
    const tomorrow = new Date(now)
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(9, 0, 0, 0)
    
    const timeUntilReminder = tomorrow.getTime() - now.getTime()

    // Use setTimeout as a simple scheduler (in production, you'd use a more robust solution)
    setTimeout(async () => {
      await showNotification({
        title: 'Wordle PWA',
        body: "Don't forget to play today's word puzzle!",
        tag: 'daily-reminder',
        requireInteraction: false
      })
      
      // Schedule the next reminder
      scheduleDailyReminder()
    }, timeUntilReminder)
    
  } catch (error) {
    console.error('Failed to schedule daily reminder:', error)
  }
}

// Show game completion notification
export const showGameCompletionNotification = async (won: boolean, attempts: number): Promise<void> => {
  const title = won ? 'Congratulations!' : 'Better luck tomorrow!'
  const body = won 
    ? `You solved today's Wordle in ${attempts} attempt${attempts === 1 ? '' : 's'}!`
    : "Don't worry, there's always tomorrow's puzzle!"

  await showNotification({
    title,
    body,
    tag: 'game-completion',
    requireInteraction: false
  })
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
