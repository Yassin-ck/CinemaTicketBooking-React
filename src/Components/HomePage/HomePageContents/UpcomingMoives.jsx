import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UpcomingMovies.css";
import { useNavigate } from "react-router-dom";
import {Variants,SkeletonTypography} from "../../../Loadings/HomeLoading";

const UpcomingMovies = () => {
  const [movieData, setMovieData] = useState([]);
  const navigate = useNavigate();
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
  const all = "all";
  const movieSelectionHandler = (movie) => {
    navigate(`/movieview/${movie.movie_name}:${movie.id}`);
  };
  console.log(movieData);
  const baseUrl = `${import.meta.env.VITE_URL_SERVER}/media/`;

  return (
    <>
      <div className="h4headerinupcomingmovies">
        <h4 style={{ letterSpacing: "-1.6px" }}>{movieData.length!==0?"Upcoming Movies":<SkeletonTypography />}</h4>
      </div>
      <br />
      <div className="container maindivofcardinupcomngmovies">
        <div className="row MaincardContainerDivForupcomingMovies">
          {movieData.length!==0?movieData.map((movie) => (
            <div
              key={movie.id}
              onClick={() => movieSelectionHandler(movie)}
              className="MainCardInUpcomigMovies"
              style={{ width: "15rem", height: "400px" }}
            >
              <img
                loading="lazy"
                className="ImageInUpcomigMovies"
                variant="top"
                src={`${baseUrl + movie.poster}`}
                style={{ objectFit: "cover", height: "90%", width: "100%" }}
              />
              <div className="movienamedivinupcomingmovies">
                {movie.movie_name[0]
                  .toUpperCase()
                  .concat(movie.movie_name.slice(1, movie.movie_name.length))}
              </div>
            </div>
          )):<Variants />}
        </div>
      </div>
    </>
  );
};

export default UpcomingMovies;
