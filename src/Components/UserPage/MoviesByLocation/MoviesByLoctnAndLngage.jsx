import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { movieListingByLocation } from "../../../Redux/Slices/movieSlice";
import { Link, useNavigate } from "react-router-dom";
import "./css/MovieByLoctnandLngage.css";
import Card from "react-bootstrap/Card";

const MoviesByLoctnAndLngage = () => {
  const dispatch = useDispatch();
  const { language } = useParams();
  const navigate = useNavigate();
  const { movies, languages } = useSelector(
    (state) => state.movie.movieListByLocation
  );
  const FetchingMovieDetailsByLocationAndLanguage = async (
    location,
    language
  ) => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_URL_SERVER
        }/user/movieslist/?search=${location}&q=${language}`
      );
      const data = response.data;
      if (response.status == 200) {
        console.log(data);
        dispatch(movieListingByLocation(data));
      }
    } catch (error) {
      console.error(error);
    }
  };
  const baseUrl = `${import.meta.env.VITE_URL_SERVER}/media/`;

  useEffect(() => {
    FetchingMovieDetailsByLocationAndLanguage(
      JSON.parse(localStorage.getItem("myLocation")),
      language
    );
  }, [language]);
  console.log(movies);

  return (
    <>
      <br />
      <br />
      <div className="container LocationofMovieListingHeading">
        <h5 style={{ letterSpacing: "-1px" }}>
          Movies in {JSON.parse(localStorage.getItem("myLocation"))}
        </h5>
      </div>
      <div className="container MovieListingMainDiv">
        <br />
        <div className="container LanguageMappingInMoveList">
          {languages &&
            languages.map((item, index) => (
              <div
                key={index}
                className='LanguageSingleClassNameInMoVieListing'
              >
                <div onClick={() => navigate(`/movies/${item}`)} key={index}>
                <p style={item == language ? { background: 'var(--secondary-color)',color:'var(--white-color)' } : {}}>
                {item}
                </p>
                </div>
              </div>
            ))}
        </div>
        <br />
        <br />
        <div className="MovieDetailsMainDivInMovieListingByLocationAndLanguage ">
          {movies &&
            movies.map((item, index) => (
              <div
                key={item.id}
                className="movieItemInListing col-md-2"
               
              >
                <Card
                  className="movieDetailsDivinMovieListingBylocatn"
                  style={{
                    width: "12rem",
                    height: "300px",
                    overflow: "hidden",
                  }}
                  onClick={() =>
                    navigate(
                      `/movies/${language}/${item.movie_name}:${item.id}/`
                    )
                  }
                >
                  <Card.Img
                    loading="lazy"
                    variant="top"
                    src={`${baseUrl + item.poster}`}
                    style={{
                      objectFit: "cover",
                      height: "100%",
                      width: "100%",
                    }}
                  />
                </Card>
                <br />
                <div style={{ width: "15rem",letterSpacing:'-1px' }}>
                  <strong>{item.movie_name.slice(0,1).toUpperCase().concat(item.movie_name.slice(1))}</strong>
                  <p style={{marginTop:'4px',color:'grey',marginLeft:'2px'}}>{item.shows__language__name}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default MoviesByLoctnAndLngage;
