import React from 'react';
import styled from 'styled-components';

const BtnContainer = styled.div`
  margin: 10px 10px;

  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  border: 2px solid #dfdfdf;
  border-radius: 7px;
  margin: 80px auto;
  width: 424px;
  height: 46px;
  font-weight: bold;
  font-size: 18px;
  color: #464646;
  cursor: pointer;
`;

function HomeAddBtn({ activeNavTab, setVisibleProducts }) {
  const MoreBtn = () => {
    setVisibleProducts((visibleProducts) => visibleProducts + 8);
  };
  let buttonText = '더 보기';

  switch (activeNavTab) {
    case 'scheduled':
      buttonText = '예정 중인 펀딩 더 보기';
      break;
    case 'completed':
      buttonText = '종료된 펀딩 더 보기';
      break;
    case 'inProgress':
      buttonText = '진행 중인 펀딩 더 보기';
      break;
    default:
      break;
  }
  return (
    <BtnContainer>
      <Button onClick={() => MoreBtn()}>{buttonText}</Button>
    </BtnContainer>
  );
}

export default HomeAddBtn;
