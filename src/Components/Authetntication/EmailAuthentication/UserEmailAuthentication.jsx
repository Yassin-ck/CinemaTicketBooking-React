import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../../context/authcontext";
import { Button } from "@mui/material";
import './EmailAuth.css'

const UserEmailAuthentication = ({ onEmailSubmit,auth }) => {
  const inputRef = useRef(null);
  const [emailView,setEmailView] = useState([])
   const { authToken,user } = useContext(AuthContext)
   
  const UserEmailUpdatePost = async (e) => {
    e?.preventDefault();
    const response = await axios(
      `${import.meta.env.VITE_URL_SERVER}/emailupdate/`,
      {
        method:e?'POST':'GET'
      ,
      headers:{
           'Authorization':`Bearer ${authToken.access}`
         },
         data:{
          email:inputRef.current.email.value
         }
       }
      
    );
    const data = response.data;
    console.log(e);
    if (response.status==200 & e !=undefined){

      onEmailSubmit(data);

    }else if (response.status==200 ){
          setEmailView(data.email)
    }
  };
  
  const UserEmailAuthPost = async (e) => {
    e?.preventDefault();
    const response = await axios(
      `${import.meta.env.VITE_URL_SERVER}/emailauth/`,
      {
        method:e?'POST':'GET'
      ,
         data:{
          email:inputRef.current.email.value
         }
       }
      
    );
    const data = response.data;
    console.log(e);
    if (response.status==200 & e !=undefined){

      onEmailSubmit(data);

    }else if (response.status==200 ){
          setEmailView(data.email)
    }
  };
  useEffect(() => {
    if (auth){

      UserEmailUpdatePost()
    }
  }, [])

  return (<>
  
    <form onSubmit={e=>{auth?UserEmailUpdatePost(e):UserEmailAuthPost(e)}} ref={inputRef}>
    <div className="email-auth-text-main-div-container">
    <div className="email-auth-text-main-div">
    {auth?<h4 style={{fontFamily:'sans-serif',fontWeight:'bold'}}>Edit Email Address</h4>:<h4><strong>Login With Email</strong></h4>}
    {auth&&<small>The Email Address will be verified by an OTP</small>}
    </div>
    <div className="email-auth-input-label-div" >
    {auth?<label >Enter or Edit a valid Email Address below</label>:<label>email</label>}
    <div style={{width:'100%'}}>
    <input className="inputFieldForEmailVerification" autoFocus name="email" type="email" defaultValue={emailView?emailView:null}  />
    </div> 
      </div>
      </div>
      <Button type="submit"  className="buttonforemailverificationandauthentication" variant="contained" style={{backgroundColor: 'green',position: 'absolute',left:' 10%',bottom: '7%',width: '80%',borderStyle:'none'}} >submit</Button>
      </form>
      </>
  );
};

export default UserEmailAuthentication;

