import axios from 'axios'
import React, { useContext, useRef, useState } from 'react'
import { AuthContext } from '../../context/authcontext'
import OtpModalForVerification from './OtpModalForVerification'

const TheatreOwnerRegistration = () => {
    const { authToken } = useContext(AuthContext)
    const [modalOpen,setModalOpen] = useState(false)
    const [sid,setSid] = useState(null)

     const [ registerData,setRegisterData ] = useState({
        first_name:'',
        last_name:'',
        email:'',
        phone:'',
        alternative_contact:'',
        id_proof:null,
        id_number:'',
        address:''
    })
    const dataHandler = (e)=>{
        console.log(e);
        if (e.target.name=='id_proof'){
            setRegisterData({...registerData,[e.target.name]:e.target.files[0]})
        }else{
            setRegisterData({...registerData,[e.target.name]:e.target.value})
        }
    }
    
    
    const TheatreOwnerRegistrationForm = async(e)=>{
        e.preventDefault()       
        const formData = new FormData()
        formData.append('first_name',registerData.first_name)
        formData.append('last_name',registerData.last_name)
        formData.append('email',registerData.email)
        formData.append('phone',registerData.phone)
        formData.append('alternative_contact',registerData.alternative_contact)
        formData.append('id_proof',registerData.id_proof)
        formData.append('id_number',registerData.id_number)
        formData.append('address',registerData.address)
        try{

            const response = await axios.post(
                `${import.meta.env.VITE_URL_SERVER}/theatre/owner/register/`,
                
                formData,
                
                {
                    headers:{
                        'Content-Type':'multipart/formdata',
                        'Authorization':`Bearer ${authToken.access}`
                    }
                }
                )
                const data = response.data
                console.log(data);
                if (response.status==201){
                    console.log(data);
                    setSid(data.verification_sid)
                    setModalOpen(true)
                    alert(data.msg)
                }else{
                    console.warn(data);
                }
                
            }catch(error){
             
                    let errorss = error.response.data.errors
                    console.log(errorss);
                    for (let field in errorss){
                        console.log({[field]:errorss[field]});
                    }                   
                  
            }
                
            }
           
            return (   
                <div>
                <form onSubmit={TheatreOwnerRegistrationForm} >
                <input  name='first_name' placeholder='firstname' type='text' onChange={dataHandler} required />
                <input  name='last_name' placeholder='lastname' type='text' onChange={dataHandler} required />
                <input  name='email' placeholder='email' type='email' onChange={dataHandler} required />
                <input  name='phone' placeholder='phone' type='text' onChange={dataHandler} required />
                <input  name='alternative_contact' placeholder='alternative contact' type='text' onChange={dataHandler} required />
                <input  name='id_proof'  type='file' onChange={dataHandler} required />
                <input  name='id_number' placeholder='id number' type='text'onChange={dataHandler} required />
                <input  name='address' placeholder='address' type='textarea' onChange={dataHandler} required />
                <input   type='submit' />
                </form>
    {modalOpen&&<OtpModalForVerification  sid={sid} />}
    </div>
  )
}

export default TheatreOwnerRegistration