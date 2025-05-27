// main.jsx
// Punto de entrada principal de la aplicación React para el frontend de Enube-News-App.
// Renderiza el componente App dentro del elemento con id 'root' y 
// aplica StrictMode para mejores prácticas y advertencias en desarrollo.

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
