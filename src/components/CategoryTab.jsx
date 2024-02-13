import styled from 'styled-components';
import { PiSquaresFour } from 'react-icons/pi';
import { PiBowlFood } from 'react-icons/pi';
import { SlGameController } from 'react-icons/sl';
import { PiFilmSlate } from 'react-icons/pi';
import { PiGuitar } from 'react-icons/pi';
import { PiImage } from 'react-icons/pi';
import { VscSymbolMisc } from 'react-icons/vsc';
import { PiBookOpenText } from 'react-icons/pi';
import { PiCatLight } from 'react-icons/pi';
import { PiTShirt } from 'react-icons/pi';
import { PiPalette } from 'react-icons/pi';
import { PiSmiley } from 'react-icons/pi';
import { PiTelevision } from 'react-icons/pi';
import { PiTent } from 'react-icons/pi';
import { PiSubtract } from 'react-icons/pi';
import { PiRobot } from 'react-icons/pi';
import { PiAlignLeft } from 'react-icons/pi';
import { PiHighlighterCircle } from 'react-icons/pi';

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
  margin-top: 0.5rem;
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
    { category: '전체', icon: <PiSquaresFour /> },
    { category: '기술·가전', icon: <PiTelevision /> },
    { category: '푸드', icon: <PiBowlFood /> },
    { category: '패션', icon: <PiTShirt /> },
    { category: '뷰티', icon: <PiHighlighterCircle /> },
    { category: '클래스', icon: <PiSubtract /> },
    { category: '반려동물', icon: <PiCatLight /> },
    { category: '게임', icon: <SlGameController /> },
    { category: '웹툰·만화', icon: <PiAlignLeft /> },
    { category: '음악', icon: <PiGuitar /> },
    { category: '사진', icon: <PiImage /> },
    { category: '영화', icon: <PiFilmSlate /> },
    { category: '홈·리빙', icon: <PiTent /> },
    { category: '예술', icon: <PiPalette /> },
    { category: '캐릭터·굿즈', icon: <PiSmiley /> },
    { category: '디자인·문구', icon: <VscSymbolMisc /> },
    { category: '도서·전자책', icon: <PiBookOpenText /> },
    { category: '키즈', icon: <PiRobot /> }
  ];

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
