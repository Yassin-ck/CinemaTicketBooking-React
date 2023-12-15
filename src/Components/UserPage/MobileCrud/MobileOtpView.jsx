import React, { useContext, useState } from 'react'
import { AuthContext } from '../../../context/authcontext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './MobileUpdation.css'
import { MuiOtpInput } from 'mui-one-time-password-input'
import { Button } from '@mui/material'
import toast from 'react-hot-toast'

const MobileOtpView = ({phone}) => {
    console.log(phone,'.................');
    const navigate = useNavigate()
    const [otp,setOtp] = useState('')
    const OtpVerification = async (e)=>{
        try{

            const response = await axios.post(
                `${import.meta.env.VITE_URL_SERVER}/userprofile/phone/otp/`,
                {
                    otp_enterd:e,
                    phone:"+91"+phone

                }
            )

            const data = response.data
            if (response.status==200){
                console.log(data);
            navigate('/view')
            toast.success('Mobile Number updated !')
        }else{
            console.error(data);
        }
    }catch(error){
        console.error(error);
        navigate('/view')
        toast.error('Something Went Wrong')

    }
    }

    let result = ''
  const handleChange = (value)=>{
    setOtp(value)
    result += value
    console.log(otp.length);
    if(otp.length == 5){
        OtpVerification(result)
  
    }
  }

  return (
    <div>
   
    <div className="MainDivForOTPverification">
    <div  className="formforotpverification">
    <div>
    <h4 style={{fontWeight:'bolder',fontFamily:'sans-serif',fontSize:'24px',wordSpacing:'0px',margin:'0px'}}>Verify Your Mobile Number </h4>
    <small style={{color:'grey',fontSize:'14px'}}>Enter OTP sent to +91 {phone}</small>
    </div>
    <div className="EmailOtpInputField">
    <center >
    <MuiOtpInput autoFocus length={6} value={otp} type="number" onChange={handleChange}   />
    </center>
    <Button type="submit" disabled variant="outlined" style={{position: 'absolute',left:' 10%',bottom: '7%',width: '80%'}} >submit</Button>

    </div>
    </div>
    </div>
    </div>
  )
}

export default MobileOtpView