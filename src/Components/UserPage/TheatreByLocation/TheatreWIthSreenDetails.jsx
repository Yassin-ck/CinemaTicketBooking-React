import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { theareListingAction } from '../../../Redux/Slices/theatreSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { dateListing } from '../../../Redux/Slices/movieSlice';


const TheatreWithScreenDetails = () => {
  const dispatch = useDispatch();
  const { cinemas,dt } = useParams();
  const {movie,theatre} = useSelector((state) => state)
  const [loading,setLoading] = useState(false)
  
  useEffect(() => {
    const FetchTheatrelistByLocation = async (location, cinemas,date) => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_URL_SERVER}/user/theatrelist/?search=${location}&cinemas=${cinemas}&dt=${date}`
        );
        const data = response.data;
        if (response.status === 200) {
            console.log(data);
          dispatch(theareListingAction(data.data));
          dispatch(dateListing(data.dates))
        
          setLoading(true)
        }
      } catch (error) {
        console.error(error);
      }
    };
    
    const storedLocation = JSON.parse(localStorage.getItem('myLocation'));
    if (storedLocation) {
        FetchTheatrelistByLocation(storedLocation, cinemas, dt);
    }
}, [dt]);


  return (
    <>
      
      {loading && movie.dateDetails &&
        movie.dateDetails.map((date, index) => (
          <Link key={index.id}
          to={`/talkies/${cinemas}/${date}`}
          >
 
              {date}
            
            <br />
          </Link>
        ))}
      <br></br>
      {cinemas}
      {loading && theatre.theatreList &&
        theatre.theatreList.map((theatre, index) => (
          <Link key={index.id}
          to={`/movies/${theatre.language}/${theatre.movie_name}/${dt}/${theatre.theatre_name}/${theatre.screen_number}/${theatre.show_time}`}          >
            <div key={index.id} >
              {theatre.screen_number}
              <br></br>
              {theatre.movie_name}
              <br></br>
              {theatre.show_time}
              <br></br>
              {theatre.language}
              </div>
            <br />
          </Link>
        ))}
    </>
  );
};

export default TheatreWithScreenDetails;
