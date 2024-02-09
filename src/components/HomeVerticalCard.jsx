import React, { useEffect } from 'react';
import styled from 'styled-components';
import ProductsList from 'data/products.json';

const CardContainer = styled.div`
  display: flex;
  justify-content: start;
  gap: 30px;
  flex-wrap: wrap;
`;

const CardItems = styled.div`
  border: 2px solid #dfdfdf;
  border-radius: 9px;
  width: 323px;
  height: 246px;
  position: relative;
`;
const Image = styled.img`
  object-fit: cover;
  width: 100%;
  height: 170px;
  border-radius: 9px;
`;

const Title = styled.div`
  margin-top: 10px;
  font-size: 14px;
  font-weight: bold;
  margin-left: 10px;
  margin-right: 10px;
`;
const AchievementRate = styled.div`
  position: absolute;
  bottom: 10px;
  left: 0px;
  font-size: 16px;
  margin-left: 10px;
  margin-right: 10px;
`;
const PointColor = styled.span`
  color: var(--sub-color);
  font-weight: bold;
`;

function HomeVerticalCard() {
  useEffect(() => {
    console.log(ProductsList);
  }, []);

  return (
    <CardContainer>
      {ProductsList.product.map((product) => (
        <CardItems key={product.id}>
          <Image src={product.image}></Image>
          <Title>{product.name}</Title>
          <AchievementRate>
            <PointColor>{product.achievementRate}</PointColor> 달성
          </AchievementRate>
        </CardItems>
      ))}
    </CardContainer>
  );
}

export default HomeVerticalCard;
