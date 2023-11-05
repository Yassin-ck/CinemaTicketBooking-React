import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/authcontext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const MobileOtpView = ({sid}) => {
    const {authToken} = useContext(AuthContext)
    const navigate = useNavigate()
    const [otp,setOtp] = useState('')
    const OtpVerification = async (e)=>{
        try{

            const response = await axios.post(
                `${import.meta.env.VITE_URL_SERVER}/userprofile/phone/otp/`,
                {
                    otp:e,
                    verification_sid:sid
                },{
                headers:{
                    'Authorization':`Bearer ${authToken.access}`
                }
            }
            )

            const data = response.data
            if (response.status==200){
                console.log(data);
            navigate('/view')
        }else{
            console.error(data);
        }
    }catch(error){
        console.error(data);
        navigate('/view')

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
    <form  >
    <div className="otpInputField">
    <MuiOtpInput length={6} value={otp} type="number" onChange={handleChange}   />
    </div>
      <input className="btn btn-success" type="submit" style={{position:'absolute',bottom:'40px',right:'40px'}} />

    </form> 
    </div>
  )
}

export default MobileOtpView