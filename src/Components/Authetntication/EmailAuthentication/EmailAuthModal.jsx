import React, { useState } from 'react';
import UserEmailAuthentication from './UserEmailAuthentication';
import UserEmailOtp from './UserEmailOtp';

const EmailAuthModal = React.memo(({auth,setModalOpen}) => {
  const [email, setEmail] = useState([]);
  const [showEmailAuth, setShowEmailAuth] = useState(true);
console.log(auth);
  const toggleEmailOtpView = (e) => {
    setEmail(e)
    setShowEmailAuth(!showEmailAuth);
  };
  console.log(email);
  return (
    <div>
    {auth && showEmailAuth ? (
      <UserEmailAuthentication auth={auth} onEmailSubmit={e => toggleEmailOtpView(e)} />
    ) : auth ? (
      <UserEmailOtp email={email.email} otp_={email.otp} auth={auth} />
    ) : showEmailAuth ? (
      <UserEmailAuthentication onEmailSubmit={e => toggleEmailOtpView(e)} />
    ) : (
      <UserEmailOtp  email={email.email}  otp_={email.otp} setModalOpen={setModalOpen} />
    )}
  </div>
   
  );
})

export default EmailAuthModal;
  