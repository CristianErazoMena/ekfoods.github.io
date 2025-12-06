import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles/global.css'
import ErrorBoundary from './components/ErrorBoundary'

// Entry point - render the main App
console.log('main.jsx loading')
const rootEl = document.getElementById('root')
console.log('Root element found:', !!rootEl, rootEl)

if (!rootEl) {
  console.error('FATAL: root element not found in DOM')
  document.body.innerHTML = '<div style="padding: 20px; color: red;">Fatal error: root element not found</div>'
} else {
  try {
    console.log('Creating React root')
    const root = createRoot(rootEl)
    console.log('Rendering App')
    root.render(
      <React.StrictMode>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </React.StrictMode>
    )
    console.log('App rendered successfully')
  } catch (err) {
    console.error('Fatal error during render:', err)
    rootEl.innerHTML = '<div style="padding: 20px; color: red;">Fatal error: ' + String(err) + '</div>'
  }
}
