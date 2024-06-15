import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import axios from 'axios';
import { Provider } from 'react-redux';
import { store } from './Store/index.js';
axios.defaults.baseURL ="http://localhost:5000"
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
      
    </BrowserRouter>
    
  </React.StrictMode>,
)
