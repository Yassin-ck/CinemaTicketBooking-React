import React,{ useState ,useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

const MovieAndLanguageListing = ({movie,time,dates,language,state,setState}) => {
    const [RequestedData,setRequesteddata] = useState([])
    const [loading,setLoading] = useState(false)
    const { id } = useParams()
    const MovieAndLanguageFetching = async(e)=>{
        if (e==dates){
            e = `dates,${state[0].show_time}`
        }else if(e==language){
            e= `language${state[0].movies}`
        }
      const response = await axios.get(`${import.meta.env.VITE_URL_SERVER}/theatre/showview/movies&language/${id}/?q=${e}`,
      )
      const data = response.data
      if (response.status==200){
        setRequesteddata(data.data)
        setLoading(true)
        console.log(response);
      }
    }
    const handleMovieClick = (itemId) => {
        const currentState = [...state];
      
        currentState[0] = {
          ...currentState[0],
          show_dates: dates
            ? currentState[0].show_dates.includes(itemId)
              ? currentState[0].show_dates.filter((id) => id !== itemId)
              : [...currentState[0].show_dates, itemId]
            : currentState[0].show_dates,
          show_time: time
            ? currentState[0].show_time.includes(itemId)
              ? currentState[0].show_time.filter((id) => id !== itemId)
              : [...currentState[0].show_time, itemId]
            : currentState[0].show_time,
          movies: movie ? itemId : currentState[0].movies,
          language: !movie ? itemId : currentState[0].language,
        }; 
        setState(currentState);
      };
      

    useEffect(()=>{
        MovieAndLanguageFetching(movie?movie:language?language:time?time:dates)
      },[])
  return (
    <div>
{loading&&RequestedData.map((item)=>(
    <div key={item.id} onClick={() => handleMovieClick(item.id)} >
    {movie?item.movie_name:language?item.name:time?item.time:item.dates}
    </div>
))

}
    </div>
  )
}

export default MovieAndLanguageListing