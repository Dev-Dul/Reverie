import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Home from './components/home.jsx'
import SignUp from './components/signup.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SignUp />
  </StrictMode>,
)
