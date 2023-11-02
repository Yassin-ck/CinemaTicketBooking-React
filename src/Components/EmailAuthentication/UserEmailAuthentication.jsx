import React, { useContext, useRef } from "react";
import axios from "axios";
import { AuthContext } from "../../context/authcontext";

const UserEmailAuthentication = ({ onEmailSubmit,auth }) => {
  const inputRef = useRef(null);
  const { authToken } = useContext(AuthContext)
  const UserEmailAuthPost = async (e) => {
    e?.preventDefault();
    const response = await axios.post(
      `${import.meta.env.VITE_URL_SERVER}/email/`,
      {
        email: inputRef.current.email.value,
      },
      auth?{
        headers:{
           'Authorization':`Bearer ${authToken.access}`
         }
       }:null
    );
    const data = response.data;
    if (response.status==200){

      console.log(data)
      onEmailSubmit(data);
      
    }
  };

  return (
    <form onSubmit={UserEmailAuthPost} ref={inputRef}>
      <input name="email" type="email" placeholder="email" />
      <input type="submit" />
    </form>
  );
};

export default UserEmailAuthentication;

