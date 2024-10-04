import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { FcFilmReel } from "react-icons/fc";

import {
  movieListingByLocation,
  dateListing,
} from "../../../Redux/Slices/movieSlice";
import { useNavigate } from "react-router-dom";
import "./css/MoviesByLocationAndNameAndDate.css";
import { AuthContext } from "../../../context/AuthContext";



const MoviesByLocationAndnameAndDate = () => {
  const dispatch = useDispatch();
  const { currentDate } = useContext(AuthContext)
  const { language, movie, dt } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  console.log(language);
  const { movieListByLocation, dateDetails } = useSelector(
    (state) => state.movie
  );
  const FetchingMovieDetailsByMovieNameandDate = async (
    location,
    language,
    movie,
    date
  ) => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_URL_SERVER
        }/user/movieslist/?search=${location}&q=${language}&movie=${movie}&dt=${date}`
      );
      const data = response.data;
      if (response.status == 200) {
        dispatch(movieListingByLocation(data.data));
        dispatch(dateListing(data.dates));
        setLoading(true);
        console.log(data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    FetchingMovieDetailsByMovieNameandDate(
      JSON.parse(localStorage.getItem("myLocation")),
      language,
      movie,
      dt
    );
  }, [dt]);

  console.log(dt);
  return (
    <>
      <div>
        <div className=" DateDivInTimeOfTheatreBooking">
          <div className="DifferencingContainerInNamenadLangugae">
            <div className="container NameAndLanguageContanerIntime">
              <p>
                {movie[0].toUpperCase().concat(movie.slice(1, movie.length))}{" "}
                {language !== "all" && "-" + language}
              </p>
            </div>
          </div>
          <div className="DifferencingContainerInDates">
            <div className="d-flex container ">
              {loading &&
                dateDetails.map((item) => (
                  <div
                    className="DivForTheDateInTheShowTime me-4"
                    onClick={() =>
                      navigate(`/movies/${language}/${movie}/${item}`)
                    }
                  >
                    <div className={item==dt?"DivForTheDateInTheShowTimePDivSelected":dt==currentDate&&item.slice(4,6)==currentDate.slice(8,10)?"DivForTheDateInTheShowTimePDivSelected": "DivForTheDateInTheShowTimePDiv"}>
                      <p>{item.slice(0, 3)}</p>
                      <p className="secondP">{item.slice(4, 6)}</p>
                      <p>{item.slice(7, 10)}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
        <br />
        <br />
        <div>
          <div className="container">
            {loading ? (
              movieListByLocation.map((item, index) => {
                return (
                  <div className="d-flex DivForTHeatreAndShowTImeDifference  align-items-center ">
                    <div
                      key={index}
                      className="divforscreentheatrenameintimemovielist"
                    >
                      <div className="DivForTheTheatreAndScreenShowingInShowTime d-flex align-items-center ">
                      <FcFilmReel style={{marginRight:'12px'}} />
                      <p>
                          <span style={{ margin: "0", padding: "0",fontWeight:'600' }}>
                            {item.theatre_name[0]
                              .toUpperCase()
                              .concat(
                                item.theatre_name.slice(
                                  1,
                                  item.theatre_name.length
                                )
                              )} 
                          </span>  :
                           <span style={{paddingLeft:'3px',fontWeight:'bolder'}}>
                          Screen  {item.screen_number}
                          </span>
                        </p>
                       
                        {language !== "all" && (
                          <p
                            style={{
                              margin: "0px",
                              padding: "0px",
                              fontSize: "13px",
                            }}
                          >
                            {language}
                          </p>
                        )}
                      </div>
                    </div>
                    <div
                      className="ShowTImeDivInMoveisScreenAndTIme"
                      style={{ width: "100%" }}
                    >
                      <div
                        key={index}
                        className="ShowTImeSecondDivInScreenTime"
                      >
                        {item.show_times.map((time) => (
                          <div
                            className="DivForTheTimeStylingInTimeListingOfMovieList"
                            onClick={() =>
                              navigate(
                                `/movies/${language}/${movie}/${dt}/${item.theatre_name}/${item.screen_number}/${time.show_time}`
                              )
                            }
                          >
                            <div className="TimeContainerInTheTimeListingDivInShowTIme">
                              {time.show_time}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <h4>...Loading</h4>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MoviesByLocationAndnameAndDate;
