import React, { useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { AuthContext } from '../../context/authcontext'
import { useNavigate } from 'react-router-dom'
import { BsCameraFill } from 'react-icons/bs'
import './UserProfileCrud.css'
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBCardHeader,
  
}
from 'mdb-react-ui-kit';
import { MdOutlineModeEditOutline } from 'react-icons/md'
import { Button } from '@mui/material'


const UserProfileEdit = () => {
    
    const [submitButton,setSubmitButton] = useState(false)
    const navigate = useNavigate()
    const { authToken,user,getView,setGetView } = useContext(AuthContext)
    const inputRef = useRef()
    const UserProfileForm = async (e)=>{
      console.log(e,'jj');
        e?.preventDefault()
        const response = await axios({
            method: !e?'GET':'PUT', 
            url: `${import.meta.env.VITE_URL_SERVER}/userprofile/`,
            headers: {
                "Authorization": `Bearer ${authToken.access}`
            },
           data:
            e?{
                user:{username : inputRef.current.username.value},
                first_name : inputRef.current.first_name.value,
                last_name : inputRef.current.last_name.value,
                address : inputRef.current.address.value
                
            }:null
        });

        const data = response.data
        if (response.status == 200 & !e) {
            setGetView([data])
        }
    }
    
    useEffect(() => {
      UserProfileForm()
    }, [])
    
    const auth = 'auth'
    
    console.log(getView.user);

  return (
      <div >
      <form onSubmit={(e) =>UserProfileForm(e)} ref={inputRef} onChange={()=>setSubmitButton(true)}  style={{height:'130vh',background:'linear-gradient(45deg,#fefefe,lightgrey)'}} >
      {getView&&getView.map((item)=>(
          
          <div key={item.userprofile.user_id}>
        <MDBContainer className='pb-5 mb-5'>
          <MDBRow className='d-flex justify-content-center align-items-center' style={{ borderRadius: '20px' }}>
            <MDBCol lg='6'>
           
              <MDBCard className='mt-5  rounded-1' style={{ maxWidth: '700px',borderStyle:'none' }}>
                <MDBCardHeader style={{ position: 'relative', height: '15vh', background: 'linear-gradient(45deg, #10451D, #4AD66D)' }}>
                  <div style={{cursor:'pointer', maxWidth: '15rem', color: '#fff', position: 'absolute', top: '35px', left: '55px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div className="rounded-circle me-3" style={{ width: '100px', height: '100px', backgroundColor: '#fff', border: '2px solid lightgrey' }}>
                      <div style={{ position: 'absolute', left: '33px', top: '22px' }}>
                        <BsCameraFill color='lightgrey' size={34} />
                        <p style={{ fontSize: '12px', color: 'grey' }}>+Add</p>
                      </div>
                    </div>
                    <h4>{item.user.username}</h4>
                  </div>
                </MDBCardHeader>
                <MDBCardBody className='px-5'>
                  <h5 className="mb-4 mt-4 pb-2 pb-md-0 md-5 px-md-2">Account Details</h5>
                  <div>
                 

                    <div  style={{ marginBottom: '2rem', paddingLeft: '.6rem', position: 'relative' }}>
                    Email address<span style={{ paddingLeft: '3rem' }}>{item.user.email} <small style={{width:'100%',background:'#B7EFC5',fontSize:'12px',padding:'0px 3px'}}>Verified</small></span>
                    <span onClick={() => navigate(`/useremailupdation/${auth}`)} style={{cursor:'pointer', color: 'rgb(199, 75, 75)', position: 'absolute', right: '2rem' }}>
                    <MdOutlineModeEditOutline  />
                    <span  style={{ paddingLeft: '5px', fontSize: '14px' }}  >Edit</span>
                    </span>
                    </div>
                  
                   {
                    item.userprofile.phone?
                    <div style={{ marginBottom: '2rem', paddingLeft: '.6rem', position: 'relative' }}>
                    Phone<span style={{ paddingLeft: '6.2rem' }}>{item.userprofile.phone} <small style={{width:'100%',background:'#B7EFC5',fontSize:'12px',padding:'0px 3px'}}>Verified</small></span>
                    <span onClick={() => navigate('/view/phone')} style={{cursor:'pointer', color: 'rgb(199, 75, 75)', position: 'absolute', right: '2rem' }}>
                    <MdOutlineModeEditOutline />
                    <span style={{ paddingLeft: '5px', fontSize: '14px' }}>Edit</span>
                    </span>
                    </div>
                 : <div className='d-flex justify-content-between' style={{ cursor:'pointer',marginBottom: '2rem', paddingLeft: '.6rem', position: 'relative' }}>
                 <span>Mobile Number</span>
                 <div  onClick={() => navigate('/view/phone')}
                 style={{backgroundColor:'#ffd580',width:'25rem',height:'50px',paddingLeft:'1rem',}}>
                 <h6 style={{fontFamily:'sans-serif',margin:'1px',color:'red' }}>+ Add Mobile Number</h6><small style={{fontFamily:'sans-serif'}}>
                 Get a copy of the tickets on WhatsApp/SMS</small></div>                    
                 </div> } 
                  </div>
                </MDBCardBody>
              </MDBCard>
              <MDBCard className='mt-3  rounded-1' style={{ maxWidth: '700px',borderStyle:'none' }}>
                <MDBCardBody className='px-5 pb-5'>
                  <h5 className=" mt-4 md-0 md-5 ps-2 md-2" style={{ maxWidth: '9.68rem' }}>Personal Details</h5>
                  <div className='ProfileCrudFormMainDiv'>
                    <div className='ProfileCrudFormInputDiv'>
                      <label>Username</label>
                      <input name='username' placeholder='Username' type='text' defaultValue={item && item.user.username} required />
                    </div>
                    <div className='ProfileCrudFormInputDiv'>
                      <label>First Name</label>
                      <input name='first_name' placeholder='First Name' type='text' defaultValue={item && item.userprofile.first_name} />
                    </div>
                    <div className='ProfileCrudFormInputDiv'>
                      <label>Last Name</label>
                      <input name='last_name' placeholder='Last Name' type='text' defaultValue={item && item.userprofile.last_name} />
                    </div>
                    <div className='ProfileCrudFormInputDiv'>
                      <label>Address</label>
                      <input name='address' placeholder='Address' type='text' defaultValue={item && item.userprofile.address} />
                    </div>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
          </MDBContainer>
          {submitButton&&
            <center style={{ position: 'sticky', bottom: '0px', width: '100%', height: '7vh', background: ' rgb(255, 255, 255)',boxShadow:'box-shadow: rgba(0, 0, 0, 0.16) 0px 1p'}}>
            <Button type='submit' style={{ background: '#10451D', marginTop: '10px', color: '#fff', width: '300px' }}>Save Changes</Button>
            </center>
          }    

          
          </div>
          ))}
          </form>
</div>
);
}

export default UserProfileEdit;
