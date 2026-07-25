import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { PlannerProvider } from './context/PlannerContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <PlannerProvider>
        <App />
      </PlannerProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
