import React, { useContext, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/authcontext";

const OtpModalForVerification = ({sid}) => {
console.log(sid);
  const inputRef = useRef(null);
  const navigate = useNavigate()
  const OwnerPhoneVerification = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_URL_SERVER}/theatre/owner/otp/`,
        {
          otp_entered: inputRef.current.otp.value,
          verification_sid: sid,
        }
      );
      const data = response.data;
      if (response.status == 200){
    
          console.log(data);
      }
      

    } catch (error) {
      console.error("Error:", error);
    }
  };


  return (
    <form onSubmit={OwnerPhoneVerification} ref={inputRef}>
      <input type="text" name="otp" placeholder="OTP" />
      <input type="submit" />
    </form>
  );
};

export default OtpModalForVerification;
