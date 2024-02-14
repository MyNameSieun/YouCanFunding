import React, { useState } from 'react';
import { auth, db } from '../firebase';
import styled from 'styled-components';
import { addDoc, collection } from 'firebase/firestore';
import SponsorTimeLine from 'components/SponsorTimeLine';
import SponsorPercent from 'components/SponsorPercent';

const SponsorBtn = () => {
  const user = auth.currentUser;

  const [isAdd, setIsAdd] = useState(false);
  const [receiptPrice, setReceiptPrice] = useState(0);

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
        receiptPrice,
        username: user.displayName,
        userId: user.uid,
        profile: user.photoURL,
        State: 'support',
        createdAt: Date.now()
      });
    } catch (e) {
      console.log(e);
    } finally {
      setIsAdd(false);
    }
    setReceiptPrice('');
  };

  return (
    <>
      <Achieve>
        <div>
          <PointText color="var(--main-color)">98%</PointText> 달성
          <SponsorPercent />
          <SponsorTimeLine />
        </div>
      </Achieve>
      <PriceForm onSubmit={handleOnSubmit}>
        <input
          onChange={onChangeReceipt}
          value={receiptPrice.toLocaleString('ko-KR')}
          placeholder="후원 금액을 입력해주세요."
        />
        <button type="submit">후원하기</button>
      </PriceForm>
    </>
  );
};

export default SponsorBtn;

const Achieve = styled.div`
  font-weight: bold;
  font-size: 18px;
  color: #464646;
  margin-top: 30px;
  & > div {
    margin-bottom: 10px;
  }
`;

const PointText = styled.span`
  color: ${(props) => props.color};
  font-size: 24px;
`;
const PriceForm = styled.form`
  display: flex;
  align-items: center;
  margin-top: 35px;

  input {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    width: 200px;
    font-size: 16px;
    margin-right: 10px;
  }

  button {
    padding: 10px 20px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #45a049;
    }
  }
`;
