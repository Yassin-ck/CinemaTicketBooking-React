import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './css/ScreenShowingWithNumbers.css'

const ScreenShowingWithNumbers = () => {
    const [screenData,setScreenData] = useState([])
    const [loading,setloading] = useState(false)
    const navigate = useNavigate()
    const ScreenNumberShowingForTheatre = async(e)=>{
        const response = await axios.get(`${import.meta.env.VITE_URL_SERVER}/theatre/screendetailsform/`)
        const data = response.data
        console.log(response);
        if (response.status==200){
            setScreenData(data)
            setloading(true)
        }
    }
    useEffect(()=>{
        ScreenNumberShowingForTheatre()
    },[])

    console.log(screenData);
  return (
    <div className='container MainContainerDivInScreenShowingWithNumbers'>
    <div className='SecondDivInScreenShowingWithNumbers' >
    {loading&&screenData.map((item)=>(
        <div className='ScreenShowingWIthNumbersItemMainDiv' onClick={()=>navigate(`${item.id}`)} >
        <div className='ScreenShowingWIthNumbersItemDiv'>
       <p>{item.screen_number}</p>
        </div>
        </div>
        ))}
        </div>
        </div>
  )
}

export default ScreenShowingWithNumbers