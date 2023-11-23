import Home from "./Components/HomePage/home";
import AuthProvider from "./context/authcontext";
import { Routes, Route } from "react-router-dom";
import Movieslist from "./Components/Movies/Movieslist";
import PrivateRouter from "./PrivateRouter/PrivateRouter";
import Footer from "./Components/NavBarFooter/Footer/Footer";
import Navbar from "./Components/NavBarFooter/Navbar/Navbar";
import SignInPage from "./Components/HomePage/SignInPages/SignInPage";
import UserProfileEdit from "./Components/UserPage/UserProfileCrud/UserProfileCrud";
import MobileUpdationModal from "./Components/UserPage/MobileCrud/MobileUpdationModal";
import TheatreListByLocation from "./Components/UserPage/TheatreByLocation/TheatreListByLocation";
import MoviesByLoctnAndLngage from "./Components/UserPage/MoviesByLocation/MoviesByLoctnAndLngage";
import MovieDetailsFullShowing from "./Components/UserPage/MoviesByLocation/MovieDetailsFullShowing";
import Admin_TheatreRequestView from "./Components/AdminPanel/Admin_theatres/Admin_TheatreRequestView";
import TheatreWithScreenDetails from "./Components/UserPage/TheatreByLocation/TheatreWIthSreenDetails";
import Admin_TheatreVerification from "./Components/AdminPanel/Admin_theatres/Admin_TheatreVerification";
import ScreenDetailsByScreenNumber from "./Components/UserPage/MoviesByLocation/ScreenDetailsByScreenNumber";
import TheatreOwnerRegistration from "./Components/Theatre_dashboard/Theatre_Owner/TheatreOwnerRegistration";
import Admin_TheatreOwnerRequest from "./Components/AdminPanel/Admin_theatreOwners/Admin_TheatreOwnerRequest";
import Admin_UserProfileView from "./Components/AdminPanel/Admin_Modals/Admin_UserAccess/Admin_UserProfileView";
import MoviesByLocationAndnameAndDate from "./Components/UserPage/MoviesByLocation/MoviesByLocationAndnameAndDate";
import Admin_TheatreOwnerVerification from "./Components/AdminPanel/Admin_theatreOwners/Admin_TheatreOwnerVerification";
import TheatreRegistration from "./Components/Theatre_dashboard/Theatre_Pages/Theatre_AccountsAndAuthentications/TheatreRegistration";


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
          <Route path="/movies/list" element={<Movieslist />} />
          <Route path="/admin/theatre_request" element={<Admin_TheatreRequestView />} />
          <Route path="/admin/theatre_request/:id" element={<Admin_TheatreVerification />} />
          <Route path="/movies/:language" element={<MoviesByLoctnAndLngage />} />
          <Route path="/movies/:language/:movie/" element={<MovieDetailsFullShowing />} />
          <Route path="/movies/:language/:movie/:dt" element={<MoviesByLocationAndnameAndDate />} />
          <Route path="/movies/:language/:movie/:dt/:cinemas/:screen/:tm" element={<ScreenDetailsByScreenNumber />} />
          <Route path="/talkies/all" element={<TheatreListByLocation />} />
          <Route path="/talkies/:cinemas/:dt" element={<TheatreWithScreenDetails />} />
          
        </Routes>
        <Footer />
      </AuthProvider>
    </>
  );
};

export default App;
