import React, { useEffect, useState } from "react";
import "./SecondNavbar.css";
import { useNavigate, useLocation } from "react-router-dom";

const SecondNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedPage, setSelectedPage] = useState("");
  const handleNavigation = (page) => {
    navigate(page);
  };
 useEffect(()=>{
  console.log(location.pathname);
if (location.pathname.includes('movies')){
setSelectedPage("movies")
}else if (location.pathname.includes('talkies')){
setSelectedPage("talkies")
}else{
  setSelectedPage("")
}
 },[handleNavigation])
 console.log(selectedPage);

  return (
    <div className="container SecondNavbarMainDiv">
      <div className="secondMainDivInSecondNavbar">
        <div className="innerMainDivForSecondDicInSecondNavbar">
          <h6
            onClick={() => handleNavigation("/movies/all")}
            className={selectedPage === "movies" ? "selected" : null}
          >
            Movies
          </h6>
        </div>
        <div className="innerMainDivForSecondDicInSecondNavbar">
          <h6
            onClick={() => handleNavigation("/talkies/all")}
            className={selectedPage === "talkies" ? "selected" :null}
          >
            Theatres
          </h6>
        </div>
        <div className="innerMainDivForSecondDicInSecondNavbar">
          <h6>List Your Show</h6>
        </div>
        <div className="innerMainDivForSecondDicInSecondNavbar">
          <h6>Offers</h6>
        </div>
      </div>
    </div>
  );
};

export default SecondNavbar;
