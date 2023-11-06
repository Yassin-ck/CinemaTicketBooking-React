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
import PrivateRouter from "./PrivateRouter/PrivateRouter";
import EmailAuthModal from "./Components/EmailAuthentication/EmailAuthModal";
import Navbar from "./Components/NavBarFooter/Navbar";
import SignInPage from "./Components/HomePage/SignInPage";
import Footer from "./Components/NavBarFooter/Footer";


const App = () => {
  return (
    <>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/useremailupdation/:auth" element={<PrivateRouter><SignInPage /></PrivateRouter>} />
          <Route path="/view" element={ <PrivateRouter><UserProfileEdit /></PrivateRouter>} />
          <Route path="/view/phone" element={<PrivateRouter><MobileUpdationModal /></PrivateRouter>} />
          <Route path="/admin/user" element={<Admin_UserProfileView />} />
          <Route path="/admin/owners_request" element={<Admin_TheatreOwnerRequest />} />
          <Route path="/admin/owners_request/:id" element={<Admin_TheatreOwnerVerification />} />
          <Route path="/theatre/owner/register" element={<TheatreOwnerRegistration />} />
          <Route path="/theatre/register" element={<TheatreRegistration />} />
          <Route path="admin/theatre_request" element={<Admin_TheatreRequestView />} />
          <Route path="admin/theatre_request/:id" element={<Admin_TheatreVerification />} />
        </Routes>
        <Footer />
      </AuthProvider>
    </>
  );
};

export default App;
