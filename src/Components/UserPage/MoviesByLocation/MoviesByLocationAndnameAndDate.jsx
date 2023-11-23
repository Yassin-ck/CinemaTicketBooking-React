import React,{ useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useDispatch,useSelector } from 'react-redux'
import { movieListingByLocation,dateListing } from '../../../Redux/Slices/movieSlice'
import { Link, useNavigate } from 'react-router-dom'

const MoviesByLocationAndnameAndDate = () => {
    const dispatch = useDispatch()
    const {language,movie,dt} = useParams()
    const navigate = useNavigate()
    const [loading,setLoading] = useState(false)
console.log(language);
    const {movieListByLocation,dateDetails} = useSelector(state=>state.movie)
    const FetchingMovieDetailsByMovieNameandDate = async (location,language,movie,date)=>{
        console.log('lkjh');
        try{
            const response = await axios.get(`${import.meta.env.VITE_URL_SERVER}/user/movieslist/?search=${location}&q=${language}&movie=${movie}&dt=${date}`)
            const data = response.data
            if (response.status==200){
                dispatch(movieListingByLocation(data.data))
                dispatch(dateListing(data.dates))
                setLoading(true)
                console.log(data);
            }
        }catch(error){
            console.error(error);
        }
    }

useEffect(() => {

    FetchingMovieDetailsByMovieNameandDate(JSON.parse(localStorage.getItem('myLocation')),language,movie,dt)
}, [dt]);


  return (
    <>  
    <div style={{display:"flex",justifyContent:"space-around"}}>{
        dateDetails.map((item)=>(
            <div onClick={()=>navigate(`/movies/${language}/${movie}/${item}`)}>
            {item}
            </div>
            ))
        }
        </div>
    {loading?movieListByLocation.map((item,index)=>{
        return (
            
            <div key={index} >
            <div  style={{display:"flex",justifyContent:"space-around"}}>
            {item.times.map((time,index)=>(
                <Link key={index} to={`/movies/${language}/${movie}/${dt}/${item.theatre_name}/${item.screen_number}/${time}`}>
                <h6>{time}</h6>
                </Link>
                ))}
                </div>
            <p>{item.screen_number}</p>
            <p>{item.language}</p>
            <p>{movie}</p>
            <p>{item.theatre_name}</p>
            </div>

        )
    }):<h4>...Loading</h4>}
    
    </>
  )
}

export default MoviesByLocationAndnameAndDate