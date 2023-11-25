import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'



const ScreenDetailsUpdating = () => {
    const navigate = useNavigate()
    const inputRef = useRef(null)
    const [screenState,setScreenState] = useState([])
    const {id} = useParams()

    
    const screenDetailsAddingSubmission = async (e)=>{
            e.preventDefault()
        try{
          const response = await axios.put(`${import.meta.env.VITE_URL_SERVER}/theatre/screendetailsform/${id}/`,
           {
                screen_number:inputRef.current.screen_number.value,
                number_of_seats:inputRef.current.number_of_seats.value,
                column_count:inputRef.current.column_count.value,
                row_count:inputRef.current.row_count.value,
            }
            )
            const data = response.data
            if (response.status==200){
                navigate(`/theatre/seatarrangemnt/${id}`)
            }
        }catch(error){
            console.error(error);
        }
    }
    
const screenDetailsAddingGet = async ()=>{
        
        try{
          const response = await axios.get(`${import.meta.env.VITE_URL_SERVER}/theatre/screendetailsform/${id}/`)
            const data = response.data
            if (response.status == 200){
                setScreenState(data)  
            }
        }catch(error){
            console.error(error);
        }
}
    useEffect(()=>{
      screenDetailsAddingGet()
    },[])


  return (
    <div>
    {[screenState].map((item)=>(

        <form ref={inputRef}  onSubmit={(e)=>screenDetailsAddingSubmission(e)}>
        <input name='screen_number' defaultValue={item.screen_number} type='text' placeholder='screen number' />
        <input name='number_of_seats' defaultValue={item.number_of_seats} type='text'  placeholder='number of seats' />
        <input name='column_count' type='text' defaultValue={item.column_count}  placeholder='column cout' />
        <input name='row_count' defaultValue={item.row_count} type='text' />
        <input  type='submit' />
        </form>
        ))
    }
    
    </div>
  )
}

export default ScreenDetailsUpdating;