import { GameState, GameStats } from '../types'

const STORAGE_KEYS = {
  GAME_STATE: 'wordle-game-state',
  GAME_STATS: 'wordle-game-stats',
  SETTINGS: 'wordle-settings'
}

export const saveGameState = (gameState: GameState): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.GAME_STATE, JSON.stringify(gameState))
  } catch (error) {
    console.error('Failed to save game state:', error)
  }
}

export const loadGameState = (): GameState | null => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.GAME_STATE)
    return saved ? JSON.parse(saved) : null
  } catch (error) {
    console.error('Failed to load game state:', error)
    return null
  }
}

export const saveGameStats = (stats: GameStats): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.GAME_STATS, JSON.stringify(stats))
  } catch (error) {
    console.error('Failed to save game stats:', error)
  }
}

export const loadGameStats = (): GameStats => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.GAME_STATS)
    return saved ? JSON.parse(saved) : {
      played: 0,
      wins: 0,
      currentStreak: 0,
      maxStreak: 0,
      guessDistribution: { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0 }
    }
  } catch (error) {
    console.error('Failed to load game stats:', error)
    return {
      played: 0,
      wins: 0,
      currentStreak: 0,
      maxStreak: 0,
      guessDistribution: { '1': 0, '2': 0, '3': 0, '4': 0, '5': 0, '6': 0 }
    }
  }
}

export const clearGameData = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEYS.GAME_STATE)
    localStorage.removeItem(STORAGE_KEYS.GAME_STATS)
  } catch (error) {
    console.error('Failed to clear game data:', error)
  }
}

// Generic storage utilities with error handling
export const setStorageItem = <T>(key: string, value: T): boolean => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
    return true
  } catch (error) {
    console.error(`Failed to set storage item ${key}:`, error)
    return false
  }
}

export const getStorageItem = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch (error) {
    console.error(`Failed to get storage item ${key}:`, error)
    return defaultValue
  }
}

export const removeStorageItem = (key: string): boolean => {
  try {
    localStorage.removeItem(key)
    return true
  } catch (error) {
    console.error(`Failed to remove storage item ${key}:`, error)
    return false
  }
}

// Check if localStorage is available
export const isStorageAvailable = (): boolean => {
  try {
    const test = '__storage_test__'
    localStorage.setItem(test, test)
    localStorage.removeItem(test)
    return true
  } catch {
    return false
  }
}
