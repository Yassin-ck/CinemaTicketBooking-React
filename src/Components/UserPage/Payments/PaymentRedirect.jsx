import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QueryString from "query-string";
import axios from "axios";
const PaymentRedirect = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const [ticketData,setTicketData] = useState([])
  const [loading,setLoading] = useState(false)

  const PaymentDetailsUpdatingApi = async (e) => {
    // e.preventDefault()
    try{

      const response = await axios.get(
        `${import.meta.env.VITE_URL_SERVER}/user/ticketbooking/`,
        {
          params: {
            session_id: e,
          },
        }
        );
        const data = response.data
        console.log(data);
        if (response.status==200){
          setTicketData(data)
          setLoading(true)
        }
      }catch(error){
        navigate('/')
        console.error(error);
      }
  };

  useEffect(() => {
    const values = QueryString.parse(location.search);
    console.log(values);

    if (values.success) {
      PaymentDetailsUpdatingApi(values.session_id);
      console.log("Order placed! You will receive an email confirmation.");
    }
    if (values.canceled) {
      PaymentDetailsUpdatingApi();
      console.log(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }

    
    return () => {
      localStorage.removeItem("cache_id");
    }
  }
  
  , []);
  return (
    <section>
    {loading&&[ticketData].map((item)=>(
      <div style={{color:'white'}}>
      <p>{item.date}</p>
      <p>{item.tickets}</p>
      <p>{item.time}</p>
      <p>{item.amount}</p>
      <p>{item.screen}</p>
      <p>{item.theatre}</p>
      <p>{item.booked_date}</p>
      </div>
    ))}

     
    </section>
  );
};

export default PaymentRedirect;
