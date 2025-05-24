import { useEffect, useCallback } from 'react'

interface UseKeyboardProps {
  onLetter: (letter: string) => void
  onEnter: () => void
  onBackspace: () => void
  disabled?: boolean
}

export const useKeyboard = ({ onLetter, onEnter, onBackspace, disabled = false }: UseKeyboardProps) => {
  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    if (disabled) return

    const key = event.key.toLowerCase()
    
    // Prevent default for game keys
    if (/^[a-z]$/.test(key) || key === 'enter' || key === 'backspace') {
      event.preventDefault()
    }

    if (key === 'enter') {
      onEnter()
    } else if (key === 'backspace') {
      onBackspace()
    } else if (/^[a-z]$/.test(key)) {
      onLetter(key.toUpperCase())
    }
  }, [onLetter, onEnter, onBackspace, disabled])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)
    return () => {
      document.removeEventListener('keydown', handleKeyPress)
    }
  }, [handleKeyPress])
}
