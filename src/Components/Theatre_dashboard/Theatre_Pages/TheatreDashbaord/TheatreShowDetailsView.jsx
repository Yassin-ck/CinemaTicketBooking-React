import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './css/TheatreShowDetailsView.css'
import TheatreShowDetailsSingleView from './TheatreShowDetailsSingleView'

const TheatreShowDetailsView = () => {
    const { id } = useParams()
    const [dateShow,setDateShow] = useState(null)
    const [showData,setShowData] = useState([])
    const [loading,setLoading] = useState(false)
    const FetchingShowDetails = async ()=>{
        const response = await axios.get(`${import.meta.env.VITE_URL_SERVER}/theatre/showview/${id}`)
        const data = response.data
        if (response.status == 200){
            setShowData(data)
            setLoading(true)
        }
    } 

    const DateShowHandler = (e)=>{
      setDateShow(e)
    }

    useEffect(() => {
        FetchingShowDetails()
    }, [])
    console.log(showData);
  return (
    <div className='MainContainerDivInTheatreShowDetailsView'>
    <div className='SecondContainerDivInTheatreShowDetailsView'>{loading&&showData.map((show,index)=>(
      <div className={dateShow!=show.date?'DateDivInTheatreShowDetailsView':'DateDivInTheatreShowDetailsViewClicked'} onClick={()=>DateShowHandler(show.date)} key={index}>
     <h6 className='DateInTheatreDetailsView' >{show.date}</h6> 
      <br />
      </div>
      ))
      
      
    }
    </div>
    <div className='ThirdContainerDivInTheatreShowDetailsView'>
    {dateShow!=null&&<TheatreShowDetailsSingleView dateShow={dateShow} />}
    </div>
    
    </div>
  )
}

export default TheatreShowDetailsView