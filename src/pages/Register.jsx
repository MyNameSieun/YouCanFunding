import React from 'react';
import Navbar from 'components/common/Navbar';
import RegisterSection from 'components/register/RegisterSection';

function Register({ activeNavTab, setActiveNavTab }) {
  return (
    <>
      <Navbar activeNavTab={activeNavTab} setActiveNavTab={setActiveNavTab} />
      <RegisterSection />
    </>
  );
}

export default Register;
