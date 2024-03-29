import React, { useEffect } from 'react';
import styled from 'styled-components';
import { db } from '../firebase';
import { collection, getDocs, query } from 'firebase/firestore';

const SponsorTimeLine = ({ totalPrice, setTotalPrice }) => {
  useEffect(() => {
    const fetchReceiptPrices = async () => {
      try {
        const projectQuery = query(collection(db, 'sponsorUser'));
        const snapshot = await getDocs(projectQuery);

        let total = 0;
        snapshot.forEach((doc) => {
          const donatedPrice = doc.data().donatedPrice;
          total += donatedPrice;
        });

        setTotalPrice(total);
      } catch (error) {
        console.error('Error fetching receipt prices: ', error);
      }
    };

    fetchReceiptPrices();
  }, []);

  return (
    <div>
      <PointText color="var(--sub-color)">{totalPrice.toLocaleString('ko-KR')}</PointText> 원 모금
    </div>
  );
};

export default SponsorTimeLine;

const PointText = styled.span`
  color: ${(props) => props.color};
  font-size: 24px;
`;
