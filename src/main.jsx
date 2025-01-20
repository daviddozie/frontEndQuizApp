import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { UserProvider } from './ContextAPI/UserContext.jsx';
import { PointsProvider } from "./ContextAPI/PointsContext";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserProvider>
      <PointsProvider>
        <App />
      </PointsProvider>
    </UserProvider>
  </React.StrictMode>,
)
