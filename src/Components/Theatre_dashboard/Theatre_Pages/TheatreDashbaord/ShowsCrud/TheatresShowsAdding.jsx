import axios from "axios";
import React, { useEffect, useState } from "react";
import MovieAndLanguageListing from "./MovieAndLanguageListing";
import { useParams } from "react-router-dom";
import "./css/TheatresShowsAdding.css"
import { IoRefreshCircleSharp } from "react-icons/io5";


const TheatresShowsAdding = () => {
  const { id } = useParams();
  const [movieDisable, setMovieDisable] = useState(false);
  const [languageDisable, setLanguageDisable] = useState(false);
  const [timeDisable, setTimeDisable] = useState(false);
  const [dateDisable, setDateDisable] = useState(false);
  const [timeSubmit, setTimeSubmit] = useState(false);
  const [dateSubmit, setDateSubmit] = useState(false);
  const [showData, setShowdata] = useState([
    {
      movies: null,
      language: null,
      screen: parseInt(id),
      show_dates: [],
      show_time: [],
    },
  ]);
  const [movieSelection, setMovieSelection] = useState(false);
  const [languageSelection, setLanguageSelection] = useState(false);
  const [dateSelection, setDateSelection] = useState(false);
  const [timeSelection, setTimeSelection] = useState(false);
  const ShowDetailsAdding = async (e) => {
    console.log('ko');
    e.preventDefault();
    try {
      const [datas] = showData;
      const response = await axios.post(
        `${import.meta.env.VITE_URL_SERVER}/theatre/showview/`,
        datas
      );
      const data = response.data;
      if (response.status == 200) {
        setShowdata([
          {
            movies: null,
            language: null,
            screen: parseInt(id),
            show_dates: [],
            show_time: [],
          },
        ]);
        setDateSubmit(false);
        setTimeSubmit(false);
        console.log(data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  console.log(showData);

  const DataSelectionHandler = (e) => {
    if (e == "movie") {
      setMovieSelection(!movieSelection);
      setLanguageSelection(false);
      setDateSelection(false);
      setTimeSelection(false);
    } else if (e == "language") {
      setLanguageSelection(!languageSelection);
      setMovieSelection(false);
      setDateSelection(false);
      setTimeSelection(false);
    } else if (e == "time") {
      setTimeSelection(!timeSelection);
      setLanguageSelection(false);
      setMovieSelection(false);
      setDateSelection(false);
    } else {
      setDateSelection(!dateSelection);
      setTimeSelection(false);
      setLanguageSelection(false);
      setMovieSelection(false);
    }
  };
  
  useEffect(() => {
    if (
      showData[0].movies == null &&
      showData[0].language == null &&
      showData[0].show_dates.length == 0 &&
      showData[0].show_time.length == 0
    ) {
      setMovieDisable(false);
      setLanguageDisable(true);
      setTimeDisable(true);
      setDateDisable(true);
    } else if (
      showData[0].movies != null &&
      showData[0].language == null &&
      showData[0].show_dates.length == 0 &&
      showData[0].show_time.length == 0
    ) {
      setMovieDisable(true);
      setLanguageDisable(false);
      setTimeDisable(true);
      setDateDisable(true);
    } else if (
      showData[0].movies != null &&
      showData[0].language != null &&
      showData[0].show_dates.length == 0 &&
      !timeSubmit
    ) {
      setMovieDisable(true);
      setLanguageDisable(true);
      setTimeDisable(false);
      setDateDisable(true);
    } else if (
      showData[0].movies != null &&
      showData[0].language != null &&
      showData[0].show_time.length != 0 &&
      !dateSubmit
    ) {
      setMovieDisable(true);
      setLanguageDisable(true);
      setTimeDisable(true);
      setDateDisable(false);
    } else {
      setMovieDisable(true);
      setLanguageDisable(true);
      setTimeDisable(true);
      setDateDisable(true);
    }
  }, [showData, movieDisable, languageDisable, timeDisable, dateDisable]);

  return (
    <div className="container TheatreShowsAddingMainContainerDiv">
    <div  className="refreshIconInTheatreShowsAdding"  onClick={()=>setShowdata([
      {
        movies: null,
        language: null,
        screen: parseInt(id),
        show_dates: [],
        show_time: [],
      },
    ])}>{showData[0].movies&&<IoRefreshCircleSharp color="white"  size={30} />}</div>

      <div className="TheatreShowsAddingFormContainerDiv">
        <form onSubmit={dateSubmit ? (e) => ShowDetailsAdding(e) :(e) => e.preventDefault() }>
          <div className="TheatreShowsAddingFormInnerMainDiv">
            <div
              className={
                !movieDisable
                  ? "TheatreShowsAddingInputDiv"
                  : "TheatreShowsAddingInputDivDisabled"
              }
            >
              <div className="InputDivInTheatreShowsAdding">
                <input
                  onClick={
                    !movieDisable ? (e) => DataSelectionHandler("movie") : null
                  }
                  type="button"
                  value="Movie"
                  required
                />
              </div>
              <div className="DataDivInTheatreShowsAdding">
                {movieSelection && !movieDisable && (
                  <MovieAndLanguageListing
                    data={"movie"}
                    state={showData}
                    setState={setShowdata}
                  />
                )}
              </div>
            </div>
            <div
              className={
                !languageDisable
                  ? "TheatreShowsAddingInputDiv"
                  : "TheatreShowsAddingInputDivDisabled"
              }
            >
              <div className="InputDivInTheatreShowsAdding">
                <input
                  onClick={
                    !languageDisable
                      ? (e) => DataSelectionHandler("language")
                      : null
                  }
                  type="button"
                  value="Langugae"
                  required
                />
              </div>
              <div className="DataDivInTheatreShowsAdding">
                {languageSelection && !languageDisable && (
                  <MovieAndLanguageListing
                    data={"language"}
                    state={showData}
                    setState={setShowdata}
                  />
                )}
              </div>
            </div>
            <div
              className={
                !timeDisable
                  ? "TheatreShowsAddingInputDiv"
                  : "TheatreShowsAddingInputDivDisabled"
              }
            >
              <div className="InputDivInTheatreShowsAdding">
                <input
                  onClick={
                    !timeDisable ? (e) => DataSelectionHandler("time") : null
                  }
                  type="button"
                  value="Show time"
                  required
                />
              </div>
              <div className="DataDivInTheatreShowsAdding">
                {timeSelection && !timeDisable && (
                  <MovieAndLanguageListing
                    data={"time"}
                    state={showData}
                    setState={setShowdata}
                    disableState={setTimeDisable}
                    setSubmit={setTimeSubmit}
                  />
                )}
              </div>
            </div>
            <div
              className={
                !dateDisable
                  ? "TheatreShowsAddingInputDiv"
                  : "TheatreShowsAddingInputDivDisabled"
              }
            >
              <div className="InputDivInTheatreShowsAdding">
                <input
                  onClick={
                    !dateDisable ? (e) => DataSelectionHandler("dates") : null
                  }
                  type="button"
                  value="Show dates"
                  required
                />
              </div>
              <div className="DataDivInTheatreShowsAdding">
                {dateSelection && !dateDisable && (
                  <MovieAndLanguageListing
                    data={"dates"}
                    state={showData}
                    setState={setShowdata}
                    disableState={setDateDisable}
                    setSubmit={setDateSubmit}
                  />
                )}
              </div>
            </div>

            <div
              className={
                dateSubmit
                  ? "TheatreShowsAddingButtonDiv"
                  : "TheatreShowsAddingButtonDivDisabled"
              }
            >
              <input type="submit" value="submit" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TheatresShowsAdding;
