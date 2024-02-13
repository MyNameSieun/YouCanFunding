import React, { useState } from 'react';
import styled from 'styled-components';
import calendar from 'assets/calendar.png';
import gift from 'assets/gift.png';

function ScheduledNotification() {
  const [notificationRequested, setNotificationRequested] = useState(false);
  const applyOpenNotification = () => {
    window.alert('오픈 알림 신청이 완료되었습니다.');
    setNotificationRequested(true);
  };

  const cancelOpenNotification = () => {
    const isCancled = window.confirm('정말 취소하시겠습니까?\n오픈 알림과 혜택을 받을 수 없습니다.');

    if (isCancled) {
      setNotificationRequested(false);
    }
  };

  return (
    <OpeningContainer>
      <OpeningDate>
        <img src={calendar} alt="캘린더"></img>
        <p>?월 ?일 ?요일 ?시 오픈예정</p>
      </OpeningDate>
      <OpeningGift>
        <img src={gift} alt="선물"></img>
        <p>얼리버드 혜택 제공</p>
      </OpeningGift>

      <OpeningButton completed={notificationRequested}>
        <button onClick={notificationRequested ? cancelOpenNotification : applyOpenNotification}>
          {notificationRequested ? '알림 신청 완료' : '오픈 알림 신청'}
        </button>
      </OpeningButton>
    </OpeningContainer>
  );
}

export default ScheduledNotification;

const OpeningContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  margin-top: 30px;
`;

const OpeningDate = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;

  & img {
    width: 25px;
    height: 25px;
  }
`;

const OpeningGift = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;

  & img {
    width: 25px;
    height: 25px;
  }
`;

const OpeningButton = styled.div`
  & button {
    width: 100%;
    margin-top: 20px;
    padding: 15px;
    border-color: ${(props) => (props.completed ? 'var(--main-color)' : 'transparent')};
    border-radius: 9px;
    background-color: ${(props) => (props.completed ? 'transparent' : 'var(--main-color)')};
    color: ${(props) => (props.completed ? 'var(--main-color)' : 'white')};
    font-size: 20px;
    font-weight: 600;
    cursor: pointer;
  }
`;
