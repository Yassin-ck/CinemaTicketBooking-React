import axios from 'axios'
import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/authcontext'

const TheatreRegistration = () => {
    const { authToken } = useContext(AuthContext)
    const [theatreData,setTheatreData] = useState({
        theatre_name:'',
        email:'',
        phone:'',
        alternative_contact:'',
        num_of_screens:'',
        certification:null,
    })

    const dataHandler = (e)=>{
        if (e.target.name == 'certification'){
            setTheatreData({...theatreData,[e.target.name]:e.target.files[0]})
        }else{
            setTheatreData({...theatreData,[e.target.name]:e.target.value})
        }
    }


    const TheatreRegitrationPosting = async(e)=>{
        e.preventDefault()
        const formData = new FormData()
        formData.append('theatre_name',theatreData.theatre_name)
        formData.append('email',theatreData.email)
        formData.append('phone',theatreData.phone)
        formData.append('alternative_contact',theatreData.alternative_contact)
        formData.append('num_of_screens',theatreData.num_of_screens)
        formData.append('certification',theatreData.certification)
        try{

            const response = await axios.post(
                `${import.meta.env.VITE_URL_SERVER}/theatre/register/`,
                formData,
                {
                    headers:{
                        'Authorization':`Bearer ${authToken.access}`,
                        'Content-Type':'multipart/formdata'
                    }
                }
                
                )
                const data = response.data
                if (response.status==200){
                    console.log(data);
                }
            }catch(error){
                console.error(error);
            }

    }


  return (
    <div>
    <form onSubmit={TheatreRegitrationPosting} >
        <input  name='theatre_name' placeholder='theatrename' type='text' onChange={dataHandler} required />
        <input  name='email' placeholder='email' type='email' onChange={dataHandler} required />
        <input  name='phone' placeholder='phone' type='text' onChange={dataHandler} required />
        <input  name='alternative_contact' placeholder='alternative contact' type='text' onChange={dataHandler} required />
        <input  name='num_of_screens' placeholder='num_of_screens' type='text' onChange={dataHandler} required />
        <input  name='certification' placeholder='certification' type='file' onChange={dataHandler} required />
        <input   type='submit' />
    </form>
    </div>
  )
}

export default TheatreRegistration