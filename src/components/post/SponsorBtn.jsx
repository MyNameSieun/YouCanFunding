import React, { useEffect, useState } from 'react';
import { auth, db } from '../../firebase';
import styled from 'styled-components';
import { addDoc, collection, getDocs, query } from 'firebase/firestore';
import SponsorTimeLine from 'components/SponsorTimeLine';
import SponsorPercent from 'components/SponsorPercent';
import HeartButton from './HeartButton';

const SponsorBtn = ({ foundProject, receiptPrice, setReceiptPrice }) => {
  const user = auth.currentUser;

  const [isAdd, setIsAdd] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

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

  return (
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
        {/* <HeartButton /> */}
      </PriceForm>
    </>
  );
};

export default SponsorBtn;

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

const PointText = styled.span`
  color: ${(props) => props.color};
  font-size: 24px;
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
