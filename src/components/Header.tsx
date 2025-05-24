import React, { useState } from 'react'
import { useGameContext } from '../context/GameContext'
import { shareGame } from '../utils/pwa'

export const Header: React.FC = () => {
  const { 
    gameState, 
    getGameShareText, 
    showToast, 
    canInstall, 
    install, 
    networkStatus 
  } = useGameContext()
  const [showStats, setShowStats] = useState(false)
  const [showHelp, setShowHelp] = useState(false)

  const handleShare = async () => {
    const shareText = getGameShareText()
    const success = await shareGame(shareText)
    
    if (success) {
      showToast('Game results copied to clipboard!', 'success')
    } else {
      showToast('Failed to share game results', 'error')
    }
  }

  const handleInstall = async () => {
    const success = await install()
    if (success) {
      showToast('App installed successfully!', 'success')
    } else {
      showToast('Failed to install app', 'error')
    }
  }

  const getGameStatusText = () => {
    switch (gameState.gameStatus) {
      case 'won':
        return `Solved in ${gameState.guesses.length}/6`
      case 'lost':
        return `Game Over - Word was ${gameState.targetWord}`
      default:
        return `Game #${gameState.gameNumber}`
    }
  }

  return (
    <>
      <header className="flex items-center justify-between p-4 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowHelp(true)}
            className="p-2 rounded-full hover:bg-gray-100"
            type="button"
            aria-label="Help"
          >
            ❓
          </button>
          {!networkStatus.isOnline && (
            <div className="flex items-center gap-1 text-orange-600 text-sm">
              <span>⚠️</span>
              <span>Offline</span>
            </div>
          )}
        </div>

        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold text-gray-800">Wordle PWA</h1>
          <p className="text-sm text-gray-600">{getGameStatusText()}</p>
        </div>

        <div className="flex items-center gap-2">
          {canInstall && (
            <button
              onClick={handleInstall}
              className="p-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
              type="button"
            >
              📱 Install
            </button>
          )}
          
          <button
            onClick={() => setShowStats(true)}
            className="p-2 rounded-full hover:bg-gray-100"
            type="button"
            aria-label="Statistics"
          >
            📊
          </button>

          {(gameState.gameStatus === 'won' || gameState.gameStatus === 'lost') && (
            <button
              onClick={handleShare}
              className="p-2 rounded-full hover:bg-gray-100"
              type="button"
              aria-label="Share"
            >
              📤
            </button>
          )}
        </div>
      </header>

      {/* Stats Modal */}
      {showStats && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Statistics</h2>
              <button
                onClick={() => setShowStats(false)}
                className="text-gray-500 hover:text-gray-700"
                type="button"
              >
                ✕
              </button>
            </div>
            
            <div className="grid grid-cols-4 gap-4 text-center mb-4">
              <div>
                <div className="text-2xl font-bold">{gameState.stats.played}</div>
                <div className="text-xs">Played</div>
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {gameState.stats.played > 0 
                    ? Math.round((gameState.stats.wins / gameState.stats.played) * 100)
                    : 0}
                </div>
                <div className="text-xs">Win %</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{gameState.stats.currentStreak}</div>
                <div className="text-xs">Current Streak</div>
              </div>
              <div>
                <div className="text-2xl font-bold">{gameState.stats.maxStreak}</div>
                <div className="text-xs">Max Streak</div>
              </div>
            </div>

            <div className="mb-4">
              <h3 className="font-semibold mb-2">Guess Distribution</h3>
              {Object.entries(gameState.stats.guessDistribution).map(([guess, count]) => (
                <div key={guess} className="flex items-center gap-2 mb-1">
                  <span className="w-4 text-sm">{guess}</span>
                  <div className="flex-1 bg-gray-200 rounded">
                    <div
                      className="bg-wordle-green h-5 rounded text-white text-xs flex items-center justify-end pr-2"
                      style={{
                        width: gameState.stats.wins > 0 
                          ? `${(count / gameState.stats.wins) * 100}%` 
                          : '0%'
                      }}
                    >
                      {count}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Help Modal */}
      {showHelp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">How to Play</h2>
              <button
                onClick={() => setShowHelp(false)}
                className="text-gray-500 hover:text-gray-700"
                type="button"
              >
                ✕
              </button>
            </div>
            
            <div className="space-y-4 text-sm">
              <p>Guess the WORDLE in six tries.</p>
              <p>Each guess must be a valid five-letter word. Hit the enter button to submit.</p>
              <p>After each guess, the color of the tiles will change to show how close your guess was to the word.</p>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-wordle-green rounded flex items-center justify-center text-white font-bold">
                    W
                  </div>
                  <span>The letter W is in the word and in the correct spot.</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-wordle-yellow rounded flex items-center justify-center text-white font-bold">
                    I
                  </div>
                  <span>The letter I is in the word but in the wrong spot.</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-wordle-gray rounded flex items-center justify-center text-white font-bold">
                    U
                  </div>
                  <span>The letter U is not in the word in any spot.</span>
                </div>
              </div>
              
              <p className="font-semibold">A new WORDLE will be available each day!</p>
              
              <div className="pt-2 border-t">
                <p className="font-semibold mb-2">PWA Features:</p>
                <ul className="list-disc pl-4 space-y-1">
                  <li>Works offline once loaded</li>
                  <li>Can be installed as an app</li>
                  <li>Your progress is saved locally</li>
                  <li>Share your results with others</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
