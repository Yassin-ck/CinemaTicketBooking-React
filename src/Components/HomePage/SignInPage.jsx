import React, { useState } from 'react'
import EmailAuthModal from '../EmailAuthentication/EmailAuthModal'

const SignInPage = () => {
const [signIn,setSignIn] = useState(false)

const signInOpenTrigger = ()=>{
    setSignIn(true)
}
  return (
    <>
    {signIn ?

        <EmailAuthModal />
:
<button onClick={signInOpenTrigger}>Email Authentication</button>
    }
    </>
  )
}

export default SignInPage