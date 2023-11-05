import React, { useState,useContext, useEffect } from 'react'
import MobilePhoneUpdation from './MobilePhoneUpdation'
import MobileOtpView from './MobileOtpView'
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
import { AuthContext } from '../../context/authcontext';
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
const phoneClickHandler = (e)=>{
    setSid(e.sid)
    setPhoneView(false)
}
useEffect(() => {
  setBasicModal(true)
}, [])


  return (
      
      <div>
      <MDBModal show={basicModal}  tabIndex='-1'  >
      <div onClick={(e) => e.stopPropagation()}>

        <MDBModalDialog style={{position:'relative'}} >
          <MDBModalContent >
            <MDBModalHeader>
              <MDBModalTitle>Modal title</MDBModalTitle>
              
              <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody >Modal body text goes here.</MDBModalBody>
            
              { PhoneView ?
                < MobilePhoneUpdation   byClick={e=>phoneClickHandler(e)} />
                :
                < MobileOtpView  sid={sid} />
        
            

          }
            <MDBModalFooter style={{height:'400px'}}>

            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
        </div>

      </MDBModal>
    
    </div>
  )
}

export default MobileUpdationModal