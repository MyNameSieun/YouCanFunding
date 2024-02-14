import React from 'react';
import styled from 'styled-components';

function ScheduledComments() {
  return (
    <CommentsContainer>
      <p>아직 참여 중인 서포터가 없습니다.</p>
      <p>오픈 알림 신청과 함께 첫 번째 서포터가 되어보세요!</p>
    </CommentsContainer>
  );
}

export default ScheduledComments;

const CommentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 50px auto;
  line-height: 2;
  font-size: 16px;
  font-weight: 600;
`;
