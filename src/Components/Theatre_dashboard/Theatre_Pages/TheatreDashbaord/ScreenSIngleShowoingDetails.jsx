import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavItem } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'

const ScreenSIngleShowoingDetails = () => {
    const {id} =useParams()
    const navigate = useNavigate()
    const [screenData,setScreenData] = useState([])
    const [loading,setLoading] = useState(false)
    const Screendetialsfetching = async ()=>{
        const response = await axios.get(`${import.meta.env.VITE_URL_SERVER}/theatre/screendetailsform/${id}`)
        const data = response.data
        if (response.status==200){
            setScreenData(data)
            setLoading(true)
        }
    }

    useEffect(()=>{
            Screendetialsfetching()
    },[])
  return (
    <div>
    <h4 onClick={()=>navigate('addshow')}>Add Show</h4>
    {loading&&[screenData].map((item)=>(
        <div>
        {item.screen_number}<br/>
        {item.ticket_rate}<br />
        {item.num_of_screens}
        </div>
    ))}
    </div>
  )
}

export default ScreenSIngleShowoingDetails