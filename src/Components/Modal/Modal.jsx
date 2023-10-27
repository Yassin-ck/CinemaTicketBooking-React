import React, { useState } from 'react';
import UserEmailAuthentication from '../EmailAuthentication/UserEmailAuthentication';
import UserEmailOtp from '../EmailAuthentication/UserEmailOtp';

const EmailAuthModal = () => {
  const [showEmailAuth, setShowEmailAuth] = useState(true);
  const [showEmailOtp, setShowEmailOtp] = useState(false);

  const toggleEmailOtpView = () => {
    setShowEmailAuth(!showEmailAuth);
    setShowEmailOtp(!showEmailOtp);
  };
  return (
    <div>
      {showEmailAuth && <UserEmailAuthentication onEmailSubmit={toggleEmailOtpView} />}
      {showEmailOtp && <UserEmailOtp />}
    </div>
  );
};

export default EmailAuthModal;
