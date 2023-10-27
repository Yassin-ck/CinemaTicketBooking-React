import AuthProvider from './context/authcontext';
import { Routes, Route } from 'react-router-dom';
import EmailAuthModal from './Components/Modal/Modal';

const App = () => {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/emailauth" element={<EmailAuthModal />} />
        </Routes>
      </AuthProvider>
    </>
  );
};

export default App;
