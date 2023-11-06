import React, { useContext, useState } from 'react';
import './LocationModal.css'
import { TfiSearch } from 'react-icons/tfi'
import { MdLocationSearching } from 'react-icons/md'
import axios from 'axios';
import {
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalBody
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';

export default function LocationModal({optSmModal,setOptSmModal}) {
    const navigate = useNavigate()
    const GetCurrentLocation = async ()=>{
        const response = await axios.get(`${import.meta.env.VITE_URL_SERVER}/currentlocation/`
        )
        const data = response.data
        if (response.status==200){
            localStorage.setItem('myLocation',JSON.stringify(data))
            window.location.reload()
        }
    }

  return (
    <>

<MDBModal show={optSmModal} tabIndex='-1' setShow={setOptSmModal}   >

<MDBModalDialog size='lg' onClick={e => e.stopPropagation()}>
<MDBModalContent className='ModalContentForLocation' style={{borderRadius:'0px'}} >
<MDBModalHeader className='ModalHeaderForLocation'>
<div  className='ModalSearchDivForLocation' >
<TfiSearch size={14} color='grey' style={{position:'absolute',top:'30px',left:'28px'}} />
<input placeholder='search your city here' />
            </div>
            <div className='HeaderTitleNameTag' onClick={GetCurrentLocation}>
            <MdLocationSearching  style={{marginTop:'3px'}} />
            <p>Detect my location</p>
            </div>
            </MDBModalHeader>
            <MDBModalBody>...</MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}