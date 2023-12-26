import axios from "axios";
import React, { useEffect, useState } from "react";
import MovieAndLanguageListing from "./MovieAndLanguageListing";

const TheatresShowsAdding = () => {
  const [showData,setShowdata] = useState([{
    movies:null,
    language:null,
    screen:null,
    show_dates:[],
    show_time:[]

  }])
 const [movieSelection,setMovieSelection] = useState(false)
 const [languageSelection,setLanguageSelection] = useState(false)
  const ShowDetailsAdding = async () => {
    const response = await axios.post(
      `${import.meta.env.VITE_URL_SERVER}/theatre/showview/`
    );
    const data = response.data;
    if (response.status == 200) {
      console.log(data);
    }
  };
  
const MovieSelectionHandler = ()=>{
  setMovieSelection(!movieSelection)
  setLanguageSelection(false)
}

const LanguageSelectionHandler = ()=>{
  setLanguageSelection(!languageSelection)
  setMovieSelection(false)
}
console.log(showData);
  
 
  return (
    <div>
      <form>
        <div>
        <input onClick={MovieSelectionHandler}  type="button" value="Movie" />
        {movieSelection&&<MovieAndLanguageListing movie={'movie'} state={showData} setState={setShowdata}  />}
        </div>
        <div>
        <input onClick={LanguageSelectionHandler}  type="button" value="Langugae" />
        {languageSelection&&<MovieAndLanguageListing  state={showData} setState={setShowdata}   />}
        </div>
        <div>
          <input type="button" value="Show time" />
        </div>
        <div>
          <input type="button" value="Show dates" />
        </div>
      </form>
    </div>
  );
};

export default TheatresShowsAdding;
