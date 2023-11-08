import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import { Muitheme } from './Theme/MuiTheme.jsx'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={Muitheme}>
  <BrowserRouter>
      <App />
      <ToastContainer />
  </BrowserRouter>
  </ThemeProvider>
) 
  