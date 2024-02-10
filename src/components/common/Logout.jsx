import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  const logOut = async (event) => {
    event.preventDefault();
    try {
      await signOut(auth);
      navigate('/main');
    } catch (error) {
      console.log('Error with logout', error);
    }
  };

  return <button onClick={logOut}>로그아웃</button>;
}

export default Logout;
