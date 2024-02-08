import React from 'react';
import styled from 'styled-components';
import Navbar from 'componentes/common/Navbar';

const Container = styled.div`
  height: 100vh;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
`;

function Main() {
  return (
    <Container>
      <Navbar />
      <div>안녕</div>
    </Container>
  );
}

export default Main;
