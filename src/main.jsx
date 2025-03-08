import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './Hooks/Redux/Store.js'
import { ThemeProvider } from './Context/Theme.jsx'

createRoot(document.getElementById('root')).render(
  <ThemeProvider>
  <Provider store={store}>
    <App />
  </Provider>
  </ThemeProvider>
)
