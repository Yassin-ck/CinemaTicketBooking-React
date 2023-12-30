import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './css/TheatreShowDetailsSingleView.css'
import TheatreShowSingleFullDetails from '../Theatre_AccountsAndAuthentications/TheatreShowSingleFullDetails'

const TheatreShowDetailsSingleView = ({dateShow}) => {
    const navigate = useNavigate()

  const [open, setOpen] = useState(false);
    const {id} = useParams()
    const [showData,setShowData] = useState()
    const [idAndTime,setIdAndTime] = useState([])
    const [loading,setLoading] = useState(false)
    const FetchingShowSingleDetails = async ()=>{
        const response = await axios.get(`${import.meta.env.VITE_URL_SERVER}/theatre/showview/${id}/${dateShow}`)
        const data = response.data
        if (response.status == 200){
            setShowData(data)
            setLoading(true)
        }
    } 

    useEffect(() => {
        FetchingShowSingleDetails()
    }, [dateShow])

    const SHowViewHandler = (id,time)=>{
        setOpen(true)
        setIdAndTime([id,time])
    }
  return (
    <>
    
    <div className='MainDivForTheatreShowDetailsSingleView'>
    <div className='SecondDivForTheatreShowDetailsSingleView'>
    {loading&&showData.length!=0?showData.map((show,index)=>(
        <div className='ContainerDivForTheatreShowDetailsSingleView' key={index} onClick={()=>SHowViewHandler(show.id,show.time)} >
       <div> <p> {show.time}</p></div>
       <div> <p>{show.languages}</p></div>
       <div> <p> {show.movie}</p></div>
       </div>
       )):<p>No Movies Sheduled</p>}</div>
       </div>
       {open&& <TheatreShowSingleFullDetails  data={{open,setOpen,id,dateShow,idAndTime}} />}
        </>
        )
    }

export default TheatreShowDetailsSingleView