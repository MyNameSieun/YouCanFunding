import { auth } from '../firebase';
import { signOut } from 'firebase/auth';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function Logout({ onLogout, setActiveNavTab }) {
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
        onLogout();
        setActiveNavTab('inProgress');
        navigate('/');
      } catch (error) {
        console.log('Error with logout', error);
      }
    } else {
      alert('로그인 상태가 아닙니다.');
    }
  };

  return <LogoutButton onClick={logOut}>로그아웃</LogoutButton>;
}

export default Logout;

const LogoutButton = styled.button`
  margin-right: 20px;
  padding: 0;
  border: none;
  background: none;
  font-size: 17px;
  font-weight: 600;
  color: #8d8d8d;
  cursor: pointer;
`;
