import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const navigate = useNavigate();

  const logOut = async (event) => {
    event.preventDefault();

    // 현재 로그인된 사용자 정보 가져오기
    const currentUser = auth.currentUser;

    // 로그인 상태인 경우에만
    if (currentUser) {
      try {
        await signOut(auth);
        alert('로그아웃 되었습니다.');
        navigate('/main');
      } catch (error) {
        console.log('Error with logout', error);
      }
    } else {
      alert('로그인 상태가 아닙니다.');
    }
  };

  return <button onClick={logOut}>로그아웃</button>;
}

export default Logout;
