import React from 'react'
import { useSelector } from 'react-redux'


const Movieslist = () => {
    
const movies = useSelector(state=>state.movie.movieList)
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
