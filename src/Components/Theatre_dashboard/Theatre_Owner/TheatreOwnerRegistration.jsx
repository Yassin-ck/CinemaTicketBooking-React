import axios from "axios";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import OtpModalForVerification from "../Modals/OtpModalForVerification";
import "./TheatreOwnerRegistration.css";

const TheatreOwnerRegistration = () => {
  const { authToken } = useContext(AuthContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [sid, setSid] = useState(null);

  const [registerData, setRegisterData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    alternative_contact: "",
    id_proof: null,
    id_number: "",
    address: "",
  });

  const dataHandler = (e) => {
    console.log(e);
    if (e.target.name == "id_proof") {
      setRegisterData({ ...registerData, [e.target.name]: e.target.files[0] });
    } else {
      setRegisterData({ ...registerData, [e.target.name]: e.target.value });
    }
  };

  const TheatreOwnerRegistrationForm = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("first_name", registerData.first_name);
    formData.append("last_name", registerData.last_name);
    formData.append("email", registerData.email);
    formData.append("phone", registerData.phone);
    formData.append("alternative_contact", registerData.alternative_contact);
    formData.append("id_proof", registerData.id_proof);
    formData.append("id_number", registerData.id_number);
    formData.append("address", registerData.address);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_URL_SERVER}/theatre/owner/register/`,
        formData
      );
      const data = response.data;
      console.log(data);
      if (response.status == 201) {
        console.log(data);
        setSid(data.verification_sid);
        setModalOpen(true);
        alert(data.msg);
      } else {
        console.warn(data);
      }
    } catch (error) {
      let errorss = error.response.data.errors;
      console.log(errorss);
      for (let field in errorss) {
        console.log({ [field]: errorss[field] });
      }
    }
  };

  return (
    <div className="container ContanierDivForRegistrationOftheatreOwner">
      <div className="ImageContainerInTheatreOwnerRegistration">
        <img src="https://images.unsplash.com/photo-1549497538-303791108f95?q=80&w=1961&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
      </div>
      <div
        className="FormDivInTheatreOwnerRegistration"
        style={{ background: "lightgrey" }}
      >
        <form onSubmit={TheatreOwnerRegistrationForm} autoComplete="off">
          <div className="mt-3 mb-5">
            <h3 style={{ letterSpacing: "-1.6px" }}>
              Theatre Owner Registration
            </h3>
          </div>
          <div className="MainDivContainerForTheatreOwnerRegistration">
            <div class="inputForTheatreOwnerRegistraionDiv ">
              <label for="first_name">first name </label>
              :{" "}
              <input
                name="first_name"
                type="text"
                onChange={dataHandler}
                pattern="[a-zA-Z]*"
              />
            </div>
            <div class="inputForTheatreOwnerRegistraionDiv">
              <label for="last_name">last name </label>
              :
              <input
                name="last_name"
                type="text"
                onChange={dataHandler}
                pattern="[a-zA-Z]*"
              />
            </div>
            <div className="InputDivInTheatreOwnerRegistration">
              <div class="inputForTheatreOwnerRegistraionDiv">
                <label for="email">email </label>
                : <input name="email" type="email" onChange={dataHandler} />
              </div>
            </div>
            <div class="inputForTheatreOwnerRegistraionDiv">
              <label for="phone">Mobile Number </label>
              :
              <input
                pattern="[0-9+]*"
                name="phone"
                type="text"
                onChange={dataHandler}
              />
            </div>
            <div class="inputForTheatreOwnerRegistraionDiv">
              <label for="alternative_contact">Alternative contact</label>
              :
              <input
                name="alternative_contact"
                type="text"
                onChange={dataHandler}
                pattern="[0-9+]*"
              />
            </div>
            <div className="inputForTheatreOwnerRegistraionDiv">
              <label for="id_proof">Id proof </label>
              :
              <input
                className="idproofinput"
                name="id_proof"
                type="file"
                onChange={dataHandler}
              />
            </div>
            <div class="inputForTheatreOwnerRegistraionDiv">
              <label for="id_number">Id number </label>
              :
              <input
                name="id_number"
                type="text"
                onChange={dataHandler}
                pattern="[0-9]*"
              />
            </div>
            <div class="inputForTheatreOwnerRegistraionDiv">
              <label for="address">Address </label>
              :
              <input
                name="address"
                type="text"
                onChange={dataHandler}
                pattern="[a-zA-Z0-9]*"
              />
            </div>
            <div>
              <button
                className="btn buttonfortheatreownerregistration"
                type="submit"
              >
                Submit{" "}
              </button>
            </div>
          </div>
        </form>
      </div>
      {modalOpen && <OtpModalForVerification sid={sid} />}
    </div>
  );
};

export default TheatreOwnerRegistration;
