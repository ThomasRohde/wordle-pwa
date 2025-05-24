import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { GameProvider } from './context/GameContext'
import { Game } from './pages/Game'
import { About } from './pages/About'

function App() {
  return (
    <GameProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<Game />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Game />} />
        </Routes>
      </div>
    </GameProvider>
  )
}

export default App
