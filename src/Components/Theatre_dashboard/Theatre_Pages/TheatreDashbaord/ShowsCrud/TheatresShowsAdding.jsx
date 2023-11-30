import React from 'react'

const TheatresShowsAdding = () => {
    const ShowDetailsAdding = async ()=>{
        const response = await axios.post(`${import.meta.env.VITE_URL_SERVER}/theatre/showview/`)
        const data = response.data
        if (response.status == 200){
            console.log(data);
        }
    } 
  return (
    <div>
    
    <form>
    
    </form>
    </div>
  )
}

export default TheatresShowsAdding