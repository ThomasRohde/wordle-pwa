import React from 'react'
import { useGameContext } from '../context/GameContext'

const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE']
]

interface KeyProps {
  letter: string
  state?: 'correct' | 'present' | 'absent' | 'unused'
  onClick: () => void
  disabled?: boolean
}

const Key: React.FC<KeyProps> = ({ letter, state = 'unused', onClick, disabled = false }) => {
  const getKeyClasses = () => {
    const baseClasses = 'keyboard-key'
    const stateClass = state !== 'unused' ? state : ''
    const wideClass = (letter === 'ENTER' || letter === 'BACKSPACE') ? 'wide' : ''
    const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-300'
    
    return `${baseClasses} ${stateClass} ${wideClass} ${disabledClass}`.trim()
  }

  const getKeyText = () => {
    switch (letter) {
      case 'BACKSPACE':
        return '⌫'
      case 'ENTER':
        return 'ENTER'
      default:
        return letter
    }
  }

  return (
    <button
      className={getKeyClasses()}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      {getKeyText()}
    </button>
  )
}

export const Keyboard: React.FC = () => {
  const { gameState, addLetter, removeLetter, submitGuess, showToast } = useGameContext()
  const { keyboardLetters, gameStatus } = gameState
  const isGameActive = gameStatus === 'playing'

  const handleKeyClick = async (key: string) => {
    if (!isGameActive) return

    if (key === 'ENTER') {
      const result = await submitGuess()
      if (!result.success) {
        showToast(result.message, 'error')
      } else if (result.message !== 'Good guess!') {
        showToast(result.message, 'success')
      }
    } else if (key === 'BACKSPACE') {
      removeLetter()
    } else {
      addLetter(key)
    }
  }

  return (
    <div className="flex flex-col items-center gap-1 sm:gap-2 p-2 sm:p-4 mt-2 sm:mt-4">
      {KEYBOARD_ROWS.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-0.5 sm:gap-1">
          {row.map((key) => (
            <Key
              key={key}
              letter={key}
              state={keyboardLetters[key] || 'unused'}
              onClick={() => handleKeyClick(key)}
              disabled={!isGameActive}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
