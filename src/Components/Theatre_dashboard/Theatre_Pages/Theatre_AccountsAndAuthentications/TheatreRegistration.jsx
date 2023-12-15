import axios from "axios";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../../../context/authcontext";
import ScreensViewForUpdation from "../ScreenDetails/ScreensViewForUpdation";
import "./css/TheatreRegistration.css";
import { RiArrowRightCircleFill } from "react-icons/ri";

const TheatreRegistration = () => {
  const { authToken } = useContext(AuthContext);
  const [screenModal, setScreenModal] = useState(false);
  const [theatreData, setTheatreData] = useState({
    theatre_name: "",
    email: "",
    phone: "",
    alternative_contact: "",
    num_of_screens: "",
    certification: null,
  });

  const dataHandler = (e) => {
    if (e.target.name == "certification") {
      setTheatreData({ ...theatreData, [e.target.name]: e.target.files[0] });
    } else {
      setTheatreData({ ...theatreData, [e.target.name]: e.target.value });
    }
  };

  const TheatreRegitrationPosting = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("theatre_name", theatreData.theatre_name);
    formData.append("email", theatreData.email);
    formData.append("phone", theatreData.phone);
    formData.append("alternative_contact", theatreData.alternative_contact);
    formData.append("num_of_screens", theatreData.num_of_screens);
    formData.append("certification", theatreData.certification);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_URL_SERVER}/theatre/register/`,
        formData
      );
      const data = response.data;
      if (response.status == 200) {
        console.log(data);
        localStorage.setItem(
          "authToken",
          JSON.stringify(error.response.data.token)
        );
        setScreenModal(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container MainContainerDivForTheatreRegistrationForm">
      <div className="container MainFormDivForTheatreRegistrationForm">
      <div className="formdivintheatreregistrationMain">
      <form onSubmit={TheatreRegitrationPosting}>
      <div className="TheatreRegistrationHeading">
      <h2>Theatre Registration</h2>
          </div>
          <div className="MainContainerInputDivOfTheatreRegistrationForm">
            <div className="InputDivofTheatreRegistrationForm">
            <label>Theatre Name</label>
            <input
                name="theatre_name"
                type="text"
                onChange={dataHandler}
                pattern="[a-zA-Z]*"
              />
            </div>
            <div className="InputDivofTheatreRegistrationForm">
              <label>Theatre Email</label>
              <input name="email" type="email" onChange={dataHandler} />
              </div>
              <div className="InputDivofTheatreRegistrationForm">
              <label>Phone Number</label>
              <input
                name="phone"
                type="text"
                onChange={dataHandler}
                pattern="[0-9+]*"
                />
            </div>
            <div className="InputDivofTheatreRegistrationForm">
              <label>Alternative Contact</label>
              <input
                name="alternative_contact"
                type="text"
                onChange={dataHandler}
                pattern="[0-9+]*"
                />
            </div>
            <div className="InputDivofTheatreRegistrationForm">
            <label>Number Of screens</label>
            <input
                name="num_of_screens"
                type="text"
                onChange={dataHandler}
                pattern="[0-9]*"
                />
            </div>
            <div className="InputDivofTheatreRegistrationForm ">
            <label>Certifications</label>
            <input name="certification" className="Certifications" type="file" onChange={dataHandler} />
            </div>
            {screenModal && <ScreensViewForUpdation />}
            </div>
            <div className="buttonDivForTheatreRegistraion mt-5">
            <button data-tooltip="submit">
            <RiArrowRightCircleFill
            color="rgb(102, 101, 101)"
            className="buttonbIcon"
            size={50}
            />{" "}
            </button>
            </div>
            </form>
            </div>
            </div>
    </div>
  );
};

export default TheatreRegistration;
