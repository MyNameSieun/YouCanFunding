import React from 'react';
import styled from 'styled-components';

function CompletedNotification() {
  return (
    <>
      <Achieve>
        <div>
          <PointText color="var(--main-color)">98%</PointText> 달성
        </div>
        <div>
          <PointText color="var(--sub-color)">123123</PointText>원 모금
        </div>
      </Achieve>
      <CompletedText>
        <p>펀딩이 종료되었습니다.</p>
      </CompletedText>
    </>
  );
}

export default CompletedNotification;

const Achieve = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  font-size: 18px;
  color: #464646;
  margin: 40px auto 30px auto;
  & > div {
    margin-bottom: 10px;
  }
`;

const PointText = styled.span`
  color: ${(props) => props.color};
  font-size: 24px;
`;

const CompletedText = styled.div`
  margin: 0px auto;
  color: var(--sub-color);
  font-size: 18px;
  font-weight: 600;
`;
