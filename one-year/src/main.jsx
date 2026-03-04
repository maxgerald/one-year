import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { validateDataIntegrity } from './utils/validateData.js'

if (import.meta.env.DEV) {
  validateDataIntegrity()
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
