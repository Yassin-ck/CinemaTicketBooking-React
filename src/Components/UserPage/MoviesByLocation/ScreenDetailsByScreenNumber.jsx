import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { movieListingByLocation } from "../../../Redux/Slices/movieSlice";
import { Link, useNavigate } from "react-router-dom";
import "./css/ScreenDetailsInByScreenNumber.css";


const ScreenDetailsByScreenNumber = () => {
  const dispatch = useDispatch();
  const { language, movie, cinemas, screen, dt, tm } = useParams();
  console.log(cinemas, screen);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { movieListByLocation } = useSelector((state) => state.movie);
  const FetchingScreenDetailsOfTheatre = async (
    location,
    language,
    movie,
    date,
    cinemas,
    screen,
    time
  ) => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_URL_SERVER
        }/user/movieslist/?search=${location}&q=${language}&movie=${movie}&dt=${date}&cinemas=${cinemas}&screen=${screen}&tm=${time}`
      );
      const data = response.data;
      if (response.status == 200) {
        dispatch(movieListingByLocation(data));
        setLoading(true);
      }
    } catch (error) {
      console.error(error);
    }
  };
  console.log(movieListByLocation, "kk");

  useEffect(() => {
    FetchingScreenDetailsOfTheatre(
      JSON.parse(localStorage.getItem("myLocation")),
      language,
      movie,
      dt,
      cinemas,
      screen,
      tm
    );
  }, []);

  return (
    <>
      <div className="container MainDivInScreenSeatDetails">
        <div className="InnerDivForTheTheatreNameAndDetailsInscreenDetails ">
          {loading ? (
            [movieListByLocation].map((item, index) => (
              <div
                key={index}
                className="container  ContianerDivForTheSeatArrangements"
              >
                <div className="container nameTheatreScreenDetailsAndSeatArrangement">
                  <div>
                    <h6>{item.movie_name}</h6>
                    <h6>{item.show_time}</h6>
                  </div>
                  <div>
                    <h6>{item.theatre_name}</h6>
                    <h6>{item.screen_number}</h6>
                  </div>
                </div>
                <div className="">
                  {item.seating.map((seats, index) => (
                    <div key={index}>
                      <div className="InnerDivForSeatArrangementInScreenDetails">
                      <p style={{color:'var(--secondary-color)',
                                fontWeight:'600',
                                
                              }}>
                        {seats[0][0]}
                      </p>
                        {seats.map((seat, index) => (
                          
                          <div className="SeatDivInScreenDetailsByScreen">
                            {" "}
                            <center className="seatAlphaDiv">
                             <center>{seat.slice(1,3)}</center>
                            </center>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <p>...loading</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ScreenDetailsByScreenNumber;
