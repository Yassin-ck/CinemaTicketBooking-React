import React, { useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { AuthContext } from '../../context/authcontext'
import MobileUpdationModal from './MobileUpdationModal'
import { useNavigate } from 'react-router-dom'

const UserProfileEdit = () => {
    const [getView,setGetView] = useState([])
    const navigate = useNavigate()
    const { authToken } = useContext(AuthContext)
    const inputRef = useRef()
    const UserProfileForm = async (e)=>{
        e?.preventDefault()
        const response = await axios({
            method: !e?'GET':'POST', 
            url: `${import.meta.env.VITE_URL_SERVER}userprofile/`,
            headers: {
                "Authorization": `Bearer ${authToken.access}`
            },
           data:
            e?{
                username : inputRef.current.username.value,
                email : inputRef.current.email.value,
                first_name : inputRef.current.first_name.value,
                last_name : inputRef.current.last_name.value,
                address : inputRef.current.address.value
                
            }:null
        });

        const data = response.data
        if (response.status == 200) {
            setGetView([data])
            console.log(data);
        }
    }

useEffect(() => {
  UserProfileForm()
}, [])




  return (
      <>
      {getView.map((item)=>(
          
          <div key={item.userprofile.user_id}>
          <form ref={inputRef} onSubmit={e=>UserProfileForm(e)}>
          <input name='username' placeholder='username' type='text' defaultValue={item&&item.user.username} />
            <p onClick={()=>navigate('/view/phone')}>Click Here To update Your Mobile Phone</p>
          <input name='email' placeholder='email' type='email' defaultValue={item&&item.user.email} />
          <input name='first_name' placeholder='first_name' type='text' defaultValue={item&&item.userprofile.first_name} />
          <input name='last_name' placeholder='last_name' type='text' defaultValue={item&&item.userprofile.last_name} />
          <input name='address' placeholder='address' type='text' defaultValue={item&&item.userprofile.address}  />
          <input  type='submit' />
          </form>
          </div>
          ))
        }
        </>
  )
}

export default UserProfileEdit