import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'


const Movieslist = () => {
const navigate = useNavigate()  
const movies = useSelector(state=>state.movie.movieList)

console.log(movies);



  return (
    <>
    {movies.map((item)=>(
        <div key={item.id}>
        <h1>{item.id}</h1>
        <h1>{item.movie_name}</h1>
        <h1>{item.directior}</h1>
        </div>
    ))}
    </>
  )
}

export default Movieslist
