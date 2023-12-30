import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { movieListingByLocation } from "../../../Redux/Slices/movieSlice";
import { Button } from 'react-bootstrap'
import "./css/ScreenDetailsInByScreenNumber.css";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../context/Authcontext"
import toast from "react-hot-toast";

const ScreenDetailsByScreenNumber = () => {
  const dispatch = useDispatch();
  const { user } = useContext(AuthContext)
  const { language, movie, cinemas, screen, dt, tm } = useParams();
  const [seating, setSeating] = useState([]);
  const [loading, setLoading] = useState(false);
  const { movieListByLocation } = useSelector((state) => state.movie);

  const FetchingScreenDetailsOfTheatre = async (location, language, movie, date, cinemas, screen, time) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_URL_SERVER}/user/movieslist/?search=${location}&q=${language}&movie=${movie}&dt=${date}&cinemas=${cinemas}&screen=${screen}&tm=${time}`
      );
      const data = response.data;
      if (response.status === 200) {
        console.log(data);
        dispatch(movieListingByLocation(data));
        setLoading(true);
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  const seatBookingHandler = async (date, time, tickets, theatre_name, screen_number) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_URL_SERVER}/user/ticketcaching/`,
        {
          date: date,
          time: time,
          tickets: [tickets],
          theatre_name: theatre_name,
          screen_number: screen_number,
        }
      );
      const data = response.data;
      if (response.status === 200) {
        localStorage.setItem('cache_id', JSON.stringify(data.cache_id));
        FetchingScreenDetailsOfTheatre(
          JSON.parse(localStorage.getItem("myLocation")),
          language,
          movie,
          dt,
          cinemas,
          screen,
          tm
        );
      }
    } catch (error) {
      
    
    
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_URL_SERVER}/user/createcheckoutsession/`,
        null,
      );


      const data = response.data
      if (response.status==200){
        window.location.href = data;
      }

    } catch (error) {
       if (error.response.status == 500){
      toast.error('Network Error!')
    }
      console.error(error);
    }
  };
  const clearCacheBackend = async () => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_URL_SERVER}/user/ticketcaching/`
    );
    console.log(response);
  } catch (error) {
   
    console.error(error);
  }
};
const handleToast = ()=>{
  toast.error('Login to continue')
}

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

    return () => {
      clearCacheBackend()
    };
  }, []);

  const seatSelectionHandler = (seat) => {
    if (seat.slice(-1) === 'b'){
      let newSeat = seating.map((item)=>{return item!==seat.slice(-1)})
      setSeating(newSeat);  
    }else if (seat.slice(-1) !== 'w' ){
      setSeating((prevSeating) => [...prevSeating, seat]);
    }
    seatBookingHandler(dt, tm, seat, cinemas, screen);
  };
console.log(seating,typeof(seating));
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="container MainDivInScreenSeatDetails">
          <div className="InnerDivForTheTheatreNameAndDetailsInscreenDetails ">
            {loading ? (
              [movieListByLocation].map((item, index) => (
                <div key={index} className="container ContianerDivForTheSeatArrangements">
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
                  <div>
                    {item.seating.map((seats, index) => (
                      <div key={index}>
                        <div className="InnerDivForSeatArrangementInScreenDetails">
                          <p style={{ color: 'var(--secondary-color)', fontWeight: '600' }}></p>
                          {seats.map((seat, index) => (
                            <div className="SeatDivInScreenDetailsByScreen" onClick={user ? (e) => seatSelectionHandler(seat) :(e)=>handleToast(e)}>
                              {" "}
                              <center
                                className={
                                 user&&seating&&seat == seating[0] | seat == seating[0]+"w"
                                    ? "seatAlphaDivbackgroundgreen"
                                    :user&& seat.slice(-1) == "b" 
                                    ? "seatAlphaDivbackgroundgreen"
                                    : seat.slice(-1) == "w"
                                    ? "seatAlphaDivbackgroundLight"
                                    : "seatAlphaDiv"
                                }
                              >
                                {user&&seating&&seat == seating.slice(-1) | seat.slice(-1) == "b" ?seat.slice(0, -1):  seat.slice(-1) == "w" ? seat.slice(0, -1) : seat.slice(0, 3)}</center>
                              
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
        {user&&seating.length!==0&&<center style={{ position: 'sticky', bottom: '0px', width: '100%', height: '7vh', background: ' #7e7f83',boxShadow:'box-shadow: rgba(0, 0, 0, 0.16) 0px 1p'}}>
        <Button type='submit' className='buttononprofilecrud' style={{outline:'none',border:'none', background: 'rgba(150,80,90,1)', marginTop: '10px', color: '#fff', width: '300px' }}>Checkout</Button>
        </center>}
      </form>
    </>
  );
};

export default ScreenDetailsByScreenNumber;

