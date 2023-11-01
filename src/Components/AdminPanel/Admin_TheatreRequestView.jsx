import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/authcontext'
import { useNavigate } from 'react-router-dom'

const Admin_TheatreRequestView = () => {
    const [theatreDetials,SetTheatreDetails] = useState([])
    const { authToken } = useContext(AuthContext)
    const navigate = useNavigate()
        const TheatreRequestFetch = async ()=>{
            try{

                const response = await axios.get(
                    `${import.meta.env.VITE_URL_SERVER}/admin_panel/theatre/`,
                    {
                        headers:{
                            'Authorization':`Bearer ${authToken.access}`
                        }
                    }
                    )
                    const data = response.data
                    if (response.status==200){
                        SetTheatreDetails(data)
                    }
                }catch(error){
                    console.error(error);
                }
        }

useEffect(() => {
    TheatreRequestFetch()
}, [])

console.log(theatreDetials);
    
  return (
    <>
    {theatreDetials&&theatreDetials.map((item)=>(
        <div key={item.id} onClick={()=>navigate(`${item.id}`)}>
      
        <h1>{item.id}</h1>
        <h1>{item.theatre_name}</h1>
        <h1>{item.email}</h1>
  
        </div>
    ))}
    
    </>
  )
}

export default Admin_TheatreRequestView