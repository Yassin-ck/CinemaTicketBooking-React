import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { movieListingByLocation } from "../../../Redux/Slices/movieSlice";
import { Link, useNavigate } from "react-router-dom";

const ScreenDetailsByScreenNumber = () => {
  const dispatch = useDispatch();
  const { language, movie, cinemas, screen,dt } = useParams();
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
  ) => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_URL_SERVER
        }/user/movieslist/?search=${location}&q=${language}&movie=${movie}&dt=${date}&cinemas=${cinemas}&screen=${screen}`
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
  console.log(movieListByLocation,'kk');

  useEffect(() => {
    FetchingScreenDetailsOfTheatre(
      JSON.parse(localStorage.getItem("myLocation")),
      language,
      movie,
      dt,
      cinemas,
      screen,
    );
  }, []);

  return (
    <>
      {loading ? (
        [movieListByLocation].map((item, index) => (
          <div key={index}>
            <h6>{item.movie_name}</h6>
            <h6>{item.theatre_name}</h6>
            <h6>{item.screen_number}</h6>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                rowGap: "15px",
              }}
            >
              {item.seating.map((seats, index) => (
                <div key={index}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center",
                    }}
                  >
                    {seats.map((seat, index) => (
                      <div key={index}>
                        <input
                          readOnly
                          className="btn "
                          style={{ width: "40px", padding: "7px 0px" }}
                          value={seat}
                        />
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
    </>
  );
};

export default ScreenDetailsByScreenNumber;
