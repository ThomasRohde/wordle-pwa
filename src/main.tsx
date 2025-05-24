import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { registerSW } from 'virtual:pwa-register'

// Register the service worker
const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm('New content available, reload?')) {
      updateSW(true)
    }
  },
  onOfflineReady() {
    console.log('App ready to work offline')
  },
})

// Get the base path for React Router
const basename = import.meta.env.MODE === 'production' ? '/wordle-pwa/' : '/'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
