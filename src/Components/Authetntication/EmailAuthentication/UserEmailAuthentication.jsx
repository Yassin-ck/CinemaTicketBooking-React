import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../../context/authcontext";
import { Button } from "@mui/material";
import './EmailAuth.css'

const UserEmailAuthentication = ({ onEmailSubmit, auth }) => {
  const [emailView, setEmailView] = useState([]);
  const [email, setEmail] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const UserEmailUpdatePost = async (e) => {
    e?.preventDefault();
    const response = await axios(
      `${import.meta.env.VITE_URL_SERVER}/emailupdate/`,
      {
        method: e ? 'POST' : 'GET',
        data: {
          email: email,
        },
      }
    );
    const data = response.data;
    console.log(e);
    if (response.status === 200 && e !== undefined) {
      onEmailSubmit(email);
    } else if (response.status === 200) {
      setEmailView(data.email);
    }
  };

  const UserEmailAuthPost = async (e) => {
    e?.preventDefault();
    const response = await axios(
      `${import.meta.env.VITE_URL_SERVER}/emailauth/`,
      {
        method: e ? 'POST' : 'GET',
        data: {
          email: email,
        },
      }
    );
    const data = response.data;
    console.log(e);
    if (response.status === 200 && e !== undefined) {
      onEmailSubmit(email);
    } else if (response.status === 200) {
      setEmailView(data.email);
    }
  };

  useEffect(() => {
    if (auth) {
      UserEmailUpdatePost();
    }
  }, []);

  return (
    <>
      <form
        onSubmit={(e) => {
          auth ? UserEmailUpdatePost(e) : UserEmailAuthPost(e);
        }}
      >
        <div className="email-auth-text-main-div-container">
          <div className="email-auth-text-main-div">
            {auth ? (
              <h4 style={{ fontFamily: 'sans-serif', fontWeight: 'bold' }}>
                Edit Email Address
              </h4>
            ) : (
              <h4>
                <strong>Login With Email</strong>
              </h4>
            )}
            {auth && (
              <small>The Email Address will be verified by an OTP</small>
            )}
          </div>
          <div className="email-auth-input-label-div">
            {auth ? (
              <label>Enter or Edit a valid Email Address below</label>
            ) : (
              <label>email</label>
            )}
            <div style={{ width: '100%' }}>
              <input
                className="inputFieldForEmailVerification"
                autoFocus
                name="email"
                type="email"
                defaultValue={emailView?emailView:null} 
                onChange={handleChange}  // Add this line for onChange event
              />
            </div>
          </div>
        </div>
        <Button
          type="submit"
          className="buttonforemailverificationandauthentication"
          variant="contained"
          style={{
            backgroundColor: '#14110f',
            position: 'absolute',
            left: ' 10%',
            bottom: '7%',
            width: '80%',
            borderStyle: 'none',
          }}
        >
          submit
        </Button>
      </form>
    </>
  );
};

export default UserEmailAuthentication;
