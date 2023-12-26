import React,{ useState ,useEffect } from 'react'
import axios from 'axios'

const MovieAndLanguageListing = ({movie,state,setState}) => {
   
    const [movieData,setMovieData] = useState([])
    const [languageData,setLangugaeData] = useState([])
    const [loading,setLoading] = useState(false)
    
    const MovieAndLanguageFetching = async()=>{
      const response = await axios.get(`${import.meta.env.VITE_URL_SERVER}/theatre/showview/movies&language/`)
      const data = response.data
      if (response.status==200){
        setMovieData(data.movie)
        setLangugaeData(data.language)
        setLoading(true)
      }
    }

console.log(state);
const handleMovieClick = (itemId) => {
    const currentState = [...state];
    currentState[0] = {
        ...currentState[0],
        movies: movie ? itemId : currentState[0].movies,
        language: !movie ? itemId : currentState[0].language,
      };
      setState(currentState);
  };


    useEffect(()=>{
        MovieAndLanguageFetching()
      },[])
  return (
    <div>
{loading&&(movie?movieData:languageData).map((item)=>(
    <div key={item.id} onClick={() => handleMovieClick(item.id)} >
    {movie?item.movie_name:item.name}
    </div>
))

}

    
    </div>
  )
}

export default MovieAndLanguageListing