import React, { createContext, useEffect, useState } from "react";
export const AuthContext = createContext();
import { jwtDecode } from "jwt-decode";

const AuthProvider = ({ children }) => {
  const [authToken,setAuthToken] = useState(()=>localStorage.getItem('authToken')?JSON.parse(localStorage.getItem('authToken')):null)
  const [user,setUser] = useState(()=>localStorage.getItem('authToken')?jwtDecode(localStorage.getItem('authToken')):null)
  const [basicModal, setBasicModal] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [getView,setGetView] = useState([])
  const [myLocation,setMyLocation] = useState(()=>localStorage.getItem('myLocation')?JSON.parse(localStorage.getItem('myLocation')):null)
  const [currentDate, setCurrentDate] = useState('');
useEffect(() => {
  const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    setCurrentDate(formattedDate);
}, [])




  const contextState = {
    currentDate:currentDate,
    authToken:authToken,
    setUser:setUser,
    setAuthToken:setAuthToken,
    user:user,
    basicModal:basicModal,
    setBasicModal:setBasicModal,
    modalOpen:modalOpen,
    setModalOpen:setModalOpen,
    getView:getView,
    setGetView:setGetView,
    myLocation:myLocation,
    setMyLocation:setMyLocation
  };

  
  
  return (
    <AuthContext.Provider value={contextState}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
