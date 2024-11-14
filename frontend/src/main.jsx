import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { RouterProvider } from 'react-router-dom'
import router from './routes/index.jsx'

import {Provider} from 'react-redux'
//import configureStore from '../store/store.jsx'
import configureStore from './store/store.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <Provider store={configureStore}>
      <RouterProvider router={router}/> 
    </Provider>
 
  </StrictMode>,
)
