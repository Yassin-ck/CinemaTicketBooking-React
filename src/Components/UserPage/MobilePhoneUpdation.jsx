import React, { useContext, useRef, useEffect, useState } from 'react'
import axios from 'axios'
import { AuthContext } from '../../context/authcontext';

const MobilePhoneUpdation = ({byClick}) => {
    const [phoneValue,setPhoneValue] = useState([])
    const {  authToken } = useContext(AuthContext)
    const inputRef = useRef(null)
    
    const MobilePhone = async (e)=>{
        e?.preventDefault()
        try{

            const response = await axios(
                `${import.meta.env.VITE_URL_SERVER}/userprofile/phone/`,
        {
            method:e?'POST':'GET'
             ,
            headers: {
            'Authorization': `Bearer ${authToken.access}`,
            },
            data:{
                
                phone: e?inputRef.current.phone.value:null,
            }
        }
        );
        const data = response.data
        if (response.status==200 & e != undefined){
            console.log(data);
            byClick(data)
        }else{
            setPhoneValue(data.phone)
        }
    }catch(error){
        console.error(error);
    }
    }
    useEffect(() => {
        MobilePhone()
    }, [])
    
  return (
    <div>
    <form ref={inputRef} onSubmit={MobilePhone}>
    <div className="input-group-emailauthentication">
    <div className="input-label-emailauth">
    <label >Mobile Number</label> 
    <input name="phone" type="text" defaultValue={phoneValue&&phoneValue} style={{fontSize:'13px',height:'28px'}} />
    </div>
    </div>
    <input className="btn bg-success" type="submit" style={{position:'absolute',bottom:'40px',right:'40px'}} />
    </form>
    </div>
    
  )
}

export default MobilePhoneUpdation