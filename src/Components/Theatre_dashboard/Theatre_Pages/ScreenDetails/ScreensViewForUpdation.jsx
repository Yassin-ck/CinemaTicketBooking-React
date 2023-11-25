import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const ScreensViewForUpdation = () => {
    const [screens,setScreens] = useState([])
    const TheatreScreenDetailsView = async ()=>{
        try{
            
            const response = await axios.get(`${import.meta.env.VITE_URL_SERVER}/theatre/screendetailsform`)
            const data = response.data
            if (response.status==200){
                setScreens(data)
                
            }
        }catch(error){
            console.error(error);
        }
        
    }

useEffect(()=>{
    TheatreScreenDetailsView()
},[])

  return (
    <div>
    {setScreens.map((item,index)=>(
        <Link  key={item.id} 
        to={`/theatre/screencrud/${item.id}`}
        >
        {item.screen_number}
        {item.column_count}
        {item.row_count}
        {item.number_of_screens}
        
        </Link>
    ))

    }
    
    </div>
  )
}

export default ScreensViewForUpdation