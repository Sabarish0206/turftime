import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import axios from 'axios';
import { Provider } from 'react-redux';
import { store } from './Store/index.js';
import {disableReactDevTools} from '@fvilers/disable-react-devtools';

axios.defaults.baseURL =import.meta.env.VITE_API_BASE_URL;

disableReactDevTools();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
      
    </BrowserRouter>
    
  </React.StrictMode>,
)
