import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  height: 90px;
  display: flex;

  align-items: center;

  & ul {
    display: flex;
  }
  & li {
    margin-right: 30px;
    font-size: 28px;
    font-weight: bold;
  }
`;
const ColorBlue = styled.div`
  color: #3425de;
  display: inline;
`;

function Navbar() {
  return (
    <Container>
      <ul>
        <li>
          유캔<ColorBlue>FUN</ColorBlue>딩
        </li>
        <li>펀딩 예정</li>
        <li>펀딩 종료</li>
      </ul>
    </Container>
  );
}

export default Navbar;
