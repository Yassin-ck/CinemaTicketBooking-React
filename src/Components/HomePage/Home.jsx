import React,{ useState, useEffect, useContext } from 'react';
import './SignInPages/SigninPage.css'
import TheatreLoginModal from '../Theatre_dashboard/Theatre_Pages/Theatre_AccountsAndAuthentications/TheatreLoginModal';
import { Button } from '@mui/material';
import { Link, NavLink, useNavigate } from 'react-router-dom';





const Home = ({}) => {
  const navigate  = useNavigate()
  const [theatreLogin,SetTheatreLogin] = useState(false)
  const theatreModal = ()=>{
    SetTheatreLogin(true)
  }
 const all = 'all'
  
console.log('hi');
  return (
    <>
    
    {theatreLogin ? (
      <TheatreLoginModal />
      ):
      <Button variant='outlined' onClick={theatreModal}>TheatreLogin</Button>
    }
    <br/>
    <NavLink as={Link} to={`/movies/${all}`}>Movies</NavLink>|
    <NavLink as={Link} to={'/talkies/all'}>Theatres</NavLink>

    </>
  );
}

export default Home;
