import React, { useContext } from 'react'
import { AuthContext } from '../context/authcontext'
import { Navigate } from 'react-router-dom'

const PrivateRouter = ({children}) => {
    const { user } =useContext(AuthContext)
    console.log(children);
  return (
    <>
    {
        !user?<Navigate to='/' />:children
    }
    </>
  )
}

export default PrivateRouter