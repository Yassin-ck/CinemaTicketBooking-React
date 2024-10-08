import React, { useContext, useEffect, useState } from 'react';
import {
  MDBBtn,
  MDBIcon,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
} from 'mdb-react-ui-kit';
import EmailAuthModal from '../../Authetntication/EmailAuthentication/EmailAuthModal'
import { Button } from '@mui/material';
import { AuthContext } from '../../../context/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';

const SignInPage = ({modal,setModalOpen}) => {
  const {auth} = useParams()
  const navigate = useNavigate()
  const {user} = useContext(AuthContext)
  const [updationModal,setUpdationModal] = useState(false)
const [basicModal, setBasicModal ] = useState(true)
const [signIn,setSignIn] = useState(false)
const toggleShow = () => {
    setBasicModal(!basicModal);
    if (!auth){
      setModalOpen(false)
    }
    if (auth){
      console.log('ko');
      navigate('/view')
    }
}


console.log(basicModal);

const signInOpenTrigger = ()=>{
  setSignIn(true)
}

useEffect(() => {
 if (auth){
  setUpdationModal(true)
  setSignIn(true)
 }
}, [])

return (
  <>
  <MDBModal show={basicModal} className='AuthandEditEmailModal'  tabIndex='-1'   > 
  <div  >
  
  <MDBModalDialog  style={{position:'relative',maxWidth:'425px',color:'black',paddingTop:'100px',height:'100vh'}}  >
  <MDBModalContent>
  <MDBBtn onClick={toggleShow} className='btn-close' color='none' style={{position:'absolute',zIndex:'1',right:'10px',top:'10px',cursor:'pointer'}} ></MDBBtn>
          <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'70vh',position:'relative'}}>
              { updationModal?
 
 <EmailAuthModal auth={'auth'} />
 
        :signIn?<EmailAuthModal setModalOpen={setModalOpen} />:
        <div className='EmailAuthButtonInSignInPage'>
        
        <Button onClick={signInOpenTrigger} variant='outlined' className="social-auth-button">
        <MDBIcon far icon="envelope" size='lg' style={{position: 'absolute',left: '15px'}} />
        <span  >Continue with Email</span>
        </Button>
        
        </div>
         
      }
      </div>
              
            </MDBModalContent>
          </MDBModalDialog>
          </div>

        </MDBModal>
    
    </>
  )
}

export default SignInPage 











