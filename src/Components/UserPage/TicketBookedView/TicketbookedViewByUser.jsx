import axios from 'axios'
import React,{ useEffect, useState } from 'react'
import './TicketbookedViewByUser.css'
import SingleTicketbookedViewByUser from './SingleTicketbookedViewByUser'

const TicketbookedViewByUser = () => {
    const [ticket,setTicket] = useState([])
    const [open, setOpen] = useState(false);

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
    <div className='container MainDivContainerTicketBookingView'>
    {loading&&ticket.map((item,index)=>(
        <div className= 'InnerMainDivContanierTicketBookingView'  onClick={()=>setOpen(true)} key={index} >
       <div data-tootip="Movie"> <p>{item.movie[0].toUpperCase()+item.movie.slice(1)}</p></div>
       <div data-tootip="Theatre"> <p >{item.theatre[0].toUpperCase()+item.theatre.slice(1)}</p></div>
       <div data-tootip="Time"> <p>{item.show_time}</p></div>
       <div data-tootip="Date"> <p>{item.show_date}</p></div>
    
       </div>
       ))}
       {open&&<SingleTicketbookedViewByUser data={{open,setOpen}} />}
       </div>
  )
}

export default TicketbookedViewByUser