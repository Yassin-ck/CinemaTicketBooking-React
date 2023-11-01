import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/authcontext';
import { useParams } from 'react-router-dom';
import Admin_TheatreOwnerVerificationModals from './Admin_Modals/Admin_TheatreOwnerVerificationModals';

const Admin_TheatreVerification = () => {
  const [theatreVerificationModal, setTheatreVerificationModal] = useState(false);
  const { id } = useParams();
  const { authToken } = useContext(AuthContext);
  const [theatreDetails, setTheatreDetails] = useState();

  const TheatreOwnerVerification = async () => {
      try {
          const response = await axios.get(
              `${import.meta.env.VITE_URL_SERVER}/admin_panel/theatre/${id}/`,
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
        setTheatreDetails([data]);
        }
    } catch (error) {
        console.error(error);
    }
};

const verificationHandler = () => {
    setTheatreVerificationModal(true);
};

useEffect(() => {
    TheatreOwnerVerification();
}, []);

const baseUrl = `${import.meta.env.VITE_URL_SERVER}`

  return (
    <div>
      {theatreDetails
        ? theatreDetails.map((item) => (
            <div key={item.id}>
              <p>{item.theatre_name}</p>
              <p>{item.id}</p>
              <p>{item.email}</p>
              <p>{item.phone}</p>
              <p>{item.num_of_screens}</p>
              <img src={baseUrl + item.certification} alt="certification" /> 
              <p>{item.owner.first_name}</p>
              <p>{item.owner.email}</p>
              <p>{item.owner.phone}</p>
              <p>{item.owner.last_name}</p>
              <p>{item.owner.id_number}</p>
              <img src={baseUrl + item.owner.id_proof} alt="ID Proof" /> 
              <p>{item.owner.address}</p>
              <button onClick={verificationHandler}>verification</button>
              {theatreVerificationModal && (
                <Admin_TheatreOwnerVerificationModals theatre_id={item.id} />
              )}
            </div>
          ))
        : null}
    </div>
  );
};

export default Admin_TheatreVerification;
