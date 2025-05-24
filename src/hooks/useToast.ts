import { useState, useCallback } from 'react'
import { ToastMessage } from '../types'

export const useToast = () => {
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'info', duration = 3000) => {
    const id = Date.now().toString()
    const toast: ToastMessage = { id, message, type }
    
    setToasts(prev => [...prev, toast])
    
    // Auto remove toast after duration
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, duration)
    
    return id
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  const clearAllToasts = useCallback(() => {
    setToasts([])
  }, [])

  return {
    toasts,
    showToast,
    removeToast,
    clearAllToasts
  }
}
