import { useState, useEffect, useCallback } from 'react'
import { GameState } from '../types'
import { 
  getTodaysWord,
  getRandomWord, 
  checkGuess, 
  isValidWord, 
  formatDate, 
  isNewDay,
  getShareText 
} from '../utils/game'
import { 
  saveGameState, 
  loadGameState, 
  saveGameStats, 
  loadGameStats 
} from '../utils/storage'
// import { showGameCompletionNotification } from '../utils/notifications'

const INITIAL_GAME_STATE: GameState = {
  currentGuess: '',
  guesses: [],
  gameStatus: 'playing',
  currentRow: 0,
  targetWord: getRandomWord(),
  keyboardLetters: {},
  gameNumber: 1,
  lastPlayed: formatDate(new Date()),
  stats: {
    played: 0,
    wins: 0,
    currentStreak: 0,
    maxStreak: 0,
    guessDistribution: { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0 }
  }
}

export const useGame = () => {
  const [gameState, setGameState] = useState<GameState>(INITIAL_GAME_STATE)
  const [isLoading, setIsLoading] = useState(true)

  // Load game state on mount
  useEffect(() => {
    const savedState = loadGameState()
    const savedStats = loadGameStats()
    const today = formatDate(new Date())
    // const todayWord = getTodaysWord() // No longer needed here

    if (savedState && !isNewDay(savedState.lastPlayed)) {
      // Continue existing game
      setGameState({
        ...savedState,
        stats: savedStats,
        targetWord: savedState.targetWord // Continue with the saved word
      })
    } else {
      // Start new game
      const gameNumber = savedState ? savedState.gameNumber + 1 : 1
      setGameState({
        ...INITIAL_GAME_STATE,
        targetWord: getRandomWord(),
        gameNumber,
        lastPlayed: today,
        stats: savedStats
      })
    }
    setIsLoading(false)
  }, [])

  // Save game state whenever it changes
  useEffect(() => {
    if (!isLoading) {
      saveGameState(gameState)
      saveGameStats(gameState.stats)
    }
  }, [gameState, isLoading])

  // Add letter to current guess
  const addLetter = useCallback((letter: string) => {
    if (gameState.gameStatus !== 'playing' || gameState.currentGuess.length >= 5) {
      return
    }

    setGameState(prev => ({
      ...prev,
      currentGuess: prev.currentGuess + letter.toUpperCase()
    }))
  }, [gameState.gameStatus, gameState.currentGuess.length])

  // Remove last letter from current guess
  const removeLetter = useCallback(() => {
    if (gameState.gameStatus !== 'playing' || gameState.currentGuess.length === 0) {
      return
    }

    setGameState(prev => ({
      ...prev,
      currentGuess: prev.currentGuess.slice(0, -1)
    }))
  }, [gameState.gameStatus, gameState.currentGuess.length])

  // Submit current guess
  const submitGuess = useCallback(async () => {
    if (
      gameState.gameStatus !== 'playing' ||
      gameState.currentGuess.length !== 5 ||
      gameState.currentRow >= 6
    ) {
      return { success: false, message: 'Invalid guess' }
    }

    // Check if word is valid
    if (!isValidWord(gameState.currentGuess)) {
      return { success: false, message: 'Not a valid word' }
    }

    const guess = gameState.currentGuess
    const guessResult = checkGuess(guess, gameState.targetWord)
    const isCorrect = guessResult.every(result => result === 'correct')
    const newRow = gameState.currentRow + 1
    const isGameOver = isCorrect || newRow >= 6

    // Update keyboard letters
    const newKeyboardLetters = { ...gameState.keyboardLetters }
    for (let i = 0; i < guess.length; i++) {
      const letter = guess[i]
      const result = guessResult[i]
      
      // Only update if current state is worse than new result
      const currentState = newKeyboardLetters[letter]
      if (!currentState || 
          (currentState === 'absent' && result !== 'absent') ||
          (currentState === 'present' && result === 'correct')) {
        newKeyboardLetters[letter] = result
      }
    }

    // Calculate new stats
    let newStats = { ...gameState.stats }
    if (isGameOver) {
      newStats.played += 1
      if (isCorrect) {
        newStats.wins += 1
        newStats.currentStreak += 1
        newStats.maxStreak = Math.max(newStats.maxStreak, newStats.currentStreak)
        newStats.guessDistribution[newRow.toString()] += 1
      } else {
        newStats.currentStreak = 0
      }
    }

    // Update game state
    setGameState(prev => ({
      ...prev,
      currentGuess: '',
      guesses: [...prev.guesses, guess],
      gameStatus: isCorrect ? 'won' : (newRow >= 6 ? 'lost' : 'playing'),
      currentRow: newRow,
      keyboardLetters: newKeyboardLetters,
      stats: newStats
    }))

    // Show notification for game completion
    if (isGameOver) {
      // await showGameCompletionNotification(isCorrect, newRow)
    }

    return { 
      success: true, 
      message: isCorrect ? 'Congratulations!' : (newRow >= 6 ? `The word was ${gameState.targetWord}` : 'Good guess!')
    }
  }, [gameState])

  // Get share text for current game
  const getGameShareText = useCallback(() => {
    return getShareText(gameState.guesses, gameState.targetWord, gameState.gameNumber)
  }, [gameState.guesses, gameState.targetWord, gameState.gameNumber])

  // Reset game (for new day)
  const resetGame = useCallback(() => {
    const today = formatDate(new Date())
    const randomWord = getRandomWord()
    
    setGameState(prev => ({
      ...INITIAL_GAME_STATE,
      targetWord: randomWord,
      gameNumber: prev.gameNumber + 1,
      lastPlayed: today,
      stats: prev.stats
    }))
  }, [])

  return {
    gameState,
    isLoading,
    addLetter,
    removeLetter,
    submitGuess,
    getGameShareText,
    resetGame
  }
}
