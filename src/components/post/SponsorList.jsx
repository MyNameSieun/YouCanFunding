import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SponsorItem from './SponsorItem';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebase';
import defaultUser from 'assets/defaultUser.png';

const SponsorList = () => {
  const [userComment, setUserComment] = useState([]);

  // 무한루프 해결 방법 필요
  useEffect(() => {
    const fetchUserComment = async () => {
      const userCommentQuery = query(collection(db, 'sponsorUser'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(userCommentQuery);
      const userCommentList = snapshot.docs.map((doc) => {
        return doc.data();
      });
      setUserComment(userCommentList);
    };
    fetchUserComment();
  }, []);

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
          <CommentWrapper>
            <UserImg src={item.profile ?? defaultUser} alt="User Profile" />
            <CommentText>
              {item.username ?? '유저 닉네임'} 님이 &nbsp;{' '}
              <FontWeight>{item.donatedPrice.toLocaleString('ko-KR')} 원을</FontWeight> &nbsp; 펀딩해주셨어요.
            </CommentText>
          </CommentWrapper>
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

const CommentWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 2px solid #dfdfdf;
  width: 800px;
  margin: 7px auto;
  height: 70px;
  border-radius: 30px;
  background-color: white;
`;

const UserImg = styled.img`
  margin-left: 30px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 15px;
`;

const CommentText = styled.p`
  font-size: 16px;
  display: flex;
`;

const FontWeight = styled.p`
  font-weight: bold;
`;
