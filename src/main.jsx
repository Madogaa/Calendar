import React from 'react'
import ReactDOM from 'react-dom/client'
import {NextUIProvider} from '@nextui-org/react'
import App from './App.jsx'
import BackgroundBlur from './Styling/BackgroundBlur.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NextUIProvider>
      <div className="relative isolate bg-gray-900">
        <App />
        <BackgroundBlur />
      </div>
    </NextUIProvider>
  </React.StrictMode>,
)
