import React, { useState } from 'react'
import { isIOS, isAndroid, getInstallInstructions } from '../utils/pwa'

interface InstallPromptProps {
  onClose: () => void
}

export const InstallPrompt: React.FC<InstallPromptProps> = ({ onClose }) => {
  const instructions = getInstallInstructions()
  const [showDetails, setShowDetails] = useState(false)

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Install Wordle PWA</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
            type="button"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-center p-4 bg-blue-50 rounded-lg">
            <div className="text-4xl mr-3">📱</div>
            <div>
              <p className="font-semibold text-blue-800">Install as App</p>
              <p className="text-sm text-blue-600">Get the full app experience</p>
            </div>
          </div>

          <div className="text-gray-700">
            <p className="font-semibold mb-2">
              {isIOS() ? '📱 iOS Installation:' : isAndroid() ? '🤖 Android Installation:' : '💻 Desktop Installation:'}
            </p>
            <p className="text-sm leading-relaxed">{instructions}</p>
          </div>

          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-blue-600 hover:text-blue-800 text-sm underline"
            type="button"
          >
            {showDetails ? 'Hide' : 'Show'} detailed instructions
          </button>

          {showDetails && (
            <div className="bg-gray-50 p-4 rounded-lg text-sm space-y-3">
              <div>
                <h4 className="font-semibold text-gray-800 mb-1">💻 Desktop (Chrome/Edge):</h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  <li>Look for the install icon (⊕) in the address bar</li>
                  <li>Or click the menu (⋮) → "Install Wordle PWA"</li>
                  <li>Click "Install" when prompted</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-1">📱 iOS Safari:</h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  <li>Tap the Share button (□↗) at the bottom</li>
                  <li>Scroll down and tap "Add to Home Screen"</li>
                  <li>Tap "Add" to confirm</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-gray-800 mb-1">🤖 Android Chrome:</h4>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  <li>Tap the menu (⋮) in the top right</li>
                  <li>Select "Add to Home Screen" or "Install App"</li>
                  <li>Tap "Add" to confirm</li>
                </ul>
              </div>
            </div>
          )}

          <div className="bg-green-50 p-3 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-1">✨ Benefits of Installing:</h4>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Works offline</li>
              <li>• Faster loading</li>
              <li>• Full-screen experience</li>
              <li>• Home screen access</li>
            </ul>
          </div>

          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
              type="button"
            >
              Maybe Later
            </button>
            <button
              onClick={() => {
                // Copy install instructions to clipboard
                navigator.clipboard?.writeText(instructions).then(() => {
                  // Could show a toast here
                })
                onClose()
              }}
              className="flex-1 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              type="button"
            >
              Copy Instructions
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
