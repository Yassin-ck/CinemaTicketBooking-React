import React, { useContext, useRef } from 'react'
import axios from 'axios'
import { AuthContext } from '../../context/authcontext';

const MobilePhoneUpdation = ({byClick}) => {
    console.log('kona');
    const {  authToken } = useContext(AuthContext)
    const inputRef = useRef(null)
    const MobilePhone = async (e)=>{
        e.preventDefault()
        console.log(e);
        const response = await axios.post(
        `${import.meta.env.VITE_URL_SERVER}/userprofile/phone/`,
        {
            phone: inputRef.current.phone.value,
        },
        {
            headers: {
            'Authorization': `Bearer ${authToken.access}`,
            },
        }
        );
        const data = response.data
        if (response.status==200){
            console.log(data);
            byClick(data)
        }else{
            console.error(data);
        }
    }
  return (
    <div>
    <form ref={inputRef} onSubmit={MobilePhone}>
    <input name='phone' type='text'  />
    <input type='submit' />
    </form>
    </div>
    
  )
}

export default MobilePhoneUpdation