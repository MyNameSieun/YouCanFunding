import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { auth, db } from '../../firebase';
import styled from 'styled-components';
import { addDoc, collection, getDocs, query } from 'firebase/firestore';
import SponsorTimeLine from 'components/SponsorTimeLine';
import SponsorPercent from 'components/SponsorPercent';
import HeartButton from './HeartButton';

const SponsorBtn = ({ activeNavTab, projects, receiptPrice, setReceiptPrice }) => {
  const user = auth.currentUser;
  const [isAdd, setIsAdd] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  const id = useParams().id;

  // projects 배열에서 현재 페이지의 프로젝트 가져오기
  const foundProject = projects.find((project) => project.id === id);

  // 현재 페이지의 프로젝트가 없는 경우 처리
  if (!foundProject) {
    return <div>프로젝트를 찾을 수 없습니다.</div>;
  }

  const { startDate, endDate } = foundProject;

  const onChangeReceipt = (event) => {
    const rawValue = event.target.value;
    const formattedValue = rawValue.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    const resultValue = Number(formattedValue.replace(/,/g, ''));
    setReceiptPrice(resultValue);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (!user || isAdd || receiptPrice === 0) return;
    try {
      setIsAdd(true);
      await addDoc(collection(db, 'sponsorUser'), {
        donatedPrice: receiptPrice,
        username: user.displayName,
        userId: user.uid,
        profile: user.photoURL,
        State: 'support',
        createdAt: Date.now()
      });
    } catch (e) {
      console.log(e);
    }
    try {
      const projectQuery = query(collection(db, 'sponsorUser'));
      const snapshot = await getDocs(projectQuery);

      let total = 0;
      snapshot.forEach((doc) => {
        const donatedPrice = doc.data().donatedPrice;
        total += donatedPrice;
      });

      setTotalPrice(total);
    } finally {
      setIsAdd(false);
    }
    setReceiptPrice('');
  };

  // 날짜 형식 변경 함수
  const formattedDate = (date) => {
    return new Date(date).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  return (
    <SponsorContainer>
      <FundingPeriod>
        <BoldText>펀딩 기간</BoldText> &nbsp;&nbsp; {`${formattedDate(startDate)} ~ ${formattedDate(endDate)}`}
      </FundingPeriod>
      {activeNavTab === 'inProgress' ? (
        <>
          <Achieve>
            <div>
              <SponsorPercent foundProject={foundProject} totalPrice={totalPrice} />
            </div>
            <div>
              <SponsorTimeLine totalPrice={totalPrice} setTotalPrice={setTotalPrice} />
            </div>
          </Achieve>
          <PriceForm onSubmit={handleOnSubmit}>
            <input
              onChange={onChangeReceipt}
              value={receiptPrice.toLocaleString('ko-KR')}
              placeholder="후원 금액을 입력해주세요."
            />
            <button type="submit">후원하기</button>
            <HeartButton />
          </PriceForm>
        </>
      ) : (
        <>
          <Achieve>
            <div>
              <SponsorPercent foundProject={foundProject} totalPrice={totalPrice} />
            </div>
            <div>
              <SponsorTimeLine totalPrice={totalPrice} setTotalPrice={setTotalPrice} />
            </div>
          </Achieve>
          <CompletedText>
            <p>펀딩이 종료되었습니다.</p>
          </CompletedText>
        </>
      )}
    </SponsorContainer>
  );
};

export default SponsorBtn;

const SponsorContainer = styled.div`
  margin-top: 50px;
`;

const FundingPeriod = styled.div`
  display: flex;
  font-size: 16px;
`;

const BoldText = styled.p`
  font-weight: 600;
`;

const Achieve = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  font-size: 18px;
  color: #464646;
  margin: 30px auto;
  & > div {
    margin-bottom: 10px;
  }
`;

const PriceForm = styled.form`
  display: flex;
  align-items: center;
  gap: 10px;

  & input {
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 5px;
    width: 100%;
    font-size: 18px;
    margin-right: 10px;
  }

  & button {
    padding: 10px 20px;
    background-color: var(--sub-color);
    color: white;
    border: none;
    border-radius: 7px;
    width: 40%;
    cursor: pointer;
    font-size: 18px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #ff3300f6;
    }
  }
`;

const CompletedText = styled.div`
  margin: 0px auto;
  color: var(--sub-color);
  font-size: 18px;
  font-weight: 600;
`;
