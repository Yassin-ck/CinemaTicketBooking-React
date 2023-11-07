import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { AuthContext } from '../../../../context/authcontext'


const Admin_UserProfileView = () => {
    
    const { authToken } = useContext(AuthContext)
    const [pages,setPages] = useState([])
    const [isValid,setIsValid] = useState(false)
    const [userData,setUserData] = useState([])
    const getUserProfile = async(number)=>{
        const response = await axios.get(
            `${import.meta.env.VITE_URL_SERVER}/admin_panel/users/?q=${number}`,
            {
                headers:{
                    'Authorization':`Bearer ${authToken.access}`
                }
            }
        )
        const data = response.data
        if (response.status == 200){
            setUserData(data.user)
            setPages(Array.from({ length: data.page_number }, (_,index) => index + 1));
            setIsValid(true)
        }else{
            console.error(data);
        }
    }    

useEffect(() =>{ 
getUserProfile(1)
}, [])


  return (
    <div>
    {setIsValid ? (
  userData.map((item) => (
    <div key={item.id.id}>
      <h1>{item.id.id}</h1>
      <h1>{item.id.email}</h1>
      <h1>{item.properties.phone}</h1>
      <h1>{item.properties.first_name}</h1>
      <h1>{item.properties.last_name}</h1>
      {pages.map((item)=>(
              <button onClick={e=>getUserProfile(item)}>{item}</button>
          ))}         
      </div>
      ))
      ) : null}     
    </div>
  )
}

export default Admin_UserProfileView