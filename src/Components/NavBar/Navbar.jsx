import React, { useContext } from 'react';
import SignInPage from '../HomePage/SignInPage'
import {
  MDBContainer,
  MDBNavbar,
  MDBBtn,
  MDBInputGroup
} from 'mdb-react-ui-kit';
import './Navbar.css'
import { AuthContext } from '../../context/authcontext';
import { AiOutlineSearch } from "react-icons/ai";
import Sidebar from '../HomePage/Sidebar';


export default function Navbar() {
const {modalOpen,setModalOpen,user } = useContext(AuthContext)
  const openModal = () => {
    setModalOpen(true);
  };
 
  return (
    <>
    <MDBNavbar className='NavbarMain'>
    <MDBContainer>
        <MDBInputGroup style={{marginTop:'7px',position:'relative'}}  className='d-flex w-auto mb-3 navbarsearchbar'>
        <input
        className='form-control'
        placeholder='Search'
        style={{ width: '100%' ,paddingLeft:'40px',borderStyle:'hidden',borderRadius:'0px',paddingRight:'200px'}}
        />
        <AiOutlineSearch  style={{ margin: 'auto', fontSize: '23px',color:'grey',position:'absolute',top:'6px',left:'12px'}} />
        </MDBInputGroup>
        {modalOpen ?
          <SignInPage  trigger={'open'} />
          :
          !user?
          
          <MDBBtn  size='sm' color='dark'  onClick={openModal}>Sign in</MDBBtn>
          :<h2><Sidebar  /></h2>
          

    }
        </MDBContainer>
        </MDBNavbar>
        
      
        </>
  );
}