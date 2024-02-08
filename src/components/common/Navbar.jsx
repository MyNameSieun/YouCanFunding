import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  height: 90px;
  width: 100%;
  display: flex;
`;
const ColorBlue = styled.span`
  color: var(--main-color);
`;
const NavBar = styled.ul`
  display: flex;
  align-items: center;
`;

const Logo = styled.li``;

const LeftNav = styled.li`
  display: flex;

  & li {
    margin-right: 30px;
    font-size: 28px;
    font-weight: bold;
  }
`;

const RightNav = styled.li`
  display: flex;

  & li {
    margin-right: 30px;
    font-size: 16px;
  }
`;

function Navbar() {
  return (
    <Container>
      <NavBar>
        <Logo>
          유캔<ColorBlue>FUN</ColorBlue>딩
        </Logo>
        <LeftNav>
          <li>펀딩 예정</li>
          <li>펀딩 종료</li>
        </LeftNav>
        <RightNav>
          <li>로그인</li>
          <li>회원가입</li>
          <li>프로젝트 등록</li>
        </RightNav>
      </NavBar>
    </Container>
  );
}

export default Navbar;
