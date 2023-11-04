import { useContext, useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import './SigninPage.css'
import { AuthContext } from '../../context/authcontext';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { MdOutlineArrowLeft } from 'react-icons/md';

function OffCanvasExample({ name, ...props }) {
  const navigate = useNavigate()
  const [show, setShow] = useState(false);
  const { user,setAuthToken,setUser } = useContext(AuthContext)
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const logout = ()=>{
      handleClose()
      setTimeout(() => {
          
          localStorage.removeItem('authToken')
          setAuthToken()
          setUser()
          navigate('/')
      }, 500);
    }
    const EditProfileHandler =()=>{
      handleClose()
    navigate('/view')
  }
  
  return (

    <>
     <div style={{display:'flex',justifyContent:'space-evenly',width:'18rem',position:'relative'}}> 
     <img style={{ cursor: 'pointer',width:'40px' }} onClick={handleShow}  src="//in.bmscdn.com/m6/images/my-profile/bms-user.png" alt="Profile" class="bwc__sc-1nbn7v6-15 jipwZh"></img>
     {user? <h5 style={{position:'absolute',right:'55px',top:'11px'}}>{user.username}</h5>:<h5> Guest</h5>}
     </div> 
     <div style={{position:'relative'}}>
     <Offcanvas  style={{width:'22rem'}} show={show} onHide={handleClose} {...props} >
     <Offcanvas.Header style={{color:'white',background:'#155D27',height:'4.64rem'}}>
     <div style={{height:'40px'}}>
     <Offcanvas.Title >
     <h5 >Hii {user.username}</h5>
     </Offcanvas.Title>
     <div  style={{position:'relative',color:'rgb(136,136,136)' ,cursor:'pointer'}} onClick={EditProfileHandler}>
     <MdOutlineArrowLeft  />
     <p  style={{fontSize:'14px',position:'absolute',top:'2px',left:'18px'}}>Edit Profile</p> 
     </div>
     </div>
     <img src="//in.bmscdn.com/webin/movies/superstar/profile_avatar.png" alt="user" class="bwc__sc-1fj6cem-17 exSHsT"></img>
     </Offcanvas.Header >
     <Offcanvas.Body>
     title
     <hr/>
     Body
     <hr />
     title
     <hr/>
     Body
     <hr />
      title
      <hr/>
      Body
      <hr />
      </Offcanvas.Body>
      <div>
      <hr />
      </div>
      <div style={{margin:'5px',display:'flex',justifyContent:'center'}}>
      <Button variant="outlined" fullWidth onClick={logout} style={{width:'90%',borderRadius:'2px',color:'red',boxShadow:'1px 2px 8px white',border:'1px solid red'}}>Sign out</Button>
      </div>
      
      </Offcanvas>
      </div> 
      
    </>
  );
}

export default function Sidebar() {
  return (
    <>
      {['end'].map((placement, idx) => (
        <OffCanvasExample key={idx} placement={placement} name={placement} />
      ))}
    </>
  );
}

