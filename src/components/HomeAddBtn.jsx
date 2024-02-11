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
  margin: 100px 30px;
  width: 424px;
  height: 46px;
  font-weight: bold;
  font-size: 18px;
  color: #464646;
  cursor: pointer;
`;

function HomeAddBtn({ setVisibleProducts }) {
  const MoreBtn = () => {
    setVisibleProducts((visibleProducts) => visibleProducts + 12);
  };
  return (
    <BtnContainer>
      <Button onClick={() => MoreBtn()}>진행중인 버튼 더 보기</Button>
    </BtnContainer>
  );
}

export default HomeAddBtn;
