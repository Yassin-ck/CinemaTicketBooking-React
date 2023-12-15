import React, { useState,useContext, useEffect } from 'react'
import MobilePhoneUpdation from './MobilePhoneUpdation'
import MobileOtpView from './MobileOtpView'
import '../../HomePage/SignInPages/SigninPage.css'
import {
  MDBBtn,
  MDBIcon,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,

} from 'mdb-react-ui-kit';
import { AuthContext } from '../../../context/authcontext';
import { useNavigate } from 'react-router-dom';

const MobileUpdationModal = () => {
const [phone,setPhone] = useState()
const [PhoneView,setPhoneView] = useState(true)
const [phoneModal,setPhoneModal] =  useState(true)
const navigate = useNavigate()


const toggleShow = () => {

  setPhoneModal(!phoneModal)
  navigate('/view')

}
const phoneClickHandler = (e)=>{
  setPhone({phone:e})
    setPhoneView(false)
}


  return (
      
      <div>
      <MDBModal show={phoneModal}  tabIndex='-1'   > 
      <div  >
      
      <MDBModalDialog  style={{position:'relative',maxWidth:'425px',color:'black',paddingTop:'100px',height:'100vh'}}  >
      <MDBModalContent>
      <MDBBtn onClick={toggleShow} className='btn-close' color='none' style={{position:'absolute',zIndex:'1',right:'10px',top:'10px',cursor:'pointer'}} ></MDBBtn>
              <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'70vh',position:'relative'}}>
              
              { PhoneView ?
                <div className='EmailAuthButtonInSignInPage'>


                < MobilePhoneUpdation   byClick={(e)=>phoneClickHandler(e)} />
                </div>

                :
                < MobileOtpView   phone={phone.phone}  />
        
            

          }
          </div>
              
          </MDBModalContent>
        </MDBModalDialog>
        </div>

      </MDBModal>
    
    </div>
  )
}

export default MobileUpdationModal


  