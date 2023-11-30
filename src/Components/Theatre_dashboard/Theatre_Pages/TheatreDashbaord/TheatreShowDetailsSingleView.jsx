import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const TheatreShowDetailsSingleView = () => {
    const {id,dt} = useParams()
    const [showData,setShowData] = useState()
    const [loading,setLoading] = useState(false)
    const FetchingShowSingleDetails = async ()=>{
        const response = await axios.get(`${import.meta.env.VITE_URL_SERVER}/theatre/showview/${id}/${dt}`)
        const data = response.data
        if (response.status == 200){
            setShowData(data)
            setLoading(true)
        }
    } 

    useEffect(() => {
        FetchingShowSingleDetails()
    }, [])
    console.log(showData);
  return (
    <div>{loading&&showData.map((show,index)=>(
        <div key={index}>
        {show.time}
        {show.languages}
        {show.movie}
        </div>
    ))}</div>
  )
}

export default TheatreShowDetailsSingleView