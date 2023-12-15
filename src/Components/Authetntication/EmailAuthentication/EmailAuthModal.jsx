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
  return (
    <div>
    {auth && showEmailAuth ? (
      <UserEmailAuthentication auth={auth} onEmailSubmit={e => toggleEmailOtpView(e)} />
    ) : auth ? (
      <UserEmailOtp email={email} auth={auth} />
    ) : showEmailAuth ? (
      <UserEmailAuthentication onEmailSubmit={e => toggleEmailOtpView(e)} />
    ) : (
      <UserEmailOtp  email={email}  setModalOpen={setModalOpen} />
    )}
  </div>
   
  );
})

export default EmailAuthModal;
  