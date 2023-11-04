import React, { useContext, useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { AuthContext } from '../../context/authcontext'
import { useNavigate } from 'react-router-dom'
import { BsCameraFill } from 'react-icons/bs'
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBCardHeader,
  
}
from 'mdb-react-ui-kit';


const UserProfileEdit = () => {
    const [getView,setGetView] = useState()
    const [emailModal,setEmailModal] = useState(false)
    const navigate = useNavigate()
    const { authToken,user } = useContext(AuthContext)
    const inputRef = useRef()
    const UserProfileForm = async (e)=>{
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
            console.log(data);
        }else if (response.status=200 & e){
          console.log(data);
        }
    }


useEffect(() => {
  UserProfileForm()
}, [])

const auth = 'auth'


  return (
      <>
      {getView&&getView.map((item)=>(
          
          <div key={item.userprofile.user_id}>
          <form ref={inputRef} onSubmit={e=>UserProfileForm(e)}>
          <input name='username' placeholder='username' type='text' defaultValue={item&&item.user.username} required />
            <p onClick={()=>navigate('/view/phone')}>Click Here To update Your Mobile Phone</p>
            <p onClick={()=>navigate(`/useremailupdation/${auth}`)}>Click Here To update Your Email </p>
          <input name='first_name' placeholder='first_name' type='text' defaultValue={item&&item.userprofile.first_name} />
          <input name='last_name' placeholder='last_name' type='text' defaultValue={item&&item.userprofile.last_name} />
          <input name='address' placeholder='address' type='text' defaultValue={item&&item.userprofile.address}  />
          <input  type='submit' />
          </form>


    <MDBContainer >

      <MDBRow className='d-flex justify-content-center align-items-center' style={{borderRadius:'2opx'}}>

        <MDBCol lg='6'  >

          <MDBCard className='my-5 rounded-1' style={{maxWidth: '600px'}}>
          <MDBCardHeader style={{position:'relative',height:'15vh',background:'linear-gradient(45deg,#10451D,#4AD66D)'}}>
          <div style={{maxWidth:'15rem',color:'#fff',position:'absolute',top:'35px',left:'55px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
          <div className="rounded-circle me-3" style={{width:'100px',height:'100px',backgroundColor:'#fff',border:'2px solid lightgrey'}}>
          <div style={{position:'absolute',left:'33px',top:'22px'}}>
          <BsCameraFill color='lightgrey' size={34} />
          <p style={{fontSize:'12px',color:'grey'}}>+Add</p>
          </div>
          </div>
          <h4 >
        {user.username}
          </h4>
          </div>
          </MDBCardHeader>
            <MDBCardBody className='px-5'>

              <h5 className="mb-4 mt-4 pb-2 pb-md-0 md-5 px-md-2">Account Details</h5>
              <p>Click to Add Your Number</p>
              <MDBRow>
              
              <MDBInput wrapperClass='mb-4' label='Name' id='form1' type='text'/>
                <MDBCol md='6'>
                  <MDBInput wrapperClass='datepicker mb-4' label='Select a date' id='form2' type='text'/>
                </MDBCol>

                <MDBCol md='6' className='mb-4'>
                  
                </MDBCol>

              </MDBRow>

              

              <MDBRow>
                <MDBCol md='6'>
                  <MDBInput wrapperClass='mb-4' label='Registration code' id='form3' type='text'/>
                </MDBCol>
              </MDBRow>

              <MDBBtn color='success' className='mb-4' size='lg'>Submit</MDBBtn>

            </MDBCardBody>
          </MDBCard>

        </MDBCol>
      </MDBRow>

    </MDBContainer>



          </div>
          ))
        }
        </>
  )
}

export default UserProfileEdit