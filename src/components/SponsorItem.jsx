import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import SponsorList from './SponsorList';

const SponsorItem = () => {
  const [userComment, setUserComment] = useState([]);

  useEffect(() => {
    const fetchUserComment = async () => {
      const userCommentQuery = query(collection(db, 'sponsorUser'), orderBy('createdAt', 'desc'));
      const spanshot = await getDocs(userCommentQuery);
      const userComment = spanshot.docs.map((doc) => {
        const { profile, receiptPrice, username, createdAt } = doc.data();
        return {
          createdAt,
          profile,
          receiptPrice,
          username
        };
      });
      setUserComment(userComment);
    };
    fetchUserComment();
  }, [userComment]);
  return (
    <>
      {userComment.map((item) => (
        <SponsorList key={item.id} {...item} />
      ))}
    </>
  );
};

export default SponsorItem;
