import React,{ useState, useEffect, useContext } from 'react';
import './SignInPages/SigninPage.css'
import TheatreLoginModal from '../Theatre_dashboard/Theatre_Pages/Theatre_AccountsAndAuthentications/TheatreLoginModal';
import { Button } from '@mui/material';





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
