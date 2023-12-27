import axios from "axios";
import React, { useEffect, useState } from "react";
import MovieAndLanguageListing from "./MovieAndLanguageListing";
import { useParams } from "react-router-dom";

const TheatresShowsAdding = () => {
  const { id } = useParams()
  const [showData,setShowdata] = useState([{
    movies:null,
    language:null,
    screen:parseInt(id),
    show_dates:[],
    show_time:[]

  }])
 const [movieSelection,setMovieSelection] = useState(false)
 const [languageSelection,setLanguageSelection] = useState(false)
 const [dateSelection,setDateSelection] = useState(false)
 const [timeSelection,setTimeSelection] = useState(false)
  const ShowDetailsAdding = async (e)=> {
    e.preventDefault()
    try{
      const [datas] = showData
      const response = await axios.post(
        `${import.meta.env.VITE_URL_SERVER}/theatre/showview/`,
        datas
        );
        const data = response.data;
        if (response.status == 200) {
          console.log(data);
        }
      }catch(error){
        console.error(error);
      }
  };
  console.log(showData);
  
const DataSelectionHandler = (e)=>{
  if (e=='movie'){
    setMovieSelection(!movieSelection)
    setLanguageSelection(false)
    setDateSelection(false)
    setTimeSelection(false)
  }else if(e=='language'){
    setLanguageSelection(!languageSelection)
    setMovieSelection(false)
    setDateSelection(false)
    setTimeSelection(false)
  }else if (e=='time'){
    setTimeSelection(!timeSelection)
    setLanguageSelection(false)
    setMovieSelection(false)
    setDateSelection(false)
  }else{
    setDateSelection(!dateSelection)
    setTimeSelection(false)
    setLanguageSelection(false)
    setMovieSelection(false)
  }
}



  return (
    <div>
      <form onSubmit={e=>ShowDetailsAdding(e)}>
        <div>
        <input onClick={e=>DataSelectionHandler('movie')}  type="button" value="Movie" required />
        {movieSelection&&<MovieAndLanguageListing movie={'movie'} state={showData} setState={setShowdata}  />}
        </div>
        <div>
        <input onClick={e=>DataSelectionHandler('language')}  type="button" value="Langugae" required />
        {languageSelection&&<MovieAndLanguageListing language={'language'}  state={showData} setState={setShowdata}   />}
        </div>
        <div>
        <input onClick={e=>DataSelectionHandler('time')}  type="button" value="Show time" required />
        {timeSelection&&<MovieAndLanguageListing time={'time'}  state={showData} setState={setShowdata}   />}
        </div>
        <div>
        <input onClick={e=>DataSelectionHandler('dates')}  type="button" value="Show dates" required />
        {dateSelection&&<MovieAndLanguageListing dates={'dates'}  state={showData} setState={setShowdata}   />}
        </div>
        <div>
        <input type="submit" value='submit' />
        </div>
      </form>
    </div>
  );
};

export default TheatresShowsAdding;
