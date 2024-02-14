import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import SponsorList from './SponsorList';
import styled from 'styled-components';

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
    <CommentContainer>
      {userComment.map((item) => (
        <SponsorList key={item.id} {...item} />
      ))}
    </CommentContainer>
  );
};

export default SponsorItem;

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
  margin: 50px auto;
`;
