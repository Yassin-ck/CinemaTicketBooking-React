import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const TheatreShowDetailsView = () => {
    const [showData,setShowData] = useState()
    const [loading,setLoading] = useState(false)
    const FetchingShowDetails = async ()=>{
        const response = await axios.get(`${import.meta.env.VITE_URL_SERVER}/theatre/showview/`)
        const data = response.data
        if (response.status == 200){
            setShowData(data)
            setLoading(true)
        }
    } 

    useEffect(() => {
        FetchingShowDetails()
    }, [])
    console.log(showData);
  return (
    <div>{loading&&showData.map((show,index)=>(
        <div key={index}>
       {show.screen_number}
       {show.dates.map((date,index)=>(
        <div>
        <Link to={`${show.screen_number}/${date}`}> {date}</Link> 
        </div>
       ))}
        </div>
   ))


    }
    
    </div>
  )
}

export default TheatreShowDetailsView