import { useContext, useEffect, useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import "../SignInPages/SigninPage.css";
import { AuthContext } from "../../../context/AuthContext";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

function OffCanvasExample({ name, ...props }) {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const { user, setAuthToken, setUser } = useContext(AuthContext);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const logout = () => {
    handleClose();
    setTimeout(() => {
      localStorage.removeItem("authToken");
      setAuthToken();
      setUser();
      navigate("/");
    }, 500);
  };
  const EditProfileHandler = () => {
    handleClose();
    navigate("/view");
  };


  console.log(user);

  return (
    <>
    <img  onClick={handleShow}   style={{ cursor: "pointer", width: "30px"}} src="//assets-in.bmscdn.com/static/2023/10/default-pic.png" alt="Profile" class="bwc__sc-1nbn7v6-15 jipwZh" />
      

      <div style={{ position: "relative",color:'black' }}>
        <Offcanvas
          style={{ width: "22rem" }}
          show={show}
          onHide={handleClose}
          {...props}
        >
          <Offcanvas.Header
            style={{  background: "#1111", height: "4.64rem",boxShadow:"1px 1px 3px rgba(0,0,0,0.3)" }}
          >
            <div style={{ height: "40px" }}>
              <Offcanvas.Title>
                {user.username ? (
                  <h5>Hii {user.username}</h5>
                ) : (
                  <h5>Hii Guest</h5>
                )}
              </Offcanvas.Title>
              <div
                style={{
                  position: "relative",
                  color: "#14110f",
                  cursor: "pointer",
                }}
                onClick={EditProfileHandler}
              >
                <IoIosArrowBack size={12}  />
                <p
                  style={{
                    fontSize: "14px",
                    position: "absolute",
                    top: "3px",
                    left: "18px",
                    width: "4.2rem",
                  }}
                >
                  Edit Profile
                </p>
              </div>
            </div>
            <img
              src="//in.bmscdn.com/webin/movies/superstar/profile_avatar.png"
              alt="user"
              className="bwc__sc-1fj6cem-17 exSHsT"
            />
          </Offcanvas.Header>
          <Offcanvas.Body>
            
            <hr />
            <p onClick={() => navigate("/ticketview")}>Ticket</p>
            <hr />
            title
            <hr />
            Body
            <hr />
            title
            <hr />
            Body
            <hr />
          </Offcanvas.Body>
          <div>
            <hr />
          </div>
          <div
            style={{ margin: "5px", display: "flex", justifyContent: "center" }}
          >
            <Button
              variant="outlined"
              fullWidth
              onClick={logout}
              style={{
                width: "90%",
                borderRadius: "2px",
                color: "red",
                boxShadow: "1px 2px 8px white",
                border: "1px solid red",
              }}
            >
              Sign out
            </Button>
          </div>
        </Offcanvas>
      </div>
    </>
  );
}

export default function Sidebar() {
  return (
    <>
      {["end"].map((placement, idx) => (
        <OffCanvasExample key={idx} placement={placement} name={placement} />
      ))}
    </>
  );
}
