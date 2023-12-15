import React, { useEffect, useState } from "react";
import axios from "axios";
import { theareListingAction } from "../../../Redux/Slices/theatreSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { dateListing } from "../../../Redux/Slices/movieSlice";
import "./css/TheatreWithScreenDetails.css";

const TheatreWithScreenDetails = () => {
  const dispatch = useDispatch();
  const { cinemas, dt } = useParams();
  const { movie, theatre } = useSelector((state) => state);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    const FetchTheatrelistByLocation = async (location, cinemas, date) => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_URL_SERVER
          }/user/theatrelist/?search=${location}&cinemas=${cinemas}&dt=${date}`
        );
        const data = response.data;
        if (response.status === 200) {
          console.log(data);
          dispatch(theareListingAction(data.data));
          dispatch(dateListing(data.dates));

          setLoading(true);
        }
      } catch (error) {
        console.error(error);
      }
    };
    
    const storedLocation = JSON.parse(localStorage.getItem("myLocation"));
    if (storedLocation) {
      FetchTheatrelistByLocation(storedLocation, cinemas, dt);
    }
  }, [dt]);
  console.log(theatre.theatreList,'kjhgf');
  
  return (
    <>
    <div className=" MainContainerDivForTheatreWithScreenDetails">
    <div className="container SecondMainContainerdivForTheareWithScreenDetails">
    <h6 >{cinemas[0].toUpperCase().concat(cinemas.slice(1,cinemas.length))}</h6> 
          <div className="DateDifferencingInTheatreWithScreenDetails">
            {loading &&
              movie.dateDetails &&
              movie.dateDetails.map((date, index) => (
                  <div className="OnclickDateDivInTheatreWithScreenDetails" key={index.id}
                   onClick={()=>navigate(`/talkies/${cinemas}/${date}`)}>
                  <p>{date.slice(0, 3)}</p>
                  <p>{date.slice(4, 6)}</p>
                  <p>{date.slice(7, 10)}</p>
                  </div>
                
              ))}
          </div>
          <div className="TheatreDetailsDifferencingDivInTheatreWithScreenDetails" >
            {loading &&
              theatre.theatreList &&
              theatre.theatreList.map((theatre, index) => (
                  <div
                    key={index}
                    className="TheatreDivInTheatreWithScreenDetails"
                    >
                    <div className="DifferncingInTheatreWithScreenDetails">
                    <div>
                    <h5>{theatre.screen_number}</h5>
                    </div>
                    <div  className="divinsidesingledetailingbyTheatreViebylocation">
                    {theatre.details.map((item,index)=>(
                      <div key={index}
                      data-tooltip={`${item.language}`} 
                      onClick={()=>navigate(`/movies/${item.language}/${item.movie_name}/${dt}/${cinemas}/${theatre.screen_number}/${item.show_time}`)}
                      className="SingleDetailingOfScreensinTheatreWithScreenDetails">
                      
                      <p><strong>{item.show_time}</strong></p> 
                      <p className="movielang">{item.movie_name}</p>
                        
                        </div>
                        
                        ))}
                        </div>
                      </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default TheatreWithScreenDetails;
