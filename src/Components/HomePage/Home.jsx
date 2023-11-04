import React,{ useState } from 'react';
import './SigninPage.css'
import TheatreLoginModal from '../Theatre_dashboard/TheatreLoginModal';
import { Button } from '@mui/material';
import Swal from 'sweetalert2'


const Home = () => {
  const [theatreLogin,SetTheatreLogin] = useState(false)
  const theatreModal = ()=>{
    SetTheatreLogin(true)
   
  }

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
