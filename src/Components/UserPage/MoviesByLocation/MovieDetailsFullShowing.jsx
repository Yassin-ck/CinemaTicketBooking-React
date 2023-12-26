import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { movieListingByLocation } from "../../../Redux/Slices/movieSlice";
import { AuthContext } from "../../../context/Authcontext";
import "./css/MovieDetailsFullShowing.css";
import { Card } from "react-bootstrap";

const MovieDetailsFullShowing = () => {
  const { language, movie } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [locationAuth, setLocationAuth] = useState(false);
  const dispatch = useDispatch();
  const movieDetails = useSelector((state) => state.movie.movieListByLocation);
  const { currentDate } = useContext(AuthContext);
  const FetchMovieSingleDetails = async (movie, id) => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_URL_SERVER
        }/user/moviedetailsview/${movie}/${id}`
      );
      const data = response.data;
      if (response.status === 200) {
        dispatch(movieListingByLocation(data.data));
        console.log(data);
        setLoading(true);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (location.pathname.includes("movieview")) {
      setLocationAuth(true);
    } else {
      setLocationAuth(false);
    }
    let datas = movie.split(":");
    FetchMovieSingleDetails(datas[0], datas[1]);
  }, []);

  console.log(movieDetails);
  const baseUrl = `${import.meta.env.VITE_URL_SERVER}`;

  return (
    <>
      <br />
      {loading &&
        [movieDetails].map((item) => (
          <div className="MainDivForMovieSingleView">
            <div
              className="secondDivForMovieSingleView"
              style={{
                background: `linear-gradient(90deg, #1A1A1A 24.97%, #1A1A1A 38.3%, rgba(26, 26, 26, 0.0409746) 97.47%, #1A1A1A 100%), url(${
                  baseUrl + item.poster
                })`,
                backgroundSize: "cover",
                backgroundPosition: "center ",
                height: "70vh",
                backgroundRepeat: "no-repeat",
                width: "100%",
                display: "flex",
                justifyContent: "flex-start",
                objectFit: "fill",
                position: "relative",
              }}
            >
              <div key={item.id} className="contanierdivformovefullview">
                <div
                  style={{
                    width: "15rem",
                    height: "400px",
                    overflow: "hidden",
                    border: "1px solid lightgrey",
                  }}
                  onClick={() =>
                    navigate(
                      `/movies/${language}/${item.movie_name}:${item.id}/`
                    )
                  }
                >
                  <img
                    loading="lazy"
                    variant="top"
                    src={`${baseUrl + item.poster}`}
                    alt="movie"
                    style={{
                      objectFit: "cover",
                      height: "100%",
                      width: "100%",
                    }}
                  />
                </div>
              </div>
              <div className="InnerDivForNameandDirectorInFullMovieView">
                <div className="namedivinsinglefullmovie">
                  <h3>
                    {item.movie_name[0]
                      .toUpperCase()
                      .concat(
                        item.movie_name
                          .slice(1, item.movie_name.length)
                          .toLowerCase()
                      )}
                  </h3>
                  {language != "all" && <h4>{language}</h4>}
                  <p>
                    Director :{" "}
                    <strong>
                      {item.director[0]
                        .toUpperCase()
                        .concat(
                          item.director.slice(1, item.length).toLowerCase()
                        )}
                    </strong>
                  </p>
                </div>
                {!locationAuth && (
                  <button
                    className=" buttonforbookinginfullmoviedetails"
                    onClick={() =>
                      navigate(
                        `/movies/${language}/${item.movie_name}/${currentDate}`
                      )
                    }
                  >
                    Book Tickets
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      {loading&&movieDetails.rating.length!=0&&<div className="container text-light RatingAndReviewMainContainerDiv">
        <div className="RatingAndReviewHeadingAndSummaryDiv">
          <div className="RatingAndReviewHeaidngIinerDivSection1">
            <h4>Top Reviews</h4>
            <h5>Add Review</h5>
          </div>
          <div className="RatingAndReviewHeaidngIinerDivSection2">
            <p>Summary of Review</p>
          </div>
        </div>
        <div className="RatingAndReviewSecondContainerDiv">
          <div className="RatingAndReviewContentDiv">
            {loading &&
              [movieDetails].map((item) => (
                <div
                  key={item.id}
                  className="RatingAndReviewSingleContentContainer"
                >
                  {item.rating.map((rate) => (
                    <div
                      key={rate.id}
                      className="RatingAndReviewSingleDataContainer"
                    >
                      <div className="RatingAndReviewUsernameAndStarContainer">
                        <div className="username">
                          {rate.user.username
                            ? rate.user.username
                            : rate.user.email.split("@")[0]}
                        </div>
                        <div className="star"> {rate.star} </div>
                      </div>
                      <div className="RatingAndReviewTextReviewContainer">
                        <p> {rate.review && rate.review.review}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
          </div>
        </div>
      </div>}
    </>
  );
};

export default MovieDetailsFullShowing;
