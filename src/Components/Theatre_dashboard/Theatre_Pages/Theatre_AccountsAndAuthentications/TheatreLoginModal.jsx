import axios from 'axios'
import React, { useRef, useState } from 'react'
import TheatreLoginOtp from './TheatreLoginOtp'

const TheatreLoginModal = () => {
  const inputRef = useRef(null)
  const [otpModal,setOtpModal] = useState(false)
  const [emailData,setEmailData] = useState([])
  const TheatreLoginPost = async (e)=>{
    e.preventDefault()
    try{

      const response = await axios.post(`${import.meta.env.VITE_URL_SERVER}/theatre/loginrequest/`,
      { email:inputRef.current.email.value}
      )
      const data = response.data
      if (response.status==200){
        alert(data.msg)
        setEmailData(data)
        setOtpModal(true)
      }
    }catch(error){
      console.error(error);
    }
  }
  
 
  return (
    <>
    <form ref={inputRef} onSubmit={TheatreLoginPost}>
    <input name='email' placeholder='email' type='email' /> 
    <input type='submit' /> 
    </form>
    {otpModal&& <TheatreLoginOtp  emailData={emailData}  /> }
    </>
  )
}

export default TheatreLoginModal