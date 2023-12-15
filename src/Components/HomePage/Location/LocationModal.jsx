import React, { useContext, useState } from "react";
import "./LocationModal.css";
import { TfiSearch } from "react-icons/tfi";
import { MdLocationSearching } from "react-icons/md";
import axios from "axios";

import {
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalBody,
} from "mdb-react-ui-kit";
import { IoAddSharp } from "react-icons/io5";
import { MdOutlineDone } from "react-icons/md";
import { AuthContext } from "../../../context/authcontext";
import toast from "react-hot-toast";
import { ErrorOutline } from "@mui/icons-material";

export default function LocationModal({ optSmModal, setOptSmModal }) {
  const { authToken, user, setModalOpen } = useContext(AuthContext);
  const [newLocationRequestData, SetNewLocationRequestData] = useState({
    country: "",
    district: "",
    state: "",
    place: "",
  });
  console.log(user);
  const [newLocationRequest, setNewLocationRequest] = useState(false);
  const [locationFetched, setLocationFetched] = useState([]);
  const GetCurrentLocation = async () => {
    try{

      const response = await axios.get(
        `${import.meta.env.VITE_URL_SERVER}/currentlocation/`
        );
        const data = response.data;
        if (response.status == 200) {
          console.log(data);
          localStorage.setItem("myLocation", JSON.stringify(data.city));
          window.location.reload();
        }
      }catch(error){
        toast.error('Network Error')
      }
  };

  const NewlocationVerificationPost = async (e) => {
    console.log(e);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_URL_SERVER}/theatre/searchlocation/`,
        e
      );
      const data = response.data;
      if (response.status == 200) {
        setOptSmModal(!optSmModal);
        toast.success(data.msg);
      }
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const searchForNewLocation = async (e) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_URL_SERVER}/theatre/searchlocation/?q=${e}`
      );
      const data = response.data;
      setLocationFetched();
      if (response.status === 200) {
        data.map((item) => {
          const newItem = [];
          if (item.district.toLowerCase().includes(e.toLowerCase())) {
            newItem.push(item.district);
          }
          if (item.place.toLowerCase().includes(e.toLowerCase())) {
            newItem.push(item.place);
          }

          setLocationFetched(newItem);
        });
      }
    } catch (error) {
      console.log(error);
      setLocationFetched();
    }
  };

  const locationSearched = (e) => {
    localStorage.setItem("myLocation", JSON.stringify(e));
    window.location.reload();
  };
  const getSearchLocation = (e) => {
    SetNewLocationRequestData({
      country: "",
      district: "",
      state: "",
      place: "",
    });
    searchForNewLocation(e.target.value);
    setNewLocationRequest(false);
  };
  const VerifyingNewLocationReqeust = () => {
    NewlocationVerificationPost(newLocationRequestData);
  };
  const newLocationRequestHandler = () => {
    if (user) {
      setNewLocationRequest(!newLocationRequest);
    }
  };

  const locationValueCollecter = (e) => {
    SetNewLocationRequestData({
      ...newLocationRequestData,
      [e.target.name]: e.target.value,
    });
  };
  console.log(user);
  return (
    <>
      <MDBModal show={optSmModal} setShow={setOptSmModal}>
        <MDBModalDialog size="lg" onClick={(e) => e.stopPropagation()}>
          <MDBModalContent
            className="ModalContentForLocation"
            style={{ borderRadius: "0px" }}
          >
            <MDBModalHeader className="ModalHeaderForLocation">
              <div className="ModalSearchDivForLocation">
                <TfiSearch
                  size={14}
                  color="grey"
                  style={{ position: "absolute", top: "30px", left: "28px" }}
                />
                <input
                  onChange={(e) => getSearchLocation(e)}
                  placeholder="search your city here"
                />
                {locationFetched &&
                  locationFetched.map((item) => (
                    <input
                      type="submit"
                      className="SearchShowingBoxForLocation"
                      onClick={(e) => locationSearched(item)}
                      value={item}
                    />
                  ))}

                {newLocationRequestData &&
                newLocationRequestData.country !== "" &&
                newLocationRequestData.state !== "" &&
                newLocationRequestData.district !== "" &&
                newLocationRequestData.place !== "" ? (
                  <div
                    className="AddNewLocationRequestButton"
                    onClick={VerifyingNewLocationReqeust}
                  >
                    <MdOutlineDone size={20} style={{ color: "green" }} />
                  </div>
                ) : !locationFetched ? (
                  <div
                    className="AddNewLocationRequestButton"
                    onClick={newLocationRequestHandler}
                  >
                    {user ? (
                      <IoAddSharp size={20} style={{ color: "green" }} />
                    ) : (
                      <IoAddSharp
                        size={20}
                        style={{ color: "grey", cursor: "progress" }}
                      />
                    )}
                  </div>
                ) : null}
              </div>
              <div className="HeaderTitleNameTag" onClick={GetCurrentLocation}>
                {(locationFetched === undefined ||
                  (locationFetched !== undefined &&
                    locationFetched.length === 0)) && (
                  <>
                    <MdLocationSearching style={{ marginTop: "3px" }} />
                    <p>Detect my location</p>
                  </>
                )}
              </div>
            </MDBModalHeader>
            <MDBModalBody className="ModalContentOfTheLocation">
              {newLocationRequest && (
                <>
                  <div className="newLocationRequestMainDiv">
                    <div className="inpurSeparatingDivForNewLocationRequest col-md-12">
                      <div className="newLocationRequestInputClassName col-md-6">
                        <input
                          type="text"
                          autoFocus
                          name="country"
                          required
                          autoComplete="off"
                          onChange={(e) => locationValueCollecter(e)}
                        />
                        <label for="country">country</label>
                      </div>
                      <div className="newLocationRequestInputClassName col-md-6">
                        <input
                          type="text"
                          autoFocus
                          name="state"
                          required
                          autoComplete="off"
                          onChange={(e) => locationValueCollecter(e)}
                        />
                        <label for="state">state</label>
                      </div>
                    </div>
                    <div className=" inpurSeparatingDivForNewLocationRequest col-md-12">
                      <div className="newLocationRequestInputClassName col-md-6">
                        <input
                          type="text"
                          name="district"
                          required
                          autoComplete="off"
                          onChange={(e) => locationValueCollecter(e)}
                        />
                        <label for="district">district</label>
                      </div>
                      <div className="newLocationRequestInputClassName col-md-6">
                        <input
                          type="text"
                          name="place"
                          required
                          autoComplete="off"
                          onChange={(e) => locationValueCollecter(e)}
                        />
                        <label for="place">place</label>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
