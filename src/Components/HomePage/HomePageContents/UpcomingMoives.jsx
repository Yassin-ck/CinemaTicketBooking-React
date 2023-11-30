import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import "./UpcomingMovies.css";

const UpcomingMovies = () => {
  const [movieData, setMovieData] = useState([]);

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
              className={`col-md-3 ${index > 3 ? "mt-4" : ""}`}
            >
              <Card
                className="MainCardInUpcomigMovies"
                style={{ width: "15rem", height: "400px", overflow: "hidden" }}
              >
                <Card.Img
                  loading="lazy"
                  className="ImageInUpcomigMovies"
                  variant="top"
                  src={`${baseUrl + movie.poster}`}
                  style={{ objectFit: "cover", height: "100%", width: "100%" }}
                />
                <center className="movienamedivinupcomingmovies">
                  {movie.movie_name}
                </center>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default UpcomingMovies;
