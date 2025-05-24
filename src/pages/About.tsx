import React from 'react'
import { Link } from 'react-router-dom'

export const About: React.FC = () => {
  return (
    <div className="mobile-vh bg-white p-4 mobile-safe">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-800">About Wordle PWA</h1>
          <Link 
            to="/" 
            className="px-4 py-2 bg-wordle-green text-white rounded hover:bg-green-600 transition-colors"
          >
            Back to Game
          </Link>
        </div>

        <div className="space-y-6">
          <section>
            <h2 className="text-xl font-semibold mb-3">What is this?</h2>
            <p className="text-gray-700 leading-relaxed">
              This is a Progressive Web App (PWA) clone of the popular Wordle game. 
              It's built with React, TypeScript, and modern web technologies to provide 
              a native app-like experience that works offline and can be installed on your device.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">PWA Features</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li><strong>Offline Support:</strong> Play even without an internet connection</li>
              <li><strong>Installable:</strong> Add to your home screen like a native app</li>
              <li><strong>Fast Loading:</strong> Optimized performance with service worker caching</li>
              <li><strong>Responsive:</strong> Works great on mobile, tablet, and desktop</li>
              <li><strong>Local Storage:</strong> Your game progress is saved on your device</li>
              <li><strong>Share Results:</strong> Copy your results to share with friends</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">How to Play</h2>
            <ol className="list-decimal pl-6 space-y-2 text-gray-700">
              <li>Guess the 5-letter word in 6 tries or fewer</li>
              <li>Each guess must be a valid English word</li>
              <li>After each guess, tiles change color to show how close you were:
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li><span className="inline-block w-4 h-4 bg-wordle-green rounded mr-2"></span>Green: Letter is correct and in the right position</li>
                  <li><span className="inline-block w-4 h-4 bg-wordle-yellow rounded mr-2"></span>Yellow: Letter is in the word but wrong position</li>
                  <li><span className="inline-block w-4 h-4 bg-wordle-gray rounded mr-2"></span>Gray: Letter is not in the word</li>
                </ul>
              </li>
              <li>A new word is available every day</li>
            </ol>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Installation</h2>
            <div className="space-y-3 text-gray-700">
              <p><strong>Desktop (Chrome/Edge):</strong> Look for the install icon in the address bar, or check the menu for "Install Wordle PWA"</p>
              <p><strong>Mobile (iOS):</strong> Tap the Share button and select "Add to Home Screen"</p>
              <p><strong>Mobile (Android):</strong> Tap the menu button and select "Add to Home Screen" or "Install App"</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Technical Details</h2>
            <ul className="list-disc pl-6 space-y-2 text-gray-700">
              <li>Built with React 18 and TypeScript</li>
              <li>Powered by Vite for fast development and building</li>
              <li>Styled with Tailwind CSS</li>
              <li>Service Worker for offline functionality</li>
              <li>Local Storage for game state persistence</li>
              <li>Responsive design with mobile-first approach</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">Privacy</h2>
            <p className="text-gray-700 leading-relaxed">
              This app stores all your game data locally on your device. No personal information 
              is collected or sent to any servers. Your game statistics and progress are completely private.
            </p>
          </section>

          <section className="border-t pt-6">
            <p className="text-center text-gray-600">
              Enjoy playing Wordle PWA! 🎮
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
