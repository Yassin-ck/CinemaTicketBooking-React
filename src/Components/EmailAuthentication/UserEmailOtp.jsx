import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/authcontext";
import { useNavigate } from "react-router-dom";
import { jwtDecode }  from 'jwt-decode'
import { MuiOtpInput } from 'mui-one-time-password-input'
import Swal from 'sweetalert2'
import { Button } from "@mui/material";


const UserEmailOtp = ({email,otp_,auth}) => {
  const { setAuthToken,setUser,authToken,setBasicModal,setModalOpen } = useContext(AuthContext)
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
        navigate('/')
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Loginned Successfully',
          showConfirmButton: false,
          timer: 1500,
          heightAuto:false,
          width:400
        })
       
    
        }
        else {
          setBasicModal(false);
          setModalOpen(false)
          navigate('/view')
      } 
      } 

          
    
  }catch (error) {
      console.error("Error:", error);
      if (!auth){

        setBasicModal(false);
        setModalOpen(false)
        Swal.fire({
          position: 'top-end',
          icon: 'warning',
          title: 'Unauthorized ',
          showConfirmButton: false,
          timer: 1500,
          heightAuto:false,
          width:400
        });
        
      }
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
    <div  className="formforotpverification">
    <div className="EmailOtpInputField">
    <center >
    <MuiOtpInput  length={6} value={otp} type="number" onChange={handleChange}   />
    </center>
    </div>
    </div>
    <Button type="submit" variant="contained" style={{backgroundColor: 'green',position: 'absolute',left:' 10%',bottom: '7%',width: '80%',borderStyle:'none'}} >submit</Button>
    </form>
  );
};

export default UserEmailOtp;
