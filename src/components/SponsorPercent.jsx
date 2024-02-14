import React from 'react';
import styled from 'styled-components';

const SponsorPercent = ({ foundProject, totalPrice }) => {
  return (
    <div>
      <PointText color="var(--main-color)">{(totalPrice / foundProject.targetPrice) * 100}%</PointText> 달성
    </div>
  );
};

export default SponsorPercent;
const PointText = styled.span`
  color: ${(props) => props.color};
  font-size: 24px;
`;
