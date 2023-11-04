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
      <div className="input-group-emailauthentication">
      <div className="input-label-emailauth">
      <label >email</label> 
      <input name="email" type="email" style={{fontSize:'13px',height:'28px'}} />
      </div>
      </div>
    <input className="btn bg-success" type="submit" style={{position:'absolute',bottom:'40px',right:'40px'}} />
    </form>
  );
};

export default UserEmailAuthentication;

