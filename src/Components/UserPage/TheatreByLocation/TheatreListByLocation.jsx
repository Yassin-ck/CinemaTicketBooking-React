import React,{ useContext } from 'react'
import axios from 'axios'
import { theareListingAction } from '../../../Redux/Slices/theatreSlice'
import { useDispatch,useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../context/authcontext'
import './css/TheatreListByLocation.css'


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

        <div 
        className='OnClickDivinTheatreListByLocation'
        >
       <h6 className='theatrePtagInTheatreListBbyLocation'>{theatre.theatre_name}</h6>
          <p>{theatre.address}</p>  
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