import axios from 'axios'
import React, { useContext, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const TheatreLoginOtp = ({emailData}) => {
    const navigate = useNavigate()
    const inputRef = useRef(null)
    console.log(emailData);

    const OtpVerififcationPost = async (e) => {
        e.preventDefault();
      
        try {
          const response = await axios.post(`${import.meta.env.VITE_URL_SERVER}/theatre/loginverify/`, {
            otp_entered: inputRef.current.otp.value,
            email: emailData.email,
          });
      
          console.log('Response:', response);
      
          if (response.status === 200) {
            alert(response.data.msg);
            localStorage.setItem('authToken', JSON.stringify(response.data.token));
          navigate('/theatre/screens')
        } 
    } catch (error) {
      console.log(error);
        if (error.response.status==403){
              localStorage.setItem('authToken', JSON.stringify(error.response.data.token));
             navigate(`/theatre/screencrud/${error.response.data.id}`)
              
          }else{
            alert(error.response.data.msg)
          }
        }
      };
      
    

  return (

    <div>
    <form ref={inputRef} onSubmit={OtpVerififcationPost}>
    <input name='otp' placeholder='otp' type='text' />
    <input  type='submit' />
    </form>
    </div>
  )
}

export default TheatreLoginOtp