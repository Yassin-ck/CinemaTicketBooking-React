import AuthProvider from "./context/authcontext";
import { Routes, Route } from "react-router-dom";
import Home from "./Components/HomePage/home";
import UserProfileEdit from "./Components/UserPage/UserProfileCrud";
import MobileUpdationModal from "./Components/UserPage/MobileUpdationModal";
import Admin_UserProfileView from "./Components/AdminPanel/Admin_UserProfileView";
import Admin_TheatreOwnerRequest from "./Components/AdminPanel/Admin_TheatreOwnerRequest";
import Admin_TheatreOwnerVerification from "./Components/AdminPanel/Admin_TheatreOwnerVerification";

const App = () => {
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/view" element={<UserProfileEdit />} />
          <Route path="/view/phone" element={<MobileUpdationModal />} />
          <Route path="/admin/user" element={<Admin_UserProfileView />} />
          <Route path="/admin/theatre_owners" element={<Admin_TheatreOwnerRequest />} />
          <Route path="/admin/theatre_owners/:id" element={<Admin_TheatreOwnerVerification />} />
        </Routes>
      </AuthProvider>
    </>
  );
};

export default App;
