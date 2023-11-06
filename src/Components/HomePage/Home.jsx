import React,{ useState, useEffect, useContext } from 'react';
import './SigninPage.css'
import TheatreLoginModal from '../Theatre_dashboard/TheatreLoginModal';
import { Button } from '@mui/material';
import { AuthContext } from '../../context/authcontext';
import LocationModal from './LocationModal'




const Home = ({}) => {
  const [theatreLogin,SetTheatreLogin] = useState(false)
  const theatreModal = ()=>{
    SetTheatreLogin(true)
  }
 
  
console.log('hi');
  return (
    <>
    {theatreLogin ? (
      <TheatreLoginModal />
    ):
    <Button variant='outlined' onClick={theatreModal}>TheatreLogin</Button>
  }

    </>
  );
}

export default Home;
