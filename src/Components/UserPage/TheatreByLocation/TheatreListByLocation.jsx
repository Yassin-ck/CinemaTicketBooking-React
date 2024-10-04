import React,{ useContext } from 'react'
import axios from 'axios'
import { theareListingAction } from '../../../Redux/Slices/theatreSlice'
import { useDispatch,useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './css/TheatreListByLocation.css'
import { AuthContext } from '../../../context/authcontext'
import { PiHeartThin } from "react-icons/pi";



const TheatreListByLocation = () => { 
    const dispatch = useDispatch()
    const {currentDate} = useContext(AuthContext)
    const navigate = useNavigate()
    const theatreDetails = useSelector(state=>state.theatre.theatreList)
    useEffect(() => {

        const FetchTheatrelistByLocation = async(location)=>{
            try{
                const response = await axios.get(`${import.meta.env.VITE_URL_SERVER}/user/theatrelist/?search=${location}`)
                const data = response.data
                if (response.status == 200){
                    dispatch(theareListingAction(data))
                    console.warn(data);
                }
            }catch(error){
                navigate('/')
                alert(error.response.data.msg)
                console.error(error);
            }
        }
        FetchTheatrelistByLocation(JSON.parse(localStorage.getItem('myLocation')))
        
    }, [])
  
    
    
  return (
    <>
    <div className='container MainDivInTheatreListByLocation'>
    <div className='SecondMainDivInTheareListByLocation'>
    {theatreDetails.map((theatre)=>(
        <div 
        className='InnerMainDivInTheatrelistByLocation'
        onClick={()=>navigate(`/talkies/${theatre.theatre_name}/${currentDate}`)}
        key={theatre.id}
         >
         <PiHeartThin className='iconwishlistintheatremovieslistbylocation'  style={{marginTop:'3px'}} />

        <div 
        className='OnClickDivinTheatreListByLocation'
        >
       <h6 >{theatre.theatre_name} : {theatre.theatre_location}</h6>
          <p style={{color:'grey'}}>{theatre.address}</p>  
        </div>
        </div>
        ))     
    }
    
    </div>
    </div>
    </>
  )
}

export default TheatreListByLocation