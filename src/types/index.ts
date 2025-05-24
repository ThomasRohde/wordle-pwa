export interface GameState {
  currentGuess: string
  guesses: string[]
  gameStatus: 'playing' | 'won' | 'lost'
  currentRow: number
  targetWord: string
  keyboardLetters: Record<string, 'correct' | 'present' | 'absent' | 'unused'>
  gameNumber: number
  lastPlayed: string
  stats: GameStats
}

export interface GameStats {
  played: number
  wins: number
  currentStreak: number
  maxStreak: number
  guessDistribution: Record<string, number>
}

export interface TileState {
  letter: string
  state: 'empty' | 'filled' | 'correct' | 'present' | 'absent'
}

export interface ToastMessage {
  id: string
  message: string
  type: 'success' | 'error' | 'info'
}

export interface PWAInstallPrompt {
  canInstall: boolean
  install: () => Promise<void>
}

export interface NetworkStatus {
  isOnline: boolean
  isOffline: boolean
}
