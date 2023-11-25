import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

const SeatDetailsForUpdation = () => {
    const [seatState,setSeatState] = useState()
    const [loading,setLoading] = useState(false)
    const {id} = useParams()
    const SeatArrangementForUpdation = async ()=>{
        const response = await axios.get(`${import.meta.env.VITE_URL_SERVER}/theatre/screenseatarrange/${id}`,
        )
        const data = response.data
        if (response.status==200){
            setSeatState(data.seating)
            setLoading(true)
        }
        
    }
    useEffect(() => {
        SeatArrangementForUpdation()
    }, [])
    console.log(seatState);
  return (
    <div
              style={{
                display: "flex",
                flexDirection: "column",
                rowGap: "15px",
              }}
            >
              {loading&&seatState.map((seats, index) => (
                <div key={index}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    {seats.map((seat, index) => (
                      <div key={index}>
                        <input
                          readOnly
                          className="btn btn-light"
                          style={{ width: "40px", padding: "7px 0px" }}
                          value={seat}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>


  )
}

export default SeatDetailsForUpdation