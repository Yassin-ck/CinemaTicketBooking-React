import React, { useContext, useRef } from "react";
import axios from "axios";
import { AuthContext } from "../../context/authcontext";
import { useNavigate } from "react-router-dom";
import { jwtDecode }  from 'jwt-decode'

const UserEmailOtp = ({email,otp,auth}) => {
  const { setAuthToken,setUser,authToken } = useContext(AuthContext)
  const inputRef = useRef(null);
  const navigate = useNavigate()
  const UserEmailOtpVerification = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_URL_SERVER}/email/otp/`,
        {
          otp: inputRef.current.otp.value,
          email: email,
          otp_entered: otp,
        },
        auth?{
         headers:{
            'Authorization':`Bearer ${authToken.access}`
          }
        }:null
      );
      const data = response.data;
      if (response.status == 200){
        navigate('/view')
      }
      console.log(data);
      if (!auth){
        let decoded = jwtDecode(data.token.access)
        localStorage.setItem('authToken',JSON.stringify(data.token))
        setUser(decoded)
        setAuthToken(data.token)
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };


  return (
    <form onSubmit={UserEmailOtpVerification} ref={inputRef}>
      <input type="text" name="otp" placeholder="OTP" />
      <input type="submit" />
    </form>
  );
};

export default UserEmailOtp;
