import React, { useContext,useRef } from 'react' 
import { AuthContext } from '../AuthContext/authcontext'
import axios  from 'axios'

const UserEmailAuthentication = () => {
const inputRef = useRef(null)

const UserEmailAuthPost = async (e) => {
    e?.preventDefault()
    const response = await axios.post(`${import.meta.env.VITE_URL_SERVER}email/`,{
        email: inputRef.current.email.value
});
    console.log(response);
    const data = response.data;
    console.log(data);
}
  return (
    <>
    <form onSubmit={UserEmailAuthPost} ref={inputRef}>
        <input name='email' type='email'  />
        <input  type='submit'  />
    </form>
    </>
  )
}

export default UserEmailAuthentication;