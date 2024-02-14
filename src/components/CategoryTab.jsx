import styled from 'styled-components';
import { data } from './common/categories';

const TabBox = styled.div`
  height: 80px;
`;
const Ul = styled.div`
  display: flex;
  cursor: pointer;
  margin-top: 60px;
`;
const Li = styled.div`
  color: ${(props) => (props.activeTab ? 'black' : '#878f97')};
  font-weight: ${(props) => (props.activeTab ? 'bold' : 'normal')};
  display: inline-block;
  cursor: pointer;
`;
const IconWrapper = styled.div`
  font-size: 30px;
  margin: 0 auto;
  width: 50%;
  margin-right: 28px;
`;
const IconInfo = styled.div`
  margin-right: 20px;
`;
const Hr = styled.div`
  border: 1px solid #dfdfdf;
  margin-top: 10px;
`;

function CategoryTab({ activeTab, setActiveTab }) {
  const handleTapBtn = (index) => {
    setActiveTab(data[index].category);
  };

  return (
    <TabBox>
      <Ul>
        {data.map((item, index) => (
          //  $붙히면 안보이는 오류
          <Li key={item.category} onClick={() => handleTapBtn(index)} activeTab={item.category === activeTab}>
            <IconWrapper> {item.icon}</IconWrapper>
            <IconInfo>{item.category}</IconInfo>
          </Li>
        ))}
      </Ul>
      <Hr />
    </TabBox>
  );
}

export default CategoryTab;
