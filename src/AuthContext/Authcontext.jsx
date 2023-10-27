
import React, { createContext } from 'react';
export const AuthContext = createContext()

const AuthProvider = ({children})=>{

const contextState = {
}
  return(
          <AuthContext.Provider value={contextState} >
          {children}
          </AuthContext.Provider>     
)}

export default AuthProvider;
