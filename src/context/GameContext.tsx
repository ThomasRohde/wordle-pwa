import React, { createContext, useContext, ReactNode } from 'react'
import { GameState } from '../types'
import { useGame } from '../hooks/useGame'
import { useToast } from '../hooks/useToast'
import { usePWA } from '../hooks/usePWA'

interface GameContextType {
  // Game state and actions
  gameState: GameState
  isLoading: boolean
  addLetter: (letter: string) => void
  removeLetter: () => void
  submitGuess: () => Promise<{ success: boolean; message: string }>
  getGameShareText: () => string
  resetGame: () => void
  
  // Toast functionality
  toasts: any[]
  showToast: (message: string, type?: 'success' | 'error' | 'info', duration?: number) => string
  removeToast: (id: string) => void
  clearAllToasts: () => void
  
  // PWA functionality
  canInstall: boolean
  isInstalled: boolean
  networkStatus: { isOnline: boolean; isOffline: boolean }
  install: () => Promise<boolean>
}

const GameContext = createContext<GameContextType | undefined>(undefined)

interface GameProviderProps {
  children: ReactNode
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const gameHook = useGame()
  const toastHook = useToast()
  const pwaHook = usePWA()

  const value: GameContextType = {
    ...gameHook,
    ...toastHook,
    ...pwaHook
  }

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  )
}

export const useGameContext = (): GameContextType => {
  const context = useContext(GameContext)
  if (context === undefined) {
    throw new Error('useGameContext must be used within a GameProvider')
  }
  return context
}
