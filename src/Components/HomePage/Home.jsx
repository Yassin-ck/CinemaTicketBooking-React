import React, { useState } from 'react';


import SignInPage from './SignInPage';
import TheatreLoginModal from '../Theatre_dashboard/TheatreLoginModal';
import Button from '@mui/material/Button';



const Home = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [theatreLogin,SetTheatreLogin] = useState(false)

  const openModal = () => {
    setModalOpen(true);
  };

  const theatreModal = ()=>{
    SetTheatreLogin(true)
  }

  return (
    <>
  
    

      {modalOpen ? (
        <SignInPage />
      ):
      <Button variant='contained' onClick={openModal}>Sign in</Button>
    }
      {theatreLogin ? (
        <TheatreLoginModal />
      ):
      <Button variant='contained' onClick={theatreModal}>TheatreLogin</Button>
    }
    </>
  );
}

export default Home;
