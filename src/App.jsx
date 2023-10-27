import AuthProvider from './AuthContext/authcontext'
import { Routes,Route } from 'react-router-dom'
import UserEmailAuthentication from './Components/UserEmailAuthentication'
const App = () => {


    return(       
       <>
        <AuthProvider>
        <Routes>
        <Route path="/" element={<UserEmailAuthentication />} />
        </Routes>
        </AuthProvider>
        </>
        )   
}

export default App;
