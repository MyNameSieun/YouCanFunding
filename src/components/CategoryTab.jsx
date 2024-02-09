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

function CategoryTab({ products, setProduces }) {
  useEffect(() => {});

  const [activeTab, setActiveTab] = useState(0);

  const handleTapBtn = (index) => {
    setActiveTab(index);
  };

  const data = [
    { name: '전체', content: '내용' },
    { name: '기술·가전', content: '내용' },
    { name: '푸드', content: '내용' },
    { name: '패션', content: '내용' },
    { name: '뷰티', content: '내용' },
    { name: '클래스', content: '내용' },
    { name: '반려동물', content: '내용' },
    { name: '게임', content: '내용' },
    { name: '웹툰·만화', content: '내용' },
    { name: '음악', content: '내용' },
    { name: '사진', content: '내용' },
    { name: '영화', content: '내용' },
    { name: '홈·리빙', content: '내용' },
    { name: '예술', content: '내용' },
    { name: '캐릭터·굿즈', content: '내용' },
    { name: '디자인·문구', content: '내용' },
    { name: '도서·전자책', content: '내용' },
    { name: '키즈', content: '내용' }
  ];

  return (
    <TabBox>
      <Ul>
        {data.map((item, index) => (
          <Li onClick={() => handleTapBtn(index)} activeTab={index === activeTab}>
            {item.name}
          </Li>
        ))}
      </Ul>
      <Hr />
    </TabBox>
  );
}

export default CategoryTab;
