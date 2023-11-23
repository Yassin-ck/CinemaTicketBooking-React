import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { movieListingByLocation } from '../../../Redux/Slices/movieSlice';
import { Button } from 'bootstrap';
import { AuthContext } from '../../../context/authcontext';

const MovieDetailsFullShowing = () => {
  const { language, movie } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const movieDetails = useSelector(state => state.movie.movieListByLocation);
  const {currentDate} = useContext(AuthContext)
  const FetchMovieSingleDetails = async (movie, id) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_URL_SERVER}/user/moviedetailsview/${movie}/${id}`);
      const data = response.data;
      if (response.status === 200) {
        dispatch(movieListingByLocation(data.data));
        console.log(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    
    let datas = movie.split(':');
    FetchMovieSingleDetails(datas[0], datas[1]);
  }, []);

  return (
    <>
      {[movieDetails].map((item) => (
        <div key={item.id}>
          {item.movie_name}
          {item.poster}
          {item.director}
          <button className='btn' onClick={() => navigate(`/movies/${language}/${item.movie_name}/${currentDate}`)}>Book Now</button>
        </div>
      ))}
    </>
  );
};

export default MovieDetailsFullShowing;
