import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios'
import { AuthContext } from '../../../../context/authcontext'


const Admin_UserProfileView = () => {
    
    const { authToken } = useContext(AuthContext)
    console.log(authToken);
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
            console.warn(data);            
            setPages(Array.from({ length: data.page_number }, (_,index) => index + 1));
            setIsValid(true)
        }else{
            console.error(data);
        }
    }    

useEffect(() =>{ 
getUserProfile(1)
}, [])
console.log(userData);
console.log(pages);

  return (
    <div>
    {setIsValid ? (
  userData.map((item) => (
    <div key={item.user_id}>
      <h1>{item.user_id}</h1>
      <h1>{item.user.email}</h1>
      <h1>{item.phone}</h1>
      <h1>{item.first_name}</h1>
      <h1>{item.last_name}</h1>
      </div>
      ))
      ) : null}     
      {pages.map((item)=>(
              <button onClick={e=>getUserProfile(item)} style={{margin:'10px',padding:"20px"}}>{item}</button>
          ))}         
    </div>
  )
}

export default Admin_UserProfileView