import './SignInPages/SigninPage.css'
import React,{ useState } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import UpcomingMoives from './HomePageContents/UpcomingMoives';
import './Homepage.css'
// import CarouselFadeExample from './Carousel';





const Home = ({}) => {
 
  return (
    <div className='mainHomeDiv'>
    <br/>
    
   <UpcomingMoives />

    </div>
  );
}

export default Home;
