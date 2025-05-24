import React from 'react'
import { useGameContext } from '../context/GameContext'

export const Toast: React.FC = () => {
  const { toasts, removeToast } = useGameContext()

  if (toasts.length === 0) return null

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`toast ${toast.type === 'error' ? 'bg-red-500' : toast.type === 'success' ? 'bg-green-500' : 'bg-gray-800'}`}
          onClick={() => removeToast(toast.id)}
        >
          {toast.message}
        </div>
      ))}
    </div>
  )
}
