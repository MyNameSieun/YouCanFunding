import React, { useEffect } from 'react';
import styled from 'styled-components';
import SponsorItem from './SponsorItem';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase';

const SponsorList = ({ userComment, setUserComment }) => {
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
  }, [setUserComment]);
  return (
    <>
      {userComment.length === 0 ? (
        <div>
          <p>아직 참여 중인 서포터가 없습니다.</p>
          <p>첫 번째 서포터가 되어보세요!</p>
        </div>
      ) : null}
      <CommentContainer>
        {userComment.map((item) => (
          <SponsorItem key={item.id} {...item} />
        ))}
      </CommentContainer>
    </>
  );
};

export default SponsorList;

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 50px auto;
  font-weight: bold;
  line-height: 2;
  font-size: 16px;
  gap: 15px;
  margin: 50px auto;
`;
