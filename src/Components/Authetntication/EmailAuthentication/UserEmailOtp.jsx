import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../../context/authcontext";
import { useNavigate } from "react-router-dom";
import { jwtDecode }  from 'jwt-decode'
import { MuiOtpInput } from 'mui-one-time-password-input'
import { Button } from "@mui/material";
import { toast } from "react-toastify";



const UserEmailOtp = ({email,otp_,auth,setModalOpen}) => {
  const { setAuthToken,setUser,authToken,setBasicModal,myLocation } = useContext(AuthContext)
const [otp,setOtp] = useState('')
  const navigate = useNavigate()
  const UserEmailOtpVerification = async (e) => {

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_URL_SERVER}/email/otp/`,
        {
          otp:otp_ ,
          email: email,
          otp_entered: e,
         ...(myLocation && !auth ? { location: myLocation } : {})
        },
        auth?{
         headers:{
            'Authorization':`Bearer ${authToken.access}`
          }
        }:null
      );
      const data = response.data;
      console.log(data);
      if (response.status == 200){
       
      if (!auth){
        let decoded = jwtDecode(data.token.access)
        localStorage.setItem('authToken',JSON.stringify(data.token))
        setUser(decoded)
        setAuthToken(data.token)
        setBasicModal(false);
        setModalOpen(false)
        toast.success("Succesfully loginned")
        
        
        
      }
      else {
        navigate('/view')
        toast.success("Email Updated Succesfully!")
      } 
    } 
    
    
    
  }catch (error) {
    console.error("Error:", error);
      
      setBasicModal(false);
      setModalOpen(false)
    navigate('/view')
    toast.warning("Invalid Otp!")
      
    }
  };
  let result = ''
  const handleChange = (value)=>{
    setOtp(value)
    result += value
    console.log(otp.length);
    if(otp.length == 5){
      UserEmailOtpVerification(result)
  
    }
  }

 


  return (
    <form>
    <div className="MainDivForOTPverification">
    <div  className="formforotpverification">
    <div>
    <h4 style={{fontWeight:'bolder',fontFamily:'sans-serif',fontSize:'24px',wordSpacing:'0px',margin:'0px'}}>Verify Your Email Address </h4>
    <small style={{color:'grey',fontSize:'14px'}}>Enter OTP sent to {email}</small>
    </div>
    <div className="EmailOtpInputField">
    <center >
    <MuiOtpInput autoFocus length={6} value={otp} type="number" onChange={handleChange}   />
    </center>
    <Button type="submit" disabled variant="outlined" style={{position: 'absolute',left:' 10%',bottom: '7%',width: '80%'}} >submit</Button>

    </div>
    </div>
    </div>
    </form>
  );
};

export default UserEmailOtp;
