import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QueryString from "query-string";
import axios from "axios";
import "./PaymentRedirect.css";

const PaymentRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [ticketData, setTicketData] = useState([]);
  const [loading, setLoading] = useState(false);

  const PaymentDetailsUpdatingApi = async (e) => {
    // e.preventDefault()
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_URL_SERVER}/user/ticketbooking/`,
        {
          params: {
            session_id: e,
          },
        }
      );
      const data = response.data;
      console.log(data);
      if (response.status == 200) {
        setTicketData(data);
        setLoading(true);
      }
    } catch (error) {
      navigate("/");
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
    };
  }, []);
  return (
    <section className="SectionDivForPaymentRedirect">
      <div className="container MainDivForPaymentRedirect">
        {loading &&
          [ticketData].map((item) => (
            <div className="MainInnerDivForPaymetnRedirect">
              <div className="MainInnerSection1DivForPaymetnRedirect">
                <div className="InnerSection1DivForPaymetnRedirect">
                  <div className="section1TextDivForPaymetnRedirect">
                    <h4> {item.theatre[0].toUpperCase()+item.theatre.slice(1)}</h4>
                  </div>
                  <div className="section1TextDivForPaymetnRedirect">
                    <h4>Screen Number {item.screen}</h4>
                  </div>
                </div>
                <div className="InnerSection1DivForPaymetnRedirect">
                  <div className="section1TextDivForPaymetnRedirect">
                    <h5>date : {item.date}</h5>
                  </div>
                  <div className="section1TextDivForPaymetnRedirect">
                    <h5>Time : {item.time}</h5>
                  </div>
                </div>
              </div>
              <div  className="MainInnerSection2DivForPaymetnRedirect">
                <div className="InnerSection2DivForPaymetnRedirect">
                  <div className="section2TextDivForPaymetnRedirect" >
                    <h4> {item.movie[0].toUpperCase()+item.movie.slice(1)}</h4>
                  </div>
                  <div className="section2TextDivForPaymetnRedirect">
                    <h5>({item.language[0].toUpperCase()+item.language.slice(1)})</h5>
                  </div>
                </div>
                <div className="InnerSection2DivForPaymetnRedirect">
                  <div className="section2TextDivForPaymetnRedirect">
                    <h6 style={{display:'flex',alignItems:'center'}}>Seats:- {item.tickets.map((item)=><div >{item}</div>)}</h6>
                  </div>
                </div>
              </div>
              <div  className="MainInnerSection3DivForPaymetnRedirect">
                <div className="InnerSection3DivForPaymetnRedirect">
                  <div className="section3TextDivForPaymetnRedirect">
                    <h6>Total Amount : {item.amount}</h6>
                  </div>
                  <div className="section3TextDivForPaymetnRedirect">
                    <h6>Booked On : {item.booked_date}</h6>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default PaymentRedirect;
