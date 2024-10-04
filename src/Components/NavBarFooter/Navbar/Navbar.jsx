import React, { useContext, useEffect, useState } from 'react';
import SignInPage from '../../HomePage/SignInPages/SignInPage'
import {
  MDBContainer,
  MDBNavbar,
  MDBBtn,
  MDBInputGroup
} from 'mdb-react-ui-kit';
import './Navbar.css'
import { AuthContext } from '../../../context/authcontext';
import {  AiOutlineSearch} from "react-icons/ai";
import { IoIosArrowDown } from "react-icons/io";
import Sidebar from '../../HomePage/SideBar/Sidebar';
import { useNavigate } from 'react-router-dom';
import LocationModal from '../../HomePage/Location/LocationModal'
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { movieListing } from '../../../Redux/Slices/movieSlice';
import WebLogo from '../../../images/show-my-ticket-high-resolution-logo-transparent.png'


const Navbar =()=> {
const {user, myLocation} = useContext(AuthContext)
const [optSmModal, setOptSmModal] = useState(false);
const [modalOpen,setModalOpen] = useState(false)
const dispatch = useDispatch()
const navigate = useNavigate()
  const openModal = () => {
    setModalOpen(true);
  };
  const openLocationModal = ()=>{
    setOptSmModal(!optSmModal)
  }
  useEffect(() => {
    if (!localStorage.getItem('myLocation')){
      setOptSmModal(true)
    }
  }, [])
  const movieSearchedDataFetching = async (e)=>{  
    try{
      const response = await axios.get(`${import.meta.env.VITE_URL_SERVER}/user/search/?q=${e.trim()}`)
      const data = response.data
      if (response.status==200){
        console.log(data);
        dispatch(movieListing(data))
        navigate('/movies/list')
      }
    }catch(error){
      console.error(error);
    }
  }
  const searchMovieInputHandler = (e)=>{
    let SearchValue = e.target.value
    if (SearchValue.trim() !== ""){
      movieSearchedDataFetching(SearchValue)
  }else{
    dispatch(movieListing([]))
    navigate('/')
  }}
  
  return (
    <>
    <MDBNavbar className='NavbarMain'>
    <MDBContainer className='NavbarMainContainer'>
    <div className='navbarBookmyshowInputDiv' style={{display:'flex',alignItems:'center',width:'40rem'}}>
    <div className='BookMySHow'>
    <img  style={{cursor:'pointer'}} onClick={()=>navigate('/')} src={WebLogo} height={30}  alt='pic' />
    </div>
    <div style={{width:'100%'}} className='navbarInputMainDiv'>
    <MDBInputGroup style={{top:'10px'}}  className='d-flex w-auto mb-3 navbarsearchbar'>
    <input
    onChange={e=>searchMovieInputHandler(e)}
    className='form-control '
    placeholder='Search'
    style={{  paddingLeft:'40px',borderRadius:'3px'}}
    />
    <AiOutlineSearch  style={{ margin: 'auto', fontSize: '23px',color:'grey',position:'absolute',top:'6px',left:'12px'}} />
    </MDBInputGroup>
    </div>
        </div>
        <div >
        {modalOpen ?
          <>
          <SignInPage setModalOpen={setModalOpen} trigger={'open'} />
          <div className='LocationNavbarUnauthorizedMainDiv'>
          <div className='LocationNavbarUnauthorized' onClick={openLocationModal} >
          <p >{myLocation?myLocation:'Select your ...'}</p>
          <IoIosArrowDown size={13} style={{margin:'7px 0px 0px 6px'}} />
          </div>
          <MDBBtn  size='sm' className='SiginButtonStyles' >Sign in</MDBBtn>
          </div>
          </>
          :
          !user?
          <>
          <div className='LocationNavbarUnauthorizedMainDiv'>
          <div className='LocationNavbarUnauthorized' onClick={openLocationModal} >
          <p>{myLocation?myLocation:'Select your ...'}</p>
          <IoIosArrowDown size={13} style={{margin:'7px 0px 0px 6px',}} />
          </div>
          <MDBBtn  size='sm' className='SiginButtonStyles' onClick={openModal}  >Sign in</MDBBtn>
          </div>
          </>

          :<div className='profileSidebarIconClassMain'>
          <div className='LocationNavbar' onClick={openLocationModal} >
          <p>{myLocation?myLocation:'Select your ...'}</p>
          <IoIosArrowDown size={13} style={{margin:'7px 0px 0px 6px',}} />
          </div>
          <div className='profileSidebarIconClass' style={{display:'flex',alignItems:'center',width:'7rem',justifyContent:'space-between'}}><h2><Sidebar  /></h2> {user.username? <h5 >{user.username}</h5>:<h5> Guest</h5>}
          </div></div>
          
          
        }

        {optSmModal&&<LocationModal  optSmModal={optSmModal} setOptSmModal={setOptSmModal} />}
        </div>
        </MDBContainer>
        </MDBNavbar>
        
      
        </>
  );
}

export default Navbar;