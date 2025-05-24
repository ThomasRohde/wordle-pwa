import React, { useEffect } from 'react'
import { Header } from '../components/Header'
import { GameBoard } from '../components/GameBoard'
import { Keyboard } from '../components/Keyboard'
import { Toast } from '../components/Toast'
import { useGameContext } from '../context/GameContext'
import { useKeyboard } from '../hooks/useKeyboard'

export const Game: React.FC = () => {
  const { 
    gameState, 
    isLoading, 
    addLetter, 
    removeLetter, 
    submitGuess, 
    showToast 
  } = useGameContext()

  // Handle keyboard input
  useKeyboard({
    onLetter: addLetter,
    onEnter: async () => {
      const result = await submitGuess()
      if (!result.success) {
        showToast(result.message, 'error')
      } else if (result.message !== 'Good guess!') {
        showToast(result.message, 'success')
      }
    },
    onBackspace: removeLetter,
    disabled: gameState.gameStatus !== 'playing'
  })

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold mb-2">Loading Wordle PWA...</div>
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-wordle-green mx-auto"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      
      <main className="flex-1 flex flex-col justify-between max-w-md mx-auto w-full">
        <GameBoard />
        <Keyboard />
      </main>
      
      <Toast />
    </div>
  )
}
