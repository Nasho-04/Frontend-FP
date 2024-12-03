import { createRoot } from 'react-dom/client'
import React from 'react'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { GlobalContextProvider } from './GlobalContext.jsx'

createRoot(document.getElementById('root')).render(
    <GlobalContextProvider>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </GlobalContextProvider>
)
