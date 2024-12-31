import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { ModalContextProvider } from './store/ModalContext.jsx'
createRoot(document.getElementById('root')).render(

    <BrowserRouter>
    <ModalContextProvider>
    <App />
    </ModalContextProvider>
    
    </BrowserRouter>
    
,
)
