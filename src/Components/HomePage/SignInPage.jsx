import React, { useContext, useEffect, useState } from 'react';
import {
  MDBBtn,
  MDBIcon,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from 'mdb-react-ui-kit';
import EmailAuthModal from '../EmailAuthentication/EmailAuthModal'
import { Button } from '@mui/material';
import { AuthContext } from '../../context/authcontext';

const SignInPage = ({modal}) => {
const { basicModal, setBasicModal,setModalOpen } = useContext(AuthContext)
const [signIn,setSignIn] = useState(false)
const toggleShow = () => {

    setBasicModal(!basicModal);
    setModalOpen(false)
}
useEffect(() => {
  if (!basicModal){

    setBasicModal(true)
  }
}, [modal])


const signInOpenTrigger = ()=>{
  setSignIn(true)
}


return (
  <>
  
        <MDBModal show={basicModal}  tabIndex='-1'  >
        <div onClick={(e) => e.stopPropagation()}>

          <MDBModalDialog style={{position:'relative'}} >
            <MDBModalContent >
              <MDBModalHeader>
                <MDBModalTitle>Modal title</MDBModalTitle>
                
                <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody >Modal body text goes here.</MDBModalBody>
              {signIn ?

                <EmailAuthModal />
        :
        <div className='EmailAuthButtonInSignInPage'>
       
        <Button onClick={signInOpenTrigger} variant='outlined' className="social-auth-button">
  <div className="button-content">
    <MDBIcon far icon="envelope" size='lg' style={{marginRight:'80px'}} />
    <span style={{marginRight:"100px"}} >Continue with Email</span>
  </div>
</Button>

        </div>

            }
              <MDBModalFooter style={{height:'400px'}}>
 
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
          </div>

        </MDBModal>
    
    </>
  )
}

export default SignInPage

  