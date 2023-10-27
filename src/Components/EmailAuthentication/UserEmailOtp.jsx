import React, { useContext, useRef } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/authcontext';

const UserEmailOtp = () => {
  const inputRef = useRef(null);
  const { emailAuth } = useContext(AuthContext)
  const UserEmailOtpVerification = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_URL_SERVER}email/otp/`, {
        otp: inputRef.current.otp.value,
        email : emailAuth.email,
        otp_enterd : emailAuth.otp,
      });
      const data = response.data;
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={UserEmailOtpVerification} ref={inputRef}>
      <input type='text' name='otp' placeholder='OTP' />
      <input type='submit' />
    </form>
  );
};

export default UserEmailOtp;
