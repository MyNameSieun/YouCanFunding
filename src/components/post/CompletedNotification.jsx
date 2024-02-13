import React from 'react';
import styled from 'styled-components';

function CompletedNotification() {
  return (
    <CompletedContainer>
      <p>펀딩이 종료되었습니다.</p>
    </CompletedContainer>
  );
}

export default CompletedNotification;

const CompletedContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 30px auto;
  line-height: 1.5;
`;
