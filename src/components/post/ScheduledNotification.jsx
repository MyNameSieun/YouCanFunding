import React, { useState } from 'react';
import styled from 'styled-components';
import calendar from 'assets/calendar.png';
import gift from 'assets/gift.png';
import { PiBellBold } from 'react-icons/pi';

function ScheduledNotification({ productIdToDisplay, onApplyOpenNotification, onCancelOpenNotification }) {
  const [notificationRequested, setNotificationRequested] = useState(false);

  // 오픈 알림 신청
  const applyOpenNotification = async () => {
    await onApplyOpenNotification(productIdToDisplay);

    window.alert('오픈 알림 신청이 완료되었습니다.');
    setNotificationRequested(true);
  };

  // 오픈 알림 취소
  const cancelOpenNotification = async () => {
    const isCancled = window.confirm('정말 취소하시겠습니까?\n오픈 알림과 혜택을 받을 수 없습니다.');

    if (isCancled) {
      await onCancelOpenNotification(productIdToDisplay);
      setNotificationRequested(false);
    }
  };

  return (
    <OpeningContainer>
      <OpeningDate>
        <img src={calendar} alt="캘린더"></img>
        <p>?월 ?일 ?요일 ?시 오픈 예정</p>
      </OpeningDate>
      <OpeningGift>
        <img src={gift} alt="선물"></img>
        <p>얼리버드 혜택 제공</p>
      </OpeningGift>

      <OpeningButton completed={notificationRequested}>
        <button onClick={notificationRequested ? cancelOpenNotification : applyOpenNotification}>
          <PiBellBold />
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
  gap: 5px;
  margin-top: 30px;
`;

const OpeningDate = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;

  & img {
    width: 21px;
    height: 21px;
  }

  & p {
    font-size: 15px;
  }
`;

const OpeningGift = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;

  & img {
    width: 21px;
    height: 21px;
  }

  & p {
    font-size: 15px;
  }
`;

const OpeningButton = styled.div`
  & button {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;

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
