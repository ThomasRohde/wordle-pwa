import React from 'react'
import { TileState } from '../types'
import { checkGuess } from '../utils/game'

interface TileProps {
  letter: string
  state: 'empty' | 'filled' | 'correct' | 'present' | 'absent'
  animate?: boolean
  delay?: number
}

export const Tile: React.FC<TileProps> = ({ letter, state, animate = false, delay = 0 }) => {
  const getStateClasses = () => {
    switch (state) {
      case 'correct':
        return 'tile correct'
      case 'present':
        return 'tile present'
      case 'absent':
        return 'tile absent'
      case 'filled':
        return 'tile filled'
      default:
        return 'tile'
    }
  }

  const animationStyle = animate ? {
    animationDelay: `${delay}ms`,
    animation: 'flip 0.6s ease-in-out forwards'
  } : {}

  return (
    <div 
      className={getStateClasses()}
      style={animationStyle}
    >
      {letter}
    </div>
  )
}

interface GameRowProps {
  guess: string
  targetWord: string
  isCurrentRow: boolean
  currentGuess: string
  isSubmitted: boolean
  animate?: boolean
}

export const GameRow: React.FC<GameRowProps> = ({ 
  guess, 
  targetWord, 
  isCurrentRow, 
  currentGuess, 
  isSubmitted,
  animate = false
}) => {
  const getTileState = (index: number): TileState['state'] => {
    if (isCurrentRow && !isSubmitted) {
      // Current row being typed
      if (index < currentGuess.length) {
        return 'filled'
      }
      return 'empty'
    } else if (guess) {
      // Submitted guess
      const results = checkGuess(guess, targetWord)
      return results[index]
    }
    return 'empty'
  }

  const getTileLetter = (index: number): string => {
    if (isCurrentRow && !isSubmitted) {
      return currentGuess[index] || ''
    }
    return guess?.[index] || ''
  }

  return (
    <div className="flex gap-2 justify-center mb-2">
      {Array.from({ length: 5 }, (_, index) => (
        <Tile
          key={index}
          letter={getTileLetter(index)}
          state={getTileState(index)}
          animate={animate && isSubmitted}
          delay={index * 100}
        />
      ))}
    </div>
  )
}
