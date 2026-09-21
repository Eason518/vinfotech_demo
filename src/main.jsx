import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Global error handler to catch React errors
window.addEventListener('error', (e) => {
  console.error('Global error:', e.message, e.filename, e.lineno);
});

createRoot(document.getElementById('root')).render(
  <App />
)
