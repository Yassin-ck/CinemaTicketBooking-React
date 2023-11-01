import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { AuthContext } from '../../context/authcontext'
import { Link, useNavigate } from 'react-router-dom'

const Admin_TheatreOwnerRequest = () => {
    const [owner,setOwner] = useState([])
    const navigate = useNavigate()
    const { authToken } = useContext(AuthContext)
    const theatreOwnerRequestData = async()=>{
        try{
            const response = await axios.get(
                `${import.meta.env.VITE_URL_SERVER}/admin_panel/theatreowner/`,
                {
                    headers:{
                        'Authorization':`Bearer ${authToken.access}`
                    }
                }
                )
                const data = response.data
                if (response.status==200){
                    setOwner(data)
                }
            }catch(error){
                console.log(error)
            }
    }

useEffect(() => {
  theatreOwnerRequestData()
  
}, [])




  return (
    <div>
    {owner.map((item)=>(
        <div key={item.id}>
        <div onClick={()=>navigate(`${item.id}`)}>
        <p>{item.first_name}</p>
        <p>{item.id}</p>
        <p>{item.email}</p>
        <p>{item.phone}</p>
        <p>{item.id_number}</p>
        </div>
        </div>
        ))
    }

    </div>
  )
}

export default Admin_TheatreOwnerRequest