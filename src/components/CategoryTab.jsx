import styled from 'styled-components';
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
  margin-right: 20px;
  cursor: pointer;
`;

const Hr = styled.div`
  border: 1px solid #dfdfdf;
  margin-top: 10px;
`;

function CategoryTab({ activeTab, setActiveTab }) {
  const handleTapBtn = (index) => {
    setActiveTab(data[index].category);
  };

  const data = [
    { category: '전체' },
    { category: '기술·가전' },
    { category: '푸드' },
    { category: '패션' },
    { category: '뷰티' },
    { category: '클래스' },
    { category: '반려동물' },
    { category: '게임' },
    { category: '웹툰·만화' },
    { category: '음악' },
    { category: '사진' },
    { category: '영화' },
    { category: '홈·리빙' },
    { category: '예술' },
    { category: '캐릭터·굿즈' },
    { category: '디자인·문구' },
    { category: '도서·전자책' },
    { category: '키즈' }
  ];

  return (
    <TabBox>
      <Ul>
        {data.map((item, index) => (
          //  $붙히면 안보이는 오류
          <Li key={item.category} onClick={() => handleTapBtn(index)} activeTab={item.category === activeTab}>
            {item.category}
          </Li>
        ))}
      </Ul>
      <Hr />
    </TabBox>
  );
}

export default CategoryTab;
