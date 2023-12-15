import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./css/ScreenDetailsUpdating.css";

const ScreenDetailsUpdating = () => {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [screenState, setScreenState] = useState([]);
  const { id } = useParams();

  const screenDetailsAddingSubmission = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_URL_SERVER}/theatre/screendetailsform/${id}/`,
        {
          screen_number: inputRef.current.screen_number.value,
          number_of_seats: inputRef.current.number_of_seats.value,
          column_count: inputRef.current.column_count.value,
          row_count: inputRef.current.row_count.value,
        }
      );
      const data = response.data;
      if (response.status == 200) {
        navigate(`/theatre/seatarrangemnt/${id}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const screenDetailsAddingGet = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_URL_SERVER}/theatre/screendetailsform/${id}/`
      );
      const data = response.data;
      if (response.status == 200) {
        setScreenState(data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    screenDetailsAddingGet();
  }, []);

  return (
    <div>
      <div className="container screenMainDivOutsideInScreenDetailsUpdating MainContainerDivForTheatreRegistrationForm">
        <div className="container  ScreenDetailsFormForUpdating">
          <div className="ImageContainerForScreenDetailsUpdating">
            <img
            src="https://img.freepik.com/free-vector/seamless-pattern-with-cinema-elements_225004-1154.jpg?w=740&t=st=1701350150~exp=1701350750~hmac=551127677665c1d83a978cd2cda7698f68b0a8ebaa954a04b9b6b605c6c30ebc" />
          </div>
          {[screenState].map((item) => (
            <div className="MainDivForFormInScreenUpdatingForm">
              <form
                autoComplete="off"
                ref={inputRef}
                onSubmit={(e) => screenDetailsAddingSubmission(e)}
              >
                <div className="MainDivForInputLabelInScreenDetailsUpdatingForm">
                  <div className="ScreenDetailsHeadingInscreenDetails">
                    <h3>ScreenDetails</h3>
                  </div>
                  <div className="InputLabelForScreenDetailsUpdating">
                    <input
                      name="screen_number"
                      defaultValue={item.screen_number}
                      type="text"
                      required
                    />
                    <label>Screen Number</label>
                  </div>
                  <div className="InputLabelForScreenDetailsUpdating">
                    <input
                      name="number_of_seats"
                      required
                      defaultValue={item.number_of_seats}
                      type="text"
                    />
                    <label>Number of seats</label>
                  </div>
                  <div className="InputLabelForScreenDetailsUpdating">
                    <input
                      name="column_count"
                      type="text"
                      required
                      defaultValue={item.column_count}
                    />
                    <label>Column Count</label>
                  </div>
                  <div className="InputLabelForScreenDetailsUpdating">
                    <input
                      name="row_count"
                      defaultValue={item.row_count}
                      required
                      type="text"
                    />
                    <label>Row Count</label>
                  </div>
                  <div className="ButtonDivInTheSceenDetailsUpdation">
                    <button type="submit">Save Changes</button>
                  </div>
                </div>
              </form>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScreenDetailsUpdating;
