import Home from "./Components/HomePage/home";
import AuthProvider from "./context/authcontext";
import { Routes, Route } from "react-router-dom";
import UserProfileEdit from "./Components/UserPage/UserProfileCrud";
import MobileUpdationModal from "./Components/UserPage/MobileUpdationModal";
import Admin_UserProfileView from "./Components/AdminPanel/Admin_UserProfileView";
import TheatreRegistration from "./Components/Theatre_dashboard/TheatreRegistration";
import Admin_TheatreRequestView from "./Components/AdminPanel/Admin_TheatreRequestView";
import Admin_TheatreOwnerRequest from "./Components/AdminPanel/Admin_TheatreOwnerRequest";
import Admin_TheatreVerification from "./Components/AdminPanel/Admin_TheatreVerification";
import TheatreOwnerRegistration from "./Components/Theatre_dashboard/TheatreOwnerRegistration";
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
          <Route path="/admin/owners_request" element={<Admin_TheatreOwnerRequest />} />
          <Route path="/admin/owners_request/:id" element={<Admin_TheatreOwnerVerification />} />
          <Route path="/theatre/owner/register" element={<TheatreOwnerRegistration />} />
          <Route path="/theatre/register" element={<TheatreRegistration />} />
          <Route path="admin/theatre_request" element={<Admin_TheatreRequestView />} />
          <Route path="admin/theatre_request/:id" element={<Admin_TheatreVerification />} />
        </Routes>
      </AuthProvider>
    </>
  );
};

export default App;
