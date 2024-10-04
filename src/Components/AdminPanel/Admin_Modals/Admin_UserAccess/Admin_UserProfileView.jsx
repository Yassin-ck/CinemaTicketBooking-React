import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../../../context/AuthContext";
import "./Admin_UserProfileView.css";
import { IoEyeOff } from "react-icons/io5";
import { IoIosCloseCircle } from "react-icons/io";
import { VscVerifiedFilled } from "react-icons/vsc";

const Admin_UserProfileView = () => {
  const { authToken } = useContext(AuthContext);
  console.log(authToken);
  const [pages, setPages] = useState([]);
  const [isValid, setIsValid] = useState(false);
  const [userData, setUserData] = useState([]);
  const getUserProfile = async (number) => {
    const response = await axios.get(
      `${import.meta.env.VITE_URL_SERVER}/admin_panel/users/?q=${number}`
    );
    const data = response.data;
    if (response.status == 200) {
      setUserData(data.user);
      console.warn(data);
      setPages(
        data.page_number > 1
          ? Array.from({ length: data.page_number }, (_, index) => index + 1)
          : []
      );
      setIsValid(true);
    } else {
      console.error(data);
    }
  };

  useEffect(() => {
    getUserProfile(1);
  }, []);
  console.log(userData);
  console.log(pages);

  return (
    <>
      <div className="MainContainerDivInAdminUserProfileVIew">
        <div className="container SecondContainerDivInAdminUserProfileVIew">
          <h3>User List</h3>
          <div className="UserProfileDivInAdminUserProfileVIew">
            {isValid ? (
              <table className="TableinAdminUserProfileVIew">
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Active</th>
                  </tr>
                </thead>
                <tbody>
                  {userData.map((item) => (
                    <tr key={item.user_id} className="trbodyInnertrinAdminUserProfileView">
                      <td>
                        {item.first_name ? (
                          `${item.first_name} ${item.last_name}`
                        ) : item.last_name ? (
                          `${item.first_name} ${item.last_name}`
                        ) : (
                          <IoEyeOff />
                        )}
                      </td>
                      <td>
                        {item.user.email ? item.user.email : <IoEyeOff />}
                      </td>
                      <td>{item.phone ? item.phone : <IoEyeOff />}</td>
                      <td>
                        {item.user.is_active ? (
                          <VscVerifiedFilled color="green" />
                        ) : (
                          <IoIosCloseCircle color="darkred" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : null}
          </div>
        </div>
        <div className="container">
          {pages.map((item) => (
            <button
              key={item}
              onClick={(e) => getUserProfile(item)}
              style={{ margin: "10px", padding: "20px" }}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Admin_UserProfileView;
