import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './css/MoviesList.css'

const Movieslist = () => {
const navigate = useNavigate()   
const movies = useSelector(state=>state.movie.movieList)

const baseUrl = `${import.meta.env.VITE_URL_SERVER}/media/`
const movieViewHandler = (item)=>{
  navigate(`movieview/${item.movie_name}:${item.id}`)
  
}

  return (
    <>
    <div className='container MainDivForMovieSearch'>
    {movies.map((item, index) => (
      <div className='MainCardDivInMoveSearchListdetails' onClick={()=>movieViewHandler(item)} key={index} >
        <div className='InnerDivInMovieSearchListdetails'>
          <img src={`${baseUrl + item.poster}`} alt="Movie Poster" />
          <p >{item.movie_name}</p>
        </div>
      </div>
    ))}
  </div>
    </>
  )
}

export default Movieslist
