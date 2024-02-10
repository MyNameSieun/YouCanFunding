import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const NavContainer = styled.div`
  height: 90px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 19px;
`;
const ColorBlue = styled.span`
  color: var(--main-color);
`;
const NavBar = styled.ul`
  display: flex;
  align-items: center;
  height: 120px;
  width: 100%;
  justify-content: space-between;
`;

const Logo = styled.span`
  font-size: 30px;
  font-weight: bold;
  margin-right: 34px;
`;

const Tab = styled.span`
  cursor: pointer;
  margin-right: 24px;
  color: ${(props) => (props.activeTab ? 'black' : '#878f97')};
`;

const LeftNav = styled.li`
  font-size: 22px;
  font-weight: bold;
  text-decoration: none;

  & li {
    display: inline-block;
    margin-right: 30px;
  }
`;

const RightNav = styled.li`
  font-size: 17px;
`;
const AuthLink = styled(Link)`
  margin-right: 20px;
  color: #8d8d8d;
`;
const Addbtn = styled.span`
  color: white;
  background-color: #3867d6;
  padding: 15px 16px;
  border-radius: 9px;
  &:hover {
    background-color: #0056b3;
  }
`;

function Navbar() {
  const [activeTab, setActiveTab] = useState('');

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <NavContainer>
      <NavBar>
        <LeftNav>
          <Logo>
            <Link to={'/'}>
              유캔<ColorBlue>FUN</ColorBlue>딩
            </Link>
          </Logo>
          <Tab activeTab={activeTab === 'scheduled'} onClick={() => handleTabClick('scheduled')}>
            펀딩 예정
          </Tab>
          <Tab activeTab={activeTab === 'completed'} onClick={() => handleTabClick('completed')}>
            펀딩 종료
          </Tab>
        </LeftNav>
        <RightNav>
          <AuthLink to={'/login'}>
            <span>로그인</span>
          </AuthLink>
          <AuthLink to={'/singup'}>
            <span>회원가입</span>
          </AuthLink>
          <Link to={'/register'}>
            <Addbtn>프로젝트 등록</Addbtn>
          </Link>
        </RightNav>
      </NavBar>
    </NavContainer>
  );
}

export default Navbar;
