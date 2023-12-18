import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux'
import store from './Redux/store.jsx'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';


let authToken = JSON.parse(localStorage.getItem('authToken'))

axios.interceptors.request.use((request)=>{
  console.log(request);
 if (authToken){
    request.headers.Authorization = `Bearer ${authToken.access}`
  }
return request;

})

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <Provider store={store}>
      <Toaster  position="top-center"/>  
         <App />
      </Provider>
  </BrowserRouter>
) 
  