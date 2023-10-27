
import React, { createContext, useState } from 'react';
export const AuthContext = createContext()

const AuthProvider = ({children})=>{
const [emailAuth,setEmailAuth] = useState([])
const contextState = {
  emailAuth:emailAuth,
  setEmailAuth:setEmailAuth
}
  return(
          <AuthContext.Provider value={contextState} >
          {children}
          </AuthContext.Provider>     
)}

export default AuthProvider;
