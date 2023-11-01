import axios from 'axios';
import React, { useContext } from 'react'
import { AuthContext } from '../../../context/authcontext';

const Admin_TheatreOwnerVerificationModals = ({...id}) => {
    
const { authToken } = useContext(AuthContext)

const verificationConfirm = async (e,id)=>{
console.log(id);
    try{
        const response = await axios.put(
           id.owner_id? `${import.meta.env.VITE_URL_SERVER}/admin_panel/theatreowner/${id.owner_id}/`:
           `${import.meta.env.VITE_URL_SERVER}/admin_panel/theatre/${id.theatre_id}/`
           ,
            {
                is_approved:e
            },
            {
                headers:{
                    'Authorization':`Bearer ${authToken.access}`
                }
            }
            )
            const data = response.data
            console.log(data);
            if (response.status==200){
                console.log(data);
            }
        }catch(error){
            console.error(error);
        }
}


  return (
    <div>
    Are you sure ??
    <button onClick={()=>verificationConfirm(true,id)}>Yes</button>
    <button onClick={()=>verificationConfirm(false,id)}>No</button>
    </div>
  )
}

export default Admin_TheatreOwnerVerificationModals