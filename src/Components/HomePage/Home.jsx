import React, { useState } from 'react';
import SignInPage from './SignInPage';

const Home = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  return (
    <>
      

      {modalOpen ? (
        <SignInPage />
      ):
      <button onClick={openModal}>Sign in</button>
    }
    </>
  );
}

export default Home;
