
import { createRoot } from 'react-dom/client'

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

import './index.css'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'


createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
)
