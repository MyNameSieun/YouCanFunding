// 카테고리
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

export const data = [
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
