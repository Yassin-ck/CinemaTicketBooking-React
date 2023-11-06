import React, { useContext, useRef, useEffect, useState, useMemo } from 'react'
import Select from 'react-select'
import countryList from 'react-select-country-list'
import axios from 'axios'
import { AuthContext } from '../../context/authcontext';
import './MobileUpdation.css'
import { Button } from '@mui/material';

const MobilePhoneUpdation = ({byClick}) => {
    const [phoneValue,setPhoneValue] = useState([])
    const {  authToken } = useContext(AuthContext)
    const inputRef = useRef(null)
    const [value, setValue] = useState('')
    const options = useMemo(() => countryList().getData(), [])
    
    const changeHandler = value => {
      setValue(value)
    }
    
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
                
                phone: e?`+91${inputRef.current.phone.value}`:null,
            }
        }
        );
        const data = response.data
        if (response.status==200 & e != undefined){
            console.log(data);
            byClick(data,inputRef.current.phone.value)
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
    <form onSubmit={MobilePhone} ref={inputRef}>
    <div className='container ms-4'>
    <div className="MobilePhoneUpdationOrAddMainDiv">
    <div className="MobileUpdationSecondDiv">
<h5 style={{display:'block',margin:'0px',fontFamily:'sans-serif',fontWeight:'bold'}}>{phoneValue.length!=0?'Edit':'Enter'} Mobile Number</h5>
    </div>
    <div className="MobileUpdationInputLabelDiv" >
    <label  >Enter or Edit a 10 digit Mobile Number below</label>
    <div className='MobilePhoneUpdationIndiaAndInputDiv' >
    <div  className='MobilePhoneUpdationIndiaDiv'>
    <img  src="https://in.bmscdn.com/webin/common/icons/indianflag.svg" />
    <span >+91 | </span>
    </div>
    <div className='MobilePhoneUpdationInputDiv'>
    <input autoFocus name='phone' maxlength="10" type="tel" defaultValue={phoneValue?phoneValue:null}  />
    </div>
    </div>
    
    </div>
  </div> 
  </div>

      <Button type="submit"  className="buttonforemailverificationandauthentication" variant="contained" style={{backgroundColor: 'green',position: 'absolute',left:' 10%',bottom: '7%',width: '80%',borderStyle:'none'}} >submit</Button>
      </form>
   
    </div>
    
  )
}

export default MobilePhoneUpdation







  

