import React from 'react';
import styled from 'styled-components';

const SponsorTimeLine = ({ receiptPrice, userComment }) => {
  //     receiptPrice.forEach((number,array) => {
  //     console.log(receiptPrice);
  //   });

  return (
    <div>
      <PointText color="var(--sub-color)">3,000</PointText>원 모금
    </div>
  );
};

export default SponsorTimeLine;

const PointText = styled.span`
  color: ${(props) => props.color};
  font-size: 24px;
`;
