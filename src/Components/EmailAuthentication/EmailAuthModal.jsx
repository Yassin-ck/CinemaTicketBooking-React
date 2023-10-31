import React, { useState } from 'react';
import UserEmailAuthentication from './UserEmailAuthentication';
import UserEmailOtp from './UserEmailOtp';

const EmailAuthModal = () => {
  const [email, setEmail] = useState([]);
  const [showEmailAuth, setShowEmailAuth] = useState(true);

  const toggleEmailOtpView = (e) => {
    setShowEmailAuth(!showEmailAuth);
    setEmail(e)
  };
  return (
    <div>
      {showEmailAuth ? <UserEmailAuthentication onEmailSubmit={e=>toggleEmailOtpView(e)} />
     :<UserEmailOtp email={email.email} otp={email.otp} />}
    </div>
  );
};

export default EmailAuthModal;
  