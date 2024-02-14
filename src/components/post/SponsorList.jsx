import React from 'react';
import defaultUser from 'assets/defaultUser.png';
import styled from 'styled-components';

const SponsorList = ({ username, receiptPrice, profile }) => {
  return (
    <>
      <CommentWrapper>
        <UserImg src={profile ?? defaultUser} alt="User Profile" />
        <CommentText>
          {username ?? '유저 닉네임'}님이 <FontWeight>{receiptPrice.toLocaleString('ko-KR')}원 펀딩</FontWeight>해
          주셨어요.
        </CommentText>
      </CommentWrapper>
    </>
  );
};

export default SponsorList;

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
