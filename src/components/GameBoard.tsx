import React from 'react'
import { GameRow } from './Tile'
import { useGameContext } from '../context/GameContext'

export const GameBoard: React.FC = () => {
  const { gameState } = useGameContext()
  const { guesses, currentGuess, currentRow, targetWord, gameStatus } = gameState

  // Create 6 rows for the game board
  const rows = Array.from({ length: 6 }, (_, index) => {
    const isCurrentRow = index === currentRow && gameStatus === 'playing'
    const guess = guesses[index] || ''
    const isSubmitted = Boolean(guesses[index])

    return (
      <GameRow
        key={index}
        guess={guess}
        targetWord={targetWord}
        isCurrentRow={isCurrentRow}
        currentGuess={currentGuess}
        isSubmitted={isSubmitted}
        animate={isSubmitted && index === currentRow - 1}
      />
    )
  })

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="grid gap-2">
        {rows}
      </div>
    </div>
  )
}
