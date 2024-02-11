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
  background-color: white;
  border-radius: 9px;
  width: 323px;
  height: 286px;
  position: relative;
`;

const Image = styled.img`
  object-fit: cover;
  width: 100%;
  height: 200px;
  border-radius: 7px 7px 0 0;
`;

const Title = styled.div`
  margin-top: 15px;
  font-size: 14px;
  font-weight: bold;
  margin-left: 10px;
  margin-right: 10px;
`;

const AchievementRate = styled.div`
  position: absolute;
  bottom: 11px;
  left: 0px;
  font-size: 16px;
  margin-left: 10px;
  margin-right: 10px;
`;

const PointColor = styled.span`
  color: var(--sub-color);
  font-weight: bold;
`;

function HomeVerticalCard({ activeTab, search, visibleProducts, activeNavTab }) {
  return (
    <CardContainer>
      {ProductsList.productList
        .filter(
          (product) =>
            (activeTab === '전체' || activeTab === product.category) &&
            (!search || product.name.toLowerCase().includes(search.toLowerCase())) &&
            ((activeNavTab === 'scheduled' && product.state === 'schedule') ||
              (activeNavTab === 'inProgress' && product.state === 'inProgress') ||
              (activeNavTab === 'completed' && product.state === 'completed'))
        )
        .slice(0, visibleProducts)
        .map((product) => (
          <CardItems key={product.id}>
            <Image src={product.image} alt={product.name} />
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
