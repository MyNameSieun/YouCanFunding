import React, { useState, useEffect } from 'react';
// import firebase from './firebase/app';
import { db } from '../firebase';
import { doc } from 'firebase/firestore';
// import 'firebase/firestore';

const TotalReceiptPrice = ({ receiptPrice }) => {
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchReceiptPrices = async () => {
      try {
        const docRef = doc(db, sponsorUser, receiptPrice);
        const sponsorUserRef = db.collection('sponsorUser');
        const snapshot = await sponsorUserRef.get();

        let total = 0;
        snapshot.forEach((doc) => {
          const receiptPrice = doc.data().receiptPrice;
          total += receiptPrice;
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
      <h2>Total Receipt Price: {totalPrice}</h2>
    </div>
  );
};

export default TotalReceiptPrice;
