import React, { useContext } from 'react'
import { AuthContext } from './context/AuthContext'
import { Navigate } from 'react-router-dom'

const PrivateRouter = ({children}) => {
    const { user } =useContext(AuthContext)
  return (
    <>
    {
        !user?<Navigate to='/' />:children
    }
    </>
  )
}

export default PrivateRouter