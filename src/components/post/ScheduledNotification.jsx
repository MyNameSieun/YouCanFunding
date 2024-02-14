import React, { useState } from 'react';
import styled from 'styled-components';
import calendar from 'assets/calendar.png';
import gift from 'assets/gift.png';
import { PiBellBold } from 'react-icons/pi';
import { useNavigate, useParams } from 'react-router-dom';
import { auth, db } from '../../firebase';
import { deleteDoc, doc, setDoc } from 'firebase/firestore';

function ScheduledNotification({ projects, onApplyOpenNotification, onCancelOpenNotification }) {
  const [notificationRequested, setNotificationRequested] = useState(false);
  const id = useParams().id;
  const navigate = useNavigate();

  // projects 배열에서 현재 페이지의 프로젝트 가져오기
  const foundProject = projects.find((project) => project.id === id);

  // 현재 페이지의 프로젝트가 없는 경우 처리
  if (!foundProject) {
    return <div>프로젝트를 찾을 수 없습니다.</div>;
  }

  const { startDate } = foundProject;

  // // Firebase에서 notificationRequested 값을 가져와서 설정
  // useEffect(() => {
  //   const fetchNotificationStatus = async () => {
  //     const notificationDocRef = doc(db, 'notifications', id);
  //     const docSnapshot = await getDoc(notificationDocRef);

  //     // if (docSnapshot.exists()) {
  //     //   setNotificationRequested(docSnapshot.data().notification);
  //     // }
  //   };

  //   fetchNotificationStatus();
  // }, [id]);

  // 오픈 알림 신청
  const applyOpenNotification = async () => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      alert('로그인이 필요합니다.');
      return navigate('/login');
    }
    await onApplyOpenNotification(id);

    // 새로운 DB 생성 및 업데이트
    const notificationDocRef = doc(db, 'notifications', id);

    await setDoc(notificationDocRef, { notification: true });

    window.alert('오픈 알림 신청이 완료되었습니다.');
    setNotificationRequested(true);
  };

  // 오픈 알림 취소
  const cancelOpenNotification = async () => {
    const isCancled = window.confirm('정말 취소하시겠습니까?\n오픈 알림과 혜택을 받을 수 없습니다.');

    if (isCancled) {
      await onCancelOpenNotification(id);

      // 해당 프로젝트에 대한 DB 삭제
      const notificationDocRef = doc(db, 'notifications', id);
      await deleteDoc(notificationDocRef);

      setNotificationRequested(false);
    }
  };

  // 날짜 형식 변경 함수
  const formattedDate = (date) => {
    return new Date(date).toLocaleDateString('ko-KR', {
      year: '2-digit',
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  };

  return (
    <OpeningContainer>
      <OpeningDate>
        <img src={calendar} alt="캘린더"></img>
        <p>{`${formattedDate(startDate)}`} 10시 오픈 예정</p>
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
    font-size: 16px;
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
    font-size: 16px;
  }
`;

const OpeningButton = styled.div`
  & button {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;

    width: 100%;
    margin-top: 25px;
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
