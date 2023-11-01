import React, { useContext } from 'react'
import { AuthContext } from '../../context/authcontext'
import axios from 'axios'

const MobileOtpView = ({sid}) => {
    const {authToken} = useContext(AuthContext)
    const OtpVerification = async (e)=>{
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
        }else{
            console.error(data);
        }
    }

    const changeHandler = (e)=>{
        console.log(e.target.value);
        if (e.target.value.length == 6){
            OtpVerification(e.target.value)
        }
    }
  return (
    <div>
    <form  >
    <input type='text' name='otp' onChange={e=>changeHandler(e)} />
    <input type='submit'/>
    </form> 
    </div>
  )
}

export default MobileOtpView