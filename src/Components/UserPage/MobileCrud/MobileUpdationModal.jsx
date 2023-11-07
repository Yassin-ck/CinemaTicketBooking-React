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
const [sid,setSid] = useState()
const [PhoneView,setPhoneView] = useState(true)
const { basicModal,setBasicModal } =  useContext(AuthContext)
const navigate = useNavigate()


const toggleShow = () => {

  setBasicModal(!basicModal)
  navigate('/view')

}
const phoneClickHandler = (e,e2)=>{
    setSid({sid:e.sid,phone:e2})
    setPhoneView(false)
}
useEffect(() => {
  setBasicModal(true)
}, [])

console.log(sid);
  return (
      
      <div>
      <MDBModal show={basicModal}  tabIndex='-1'   > 
      <div  >
      
      <MDBModalDialog  style={{position:'relative',maxWidth:'425px',color:'black',paddingTop:'100px',height:'100vh'}}  >
      <MDBModalContent>
      <MDBBtn onClick={toggleShow} className='btn-close' color='none' style={{position:'absolute',zIndex:'1',right:'10px',top:'10px',cursor:'pointer'}} ></MDBBtn>
              <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'70vh',position:'relative'}}>
              
              { PhoneView ?
                <div className='EmailAuthButtonInSignInPage'>


                < MobilePhoneUpdation   byClick={(e,e2)=>phoneClickHandler(e,e2)} />
                </div>

                :
                < MobileOtpView  sid={sid.sid} phone={sid.phone}  />
        
            

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


  