import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { theme } from './theme.js'

// Inject active theme as CSS custom properties before first render
const root = document.documentElement
root.style.setProperty('--color-accent',         theme.accent)
root.style.setProperty('--color-accent-hover',   theme.accentHover)
root.style.setProperty('--accent-soft-bg',       theme.accentSoftBg)
root.style.setProperty('--accent-soft-border',   theme.accentSoftBorder)
root.style.setProperty('--accent-glow-bg',       theme.accentGlowBg)
root.style.setProperty('--accent-glow',          theme.accentGlow)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
