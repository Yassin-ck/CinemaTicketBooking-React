import axios from 'axios'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../../context/authcontext'
import OtpModalForVerification from '../Modals/OtpModalForVerification'
import './TheatreOwnerRegistration.css'

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
                <div className='MainDivContainerForTheatreOwnerRegistration'>
                    <div className="InlineInputDivInTheatreOwnerRegistration">

                        <div class="inputForTheatreOwnerRegistraionDiv">
                            <input  name='first_name' type='text' onChange={dataHandler} required />
                            <label for="first_name" >first name</label>
                        </div>
                        <div class="inputForTheatreOwnerRegistraionDiv">
                            <input  name='last_name' type='text' onChange={dataHandler} required />
                            <label for="last_name">last name</label>
                        </div>
                    </div>
                    <div className="InputDivInTheatreOwnerRegistration">

                <div class="inputForTheatreOwnerRegistraionDiv">
                    <input  name='email' type='email' onChange={dataHandler} required />
                    <label for="email" >email</label>
                </div>
                </div>
                <div className="InlineInputDivInTheatreOwnerRegistration">
                <div class="inputForTheatreOwnerRegistraionDiv">
                    <input  name='phone'  type='text' onChange={dataHandler} required />
                    <label for="phone">Mobile Number</label>
                </div>
                <div class="inputForTheatreOwnerRegistraionDiv">
                    <input  name='alternative_contact'  type='text' onChange={dataHandler} required />
                    <label for="alternative_contact" >Alternative contact</label>
                </div>
            </div>
            <div className="InlineInputDivInTheatreOwnerRegistration">
                <div class="inputForTheatreOwnerRegistraionDiv">
                    <input  name='id_proof'  type='file' onChange={dataHandler} required />
                    <label for="id_proof" >Id proof</label>
                </div>
                <div class="inputForTheatreOwnerRegistraionDiv">
                    <input  name='id_number' type='text'onChange={dataHandler} required />
                    <label for="id_number">Id number</label>
                </div>
                </div>
                <div className="InputDivInTheatreOwnerRegistration">

                <div class="inputForTheatreOwnerRegistraionDiv">
                    <input  name='address' type='text' onChange={dataHandler} required />
                    <label for="address" >Address</label>
                </div>
                </div>
                <input   type='submit' />
                </div>
                </form>
    {modalOpen&&<OtpModalForVerification  sid={sid} />}
    </div>
  )
}

export default TheatreOwnerRegistration