import React,{ useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useDispatch,useSelector } from 'react-redux'
import { movieListingByLocation } from '../../../Redux/Slices/movieSlice'
import { Link, useNavigate } from 'react-router-dom'



const MoviesByLoctnAndLngage = () => {
    const dispatch = useDispatch()
    const {language} = useParams()
    const navigate = useNavigate()
    const {movies,languages} = useSelector(state=>state.movie.movieListByLocation)
    const FetchingMovieDetailsByLocationAndLanguage = async (location,language)=>{
        try{
            const response = await axios.get(`${import.meta.env.VITE_URL_SERVER}/user/movieslist/?search=${location}&q=${language}`)
            const data = response.data
            if (response.status==200){
                console.log(data);
                dispatch(movieListingByLocation(data))
            }
        }catch(error){
            console.error(error);
        }
    }
   
    useEffect(() => {

        FetchingMovieDetailsByLocationAndLanguage(JSON.parse(localStorage.getItem('myLocation')),language)
    }, [language])
    
    return (
        <>
        {movies&&movies.map((item)=>(
                <Link key={item.id} to={`/movies/${language}/${item.movie_name}:${item.id}/`}>
                <h5>{item.movie_name}</h5>
                <h5>{item.poster}</h5>
                </Link>
                )
        )}
        {languages&&languages.map((item,index)=>(
                <Link to={`/movies/${item.name}`}
            
              key={index}>
                <h5>{item.name}</h5>
                </Link>
                )
        )}
            </>
            )
}


export default MoviesByLoctnAndLngage;