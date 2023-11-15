
// Css imports
import './index.css'

// Liberary import
import ReactDOM from 'react-dom/client'
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';

// Components import
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
    <Toaster />
  </BrowserRouter>
)
