import React, { useEffect, useState } from "react";
import "./SecondNavbar.css";
import { useNavigate, useLocation } from "react-router-dom";

const SecondNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedPage, setSelectedPage] = useState("");
  const handleNavigation = (page) => {
    navigate(page);
    setSelectedPage(page);
  };
 

  return (
    <div className="container SecondNavbarMainDiv">
      <div className="secondMainDivInSecondNavbar">
        <div className="innerMainDivForSecondDicInSecondNavbar">
          <h6
            onClick={() => handleNavigation("/movies/all")}
            className={selectedPage === "/movies/all" ? "selected" : ""}
          >
            Movies
          </h6>
        </div>
        <div className="innerMainDivForSecondDicInSecondNavbar">
          <h6
            onClick={() => handleNavigation("/talkies/all")}
            className={selectedPage === "/talkies/all" ? "selected" : ""}
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
