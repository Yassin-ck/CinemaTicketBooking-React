import React, { useState } from 'react';
import UserEmailAuthentication from './UserEmailAuthentication';
import UserEmailOtp from './UserEmailOtp';
import { useParams } from 'react-router-dom';

const EmailAuthModal = () => {
  const [email, setEmail] = useState([]);
  const [showEmailAuth, setShowEmailAuth] = useState(true);
  const {auth} = useParams()

  const toggleEmailOtpView = (e) => {
    setShowEmailAuth(!showEmailAuth);
    setEmail(e)
  };
  return (
    <div>
    {auth && showEmailAuth ? (
      <UserEmailAuthentication auth={auth} onEmailSubmit={e => toggleEmailOtpView(e)} />
    ) : auth ? (
      <UserEmailOtp email={email.email} otp={email.otp} auth={auth} />
    ) : showEmailAuth ? (
      <UserEmailAuthentication onEmailSubmit={e => toggleEmailOtpView(e)} />
    ) : (
      <UserEmailOtp email={email.email}  otp_={email.otp} />
    )}
  </div>
   
  );
};

export default EmailAuthModal;
  