import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../context/authcontext';
import { useParams } from 'react-router-dom';
import Admin_TheatreOwnerVerificationModals from '../Admin_Modals/Admin_TheatreOwnerVerificationModals';

const Admin_TheatreOwnerVerification = () => {
  const [OwnnerVerificationModal, setOwnerVerificationModal] = useState(false);
  const { id } = useParams();
  const { authToken } = useContext(AuthContext);
  const [ownerDetails, setOwnerDetails] = useState();

  const TheatreOwnerVerification = async () => {
      try {
          const response = await axios.get(
              `${import.meta.env.VITE_URL_SERVER}/admin_panel/theatreowner/${id}/`,
        {
            headers: {
                'Authorization': `Bearer ${authToken.access}`,
                'Content-Type': 'multipart/formdata',
            },
        }
        );
        const data = response.data;
      console.log(data);
      if (response.status === 200) {
          setOwnerDetails([data]);
        }
    } catch (error) {
        console.error(error);
    }
};

const verificationHandler = () => {
    setOwnerVerificationModal(true);
};

useEffect(() => {
    TheatreOwnerVerification();
}, []);

const baseUrl = `${import.meta.env.VITE_URL_SERVER}`

  return (
    <div>
      {ownerDetails
        ? ownerDetails.map((item) => (
            <div key={item.id}>
              <p>{item.first_name}</p>
              <p>{item.id}</p>
              <p>{item.email}</p>
              <p>{item.phone}</p>
              <p>{item.last_name}</p>
              <p>{item.id_number}</p>
              <img src={baseUrl + item.id_proof} alt="ID Proof" /> 
              <p>{item.address}</p>
              <button onClick={verificationHandler}>verification</button>
              {OwnnerVerificationModal && (
                <Admin_TheatreOwnerVerificationModals owner_id={item.id}  />
              )}
            </div>
          ))
        : null}
    </div>
  );
};

export default Admin_TheatreOwnerVerification;
