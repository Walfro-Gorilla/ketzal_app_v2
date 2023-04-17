import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// Importamos BrowserRouter para tener la navegacion.
import { BrowserRouter } from 'react-router-dom'

// Importamos los contextos a utilizar
import UserProvider from './context/UserProvider'


ReactDOM.createRoot(document.getElementById('root')).render(
  // Envolvemos toda la app con el contexto del UserProvider
  <UserProvider >
    {/* Envolvemos la <App /> en el Browser Router para crear la navegacion de la web */}
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  </UserProvider>
)
