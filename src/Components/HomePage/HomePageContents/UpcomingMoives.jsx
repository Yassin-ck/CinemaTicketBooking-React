import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import "./UpcomingMovies.css";
import { useNavigate } from "react-router-dom";


const UpcomingMovies = () => {
  const [movieData, setMovieData] = useState([]);
  const navigate = useNavigate()
  const fetchUpcomingAndRunningMovies = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_URL_SERVER}/admin_panel/movielist/`
      );
      if (response.status === 200) {
        setMovieData(response.data);
      }
    } catch (error) {
      console.error("Error fetching movie data:", error);
    }
  };

  useEffect(() => {
    fetchUpcomingAndRunningMovies();
  }, []);
  const all = "all"
  const movieSelectionHandler = (movie)=>{
    navigate(`/movieview/${movie.movie_name}:${movie.id}`)
  }
  console.log(movieData);
  const baseUrl = `${import.meta.env.VITE_URL_SERVER}/media/`;

  return (
    <>
      <div className="h4headerinupcomingmovies">
        <h4 style={{ letterSpacing: "-1.6px" }}>Upcoming Movies</h4>
      </div>
      <br />
      <div className="maindivofcardinupcomngmovies">
        <div className="row MaincardContainerDivForupcomingMovies">
          {movieData.map((movie, index) => (
            <div
              key={movie.id}
              className="col-md-3 mt-4"
            >
              <div
                onClick={()=>movieSelectionHandler(movie)}
                className="MainCardInUpcomigMovies"
                style={{ width: "15rem", height: "400px"}}
                >
                
            
              <img
              loading="lazy"
              className="ImageInUpcomigMovies"
              variant="top"
              src={`${baseUrl + movie.poster}`}     
              style={{ objectFit: "cover", height: "90%", width: "100%" }}
              />
                <div className="movienamedivinupcomingmovies">
                  {movie.movie_name[0].toUpperCase().concat(movie.movie_name.slice(1,movie.movie_name.length))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default UpcomingMovies;
