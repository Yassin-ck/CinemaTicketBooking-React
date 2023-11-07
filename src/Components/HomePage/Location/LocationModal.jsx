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
import { IoAddSharp } from 'react-icons/io5'
export default function LocationModal({optSmModal,setOptSmModal}) {
  
   const [locationFetched,setLocationFetched] = useState([])
    const GetCurrentLocation = async ()=>{
        const response = await axios.get(`${import.meta.env.VITE_URL_SERVER}/currentlocation/`
        )
        const data = response.data
        if (response.status==200){
            console.log(data);
            localStorage.setItem('myLocation',JSON.stringify(data))
            window.location.reload()
        }
    }
    const searchForNewLocation = async (e)=>{
        
        try{
            
            const response = await axios.get(`${import.meta.env.VITE_URL_SERVER}/theatre/searchlocation/?q=${e}`,
            )
            const data = response.data;
            setLocationFetched()
            if (response.status === 200) {
                data.map(item => {
                    const newItem =[]; 
                    if (item.district.toLowerCase().includes(e.toLowerCase())) {
                        newItem.push(item.district)
                    }
                    if (item.place.toLowerCase().includes(e.toLowerCase())) {
                        newItem.push(item.place)
                    }

                    setLocationFetched(newItem);
                });
            }                   
        }catch(error){
            setLocationFetched()
        }
    }
    
    const locationSearched = (e)=>{
        localStorage.setItem('myLocation',JSON.stringify(e))
        window.location.reload()
        
    }
    const getSearchLocation = (e)=>{
        searchForNewLocation(e.target.value)
    }
  return (
    <>

<MDBModal show={optSmModal} tabIndex='-1' setShow={setOptSmModal}   >

<MDBModalDialog size='lg' onClick={e => e.stopPropagation()}>
<MDBModalContent className='ModalContentForLocation' style={{borderRadius:'0px'}} >
<MDBModalHeader className='ModalHeaderForLocation'>
<div  className='ModalSearchDivForLocation' >
<TfiSearch size={14} color='grey' style={{position:'absolute',top:'30px',left:'28px'}} />
<input onChange={e=>getSearchLocation(e)}  placeholder='search your city here' />
{locationFetched &&
    locationFetched.map(item => (
        
      <input
        type='submit'
        className='SearchShowingBoxForLocation'
        onClick={e=>locationSearched(item)}
        value={
          item
        }
      />
    ))}
  
  
  
  
{!locationFetched&&<div className='AddNewLocationRequestButton'>
<IoAddSharp size={20} style={{color:'green'}} />
</div>}
            </div>
            <div className='HeaderTitleNameTag' onClick={GetCurrentLocation}>
            {(locationFetched === undefined || (locationFetched !== undefined && locationFetched.length === 0)) && (
                <>
                  <MdLocationSearching style={{ marginTop: '3px' }} />
                  <p>Detect my location</p>
                </>
              )}
            </div>
            </MDBModalHeader>
            <MDBModalBody>...</MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}