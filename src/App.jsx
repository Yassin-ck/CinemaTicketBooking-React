import AuthProvider from "./context/authcontext";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/HomePage/home";
import UserProfileEdit from "./Components/UserPage/UserProfileCrud";
import MobileUpdationModal from "./Components/UserPage/MobileUpdationModal";

const App = () => {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/view" element={<UserProfileEdit />} />
          <Route path="/view/phone" element={<MobileUpdationModal />} />
        </Routes>
      </AuthProvider>
    </>
  );
};

export default App;
