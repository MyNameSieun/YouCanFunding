import React, { useEffect, useState } from 'react';
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
  color: ${(props) => (props.activeTab ? 'black; font-weight: bold;' : '#878f97')};
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
`;

const Hr = styled.div`
  border: 1px solid #dfdfdf;
  margin-top: 10px;
`;

function CategoryTab() {
  const [activeTab, setActiveTab] = useState(0);

  const handleTapBtn = (index) => {
    setActiveTab(index);
  };

  const data = [
    { category: '전체', content: '내용' },
    { category: '기술·가전', content: '내용' },
    { category: '푸드', content: '내용' },
    { category: '패션', content: '내용' },
    { category: '뷰티', content: '내용' },
    { category: '클래스', content: '내용' },
    { category: '반려동물', content: '내용' },
    { category: '게임', content: '내용' },
    { category: '웹툰·만화', content: '내용' },
    { category: '음악', content: '내용' },
    { category: '사진', content: '내용' },
    { category: '영화', content: '내용' },
    { category: '홈·리빙', content: '내용' },
    { category: '예술', content: '내용' },
    { ncategoryame: '캐릭터·굿즈', content: '내용' },
    { category: '디자인·문구', content: '내용' },
    { category: '도서·전자책', content: '내용' },
    { category: '키즈', content: '내용' }
  ];

  return (
    <TabBox>
      <Ul>
        {data.map((item, index) => (
          <Li onClick={() => handleTapBtn(index)} activeTab={index === activeTab}>
            {item.category}
          </Li>
        ))}
      </Ul>
      <Hr />
    </TabBox>
  );
}

export default CategoryTab;
