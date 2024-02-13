import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import HeartImg from '../assets/heart.png';
import EmptyHeartImg from '../assets/empty-heart.png';
import { useNavigate } from 'react-router-dom';
import { addDoc, collection, getDocs, query, deleteDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

const Heart = styled.img`
  margin-left: 10px;
  width: 30px;
`;

function HeartButton() {
  const navigate = useNavigate();
  const [like, setLike] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, 'like'));
      const querySnapshot = await getDocs(q);

      const initialLike = querySnapshot.size > 0;

      querySnapshot.forEach((doc) => {
        initialLike.push({ id: doc.id, ...doc.data() });
      });

      setLike(initialLike);
    };

    fetchData();
  }, []);

  const handleLikeBtn = async () => {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      alert('로그인이 필요합니다.');
      return navigate('/signup');
    }

    const collectionRef = collection(db, 'like');
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);

    if (querySnapshot.size > 0) {
      querySnapshot.forEach(async (doc) => {
        // 데이터가 이미 있는 경우 문서 삭제
        await deleteDoc(doc.ref);
      });
    } else {
      const newLike = { isClick: true };
      await addDoc(collectionRef, newLike);
    }

    setLike(!like);
  };

  return (
    <>
      <button onClick={handleLikeBtn}>
        <Heart src={like ? HeartImg : EmptyHeartImg} />
      </button>
    </>
  );
}

export default HeartButton;
