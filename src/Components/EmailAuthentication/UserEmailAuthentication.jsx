import React, { useContext, useRef } from "react";
import axios from "axios";
import { AuthContext } from "../../context/authcontext";

const UserEmailAuthentication = ({ onEmailSubmit }) => {
  const inputRef = useRef(null);
  const { setEmailAuth } = useContext(AuthContext);
  const UserEmailAuthPost = async (e) => {
    e?.preventDefault();
    const response = await axios.post(
      `${import.meta.env.VITE_URL_SERVER}email/`,
      {
        email: inputRef.current.email.value,
      }
    );
    const data = response.data;
    console.log(data);
    alert(data.email,data.otp)
    setEmailAuth(data);
    onEmailSubmit();
  };

  return (
    <form onSubmit={UserEmailAuthPost} ref={inputRef}>
      <input name="email" type="email" placeholder="email" />
      <input type="submit" />
    </form>
  );
};

export default UserEmailAuthentication;
