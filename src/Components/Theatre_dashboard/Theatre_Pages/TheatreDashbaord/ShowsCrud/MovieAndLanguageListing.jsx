import React,{ useState ,useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import './css/MovieAndLanguageListing.css'

const MovieAndLanguageListing = ({data,state,setState,disableState,setSubmit}) => {
    const [RequestedData,setRequesteddata] = useState([])
    const [loading,setLoading] = useState(false)
    const [stateData,SetStateData] = useState([])
    const [submitButtonDisable,SetSubmitButtonDisable] = useState(false)
    const { id } = useParams()
    const MovieAndLanguageFetching = async(e)=>{
           if (e=='dates'){
            e = `dates,${state[0].show_time}`
        }else if(e=='language'){
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
        SetStateData((prevIds) => {
            if (prevIds.includes(itemId)) {
              return prevIds.filter((id) => id !== itemId);
            } else {
              return [...prevIds, itemId];
            }
          });        const currentState = [...state];
      
        currentState[0] = {
          ...currentState[0],
          show_dates:data == 'dates'
            ? currentState[0].show_dates.includes(itemId)
              ? currentState[0].show_dates.filter((id) => id !== itemId)
              : [...currentState[0].show_dates, itemId]
            : currentState[0].show_dates,
          show_time:data == 'time'
            ? currentState[0].show_time.includes(itemId)
              ? currentState[0].show_time.filter((id) => id !== itemId)
              : [...currentState[0].show_time, itemId]
            : currentState[0].show_time,
          movies:data == 'movie' ? itemId : currentState[0].movies,
          language: data == 'language' ? itemId : currentState[0].language,
        }; 
        setState(currentState);
      };
      useEffect(()=>{
        if(data==='time'&&state[0].show_time.length!=0){
            SetSubmitButtonDisable(true)
        }else if(data==='dates'&&state[0].show_dates.length!=0){
            SetSubmitButtonDisable(true)
        }else{
            SetSubmitButtonDisable(false)
        }
        return ()=>{
            SetSubmitButtonDisable(false)
        }
      },[state])
      console.log(stateData);

    useEffect(()=>{
        MovieAndLanguageFetching(data)
      },[])

      const DateOrTimeSubmitHandler = ()=>{
        disableState(true)
       
        setSubmit(true)
      }
  return (
    <div className='container MovieAndLanguageLisitngMainContainerDiv'>
    <div className='MovieAndLanguageLisitngSecondContainerDiv'>
    {loading&&RequestedData.length!=0?RequestedData.map((item)=>(
       <div className={stateData.includes(item.id)?'ContentDivInMovienadLanguageListingSelected':'ContentDivInMovienadLanguageListing'} key={item.id} onClick={() => handleMovieClick(item.id)} >
        <p style={{marginRight:'3px'}}> {data=='movie'?item.movie_name:data=='language'?item.name:data=='time'?item.time:item.dates}</p>
        {data=='movie'&& <p style={{fontWeight:'lighter'}}>( {item.director} )</p>}
    </div>
    ))

:loading&&RequestedData.length==0?<p>Movies Already Shedueled for the Given Time</p>:<p>Loading</p>}
{disableState&&RequestedData.length!=0&&<div className={!submitButtonDisable?'ButtonDivForMovieAndLanguageLisitng':'ButtonDivForMovieAndLanguageLisitngSelection'}>
    <input  type='submit' onClick={DateOrTimeSubmitHandler}  />
    </div>}
    </div>
    </div>
  )
}

export default MovieAndLanguageListing