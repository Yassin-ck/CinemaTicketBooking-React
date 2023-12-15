import axios from 'axios'
import React,{ useEffect, useState } from 'react'

const TicketbookedViewByUser = () => {
    const [ticket,setTicket] = useState([])
    const [loading,setLoading] = useState(false)
    const bookedtTicketFetching = async()=>{
            try{
            const response = await axios.get(`${import.meta.env.VITE_URL_SERVER}/user/bookedticketview/`)
            const data = response.data
            if (response.status==200){
                console.log(data);
                setTicket(data)
                setLoading(true)
            }
        }catch(error){
            console.error(error);
        }
    }
    useEffect(() => {
     bookedtTicketFetching()
    }, [])
    

  return (
    <div>
    {loading&&ticket.map((item,index)=>(
        <div key={index} style={{color:'white'}}>
        <h1>{item.screen}</h1>
        <h1>{item.movie}</h1>
        <h1>{item.theatre}</h1>
        <div>{item.tickets.map((ticket,index)=>(
            <div key={index}>
            <h1>{ticket}</h1>
            </div>
        ))}</div>
        <h1>{item.show_time}</h1>
        <h1>{item.show_date}</h1>
        <h1>{item.language}</h1>
        </div>
    ))}
    </div>
  )
}

export default TicketbookedViewByUser