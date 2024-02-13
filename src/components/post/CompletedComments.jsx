import React from 'react';
import styled from 'styled-components';
import defaultUser from 'assets/defaultUser.png';

function CompletedComments() {
  return (
    <CommentContainer>
      <CommentItem>
        <CommentImage src={defaultUser} alt="User Profile" />
        <CommentText>
          박시은님이 <FontWeight>165,000원</FontWeight> 펀딩했어요.
        </CommentText>
      </CommentItem>
      <CommentItem>
        <CommentImage src={defaultUser} alt="User Profile" />
        <CommentText>
          박시은님이 <FontWeight>165,000원</FontWeight> 펀딩했어요.
        </CommentText>
      </CommentItem>
      <CommentItem>
        <CommentImage src={defaultUser} alt="User Profile" />
        <CommentText>
          박시은님이 <FontWeight>165,000원</FontWeight> 펀딩했어요.
        </CommentText>
      </CommentItem>
    </CommentContainer>
  );
}

export default CompletedComments;

const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 18px;
  margin: 50px auto;
`;

const CommentItem = styled.div`
  display: flex;
  align-items: center;
  border: 2px solid #dfdfdf;
  width: 800px;
  height: 70px;
  border-radius: 30px;
  background-color: white;
`;

const CommentImage = styled.img`
  margin-left: 30px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 15px;
`;

const CommentText = styled.div`
  font-size: 16px;
`;

const FontWeight = styled.span`
  font-weight: bold;
`;
