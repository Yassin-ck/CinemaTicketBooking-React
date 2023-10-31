import React, { createContext, useState } from "react";
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authToken,setAuthToken] = useState(()=>localStorage.getItem('authToken')?JSON.parse(localStorage.getItem('authToken')):null)
  const [user,setUser] = useState(()=>localStorage.getItem('authToken')?localStorage.getItem('authToken'):null)
  const contextState = {
    authToken:authToken
  };

  return (
    <AuthContext.Provider value={contextState}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
