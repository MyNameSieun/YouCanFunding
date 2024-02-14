import { db } from '../firebase';
import { collection, getDocs, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const SponsorPercent = ({ totalPrice }) => {
  const [percent, setPercent] = useState('');

  useEffect(() => {
    const fetchReceiptPrices = async () => {
      try {
        const projectQuery = query(collection(db, 'projects'));
        const snapshot = await getDocs(projectQuery);

        let total = totalPrice;
        snapshot.forEach((doc) => {
          const targetPrice = doc.data().targetPrice;
        });

        setPercent(total);
      } catch (error) {
        console.error('Error fetching receipt prices: ', error);
      }
    };

    fetchReceiptPrices();
  }, []);

  return (
    <div>
      <PointText color="var(--main-color)">{percent}</PointText> 달성
    </div>
  );
};

export default SponsorPercent;
const PointText = styled.span`
  color: ${(props) => props.color};
  font-size: 24px;
`;
