import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import AppProvider from './Content/AppContent.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
    <AppProvider>
        <App /> 
    </AppProvider>
     
    )
