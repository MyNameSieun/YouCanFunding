import React, { useRef, useState } from 'react';
// import { auth, storage } from '../firebase';
// import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import styled from 'styled-components';
import Navbar from 'components/common/Navbar';
import defaultUser from 'assets/defaultUser.png';
import { IoIosSettings } from 'react-icons/io';
import { BsPencilSquare } from 'react-icons/bs';

const MyPage = () => {
  const [userImgs, setUserImg] = useState(defaultUser);
  const fileInput = useRef(null);
  const [userNickName, setUserNickName] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const userImgUploadHandler = (e) => {
    if (e.target.files[0]) {
      setUserImg(e.target.files[0]);
    } else {
      setUserImg(userImgs);
      return;
    }

    //화면에 프로필 사진 표시
    const imgReader = new FileReader();
    imgReader.onload = () => {
      if (imgReader.readyState === 2) {
        setUserImg(imgReader.result);
      }
    };
    imgReader.readAsDataURL(e.target.files[0]);
  };

  const onClickFileBtn = (e) => {
    fileInput.current.click();
  };

  // 닉네임

  const onClickCancel = () => {
    setIsEditing(false);
  };

  const onClickModifyDone = () => {
    if (!userNickName) {
      return alert('수정사항이 없습니다.');
    }
    // const imageRef = ref(storage, `${auth.currentUser.uid}/${userImgs.name}`);
    // await uploadBytes(imageRef, userImgs);
    // const downloadURL = getDownloadURL(imageRef);
    setIsEditing(false);
    setUserNickName('');
  };

  const nicknameChangeUtil = (e) => {
    setUserNickName(e.target.value);
  };

  const nickNameOnClickHandler = () => {
    if (!isEditing) {
      setIsEditing(true); // 연필 버튼을 클릭하면 edit모드를 true로
      return;
    }
    setUserNickName(userNickName);
    setIsEditing(false);
  };

  return (
    <>
      <Navbar />
      <UserInfoWrapper>
        <div>
          <UserImg src={userImgs} alt="유저 프로필사진" />
          <input
            type="file"
            style={{ display: 'none' }}
            accept="image/jpg,impge/png,image/jpeg"
            name="profileImg"
            onChange={userImgUploadHandler}
            ref={fileInput}
          />
          <SetIcon onClick={onClickFileBtn}>
            <IoIosSettings />
          </SetIcon>
        </div>
        <UserInfo>
          {isEditing ? (
            <>
              <input type="text" onChange={nicknameChangeUtil} value={userNickName} />
              <button onClick={onClickModifyDone}>수정완료</button>
              <button onClick={onClickCancel}>취소</button>
            </>
          ) : (
            <>
              <span>{userNickName || '닉네임'}</span>
              <NickNameIcon onClick={nickNameOnClickHandler}>
                <BsPencilSquare />
              </NickNameIcon>
            </>
          )}
          <p>1234@gmail.com</p>
        </UserInfo>
      </UserInfoWrapper>
      <nav>
        <NavTep>
          <NavTepLists>내가 등록한 펀딩</NavTepLists>
          <NavTepLists>스크랩한 펀딩</NavTepLists>
          <NavTepLists>알림신청한 펀딩</NavTepLists>
          <NavTepLists>내가 펀딩한 목록</NavTepLists>
        </NavTep>
      </nav>
      <main>
        <article>
          <CardLists>
            <img src="" alt="글이미지" />
            <h2>제목</h2>
            <p>내용</p>
          </CardLists>
        </article>

        <div>내가 등록한 펀딩 더보기</div>
      </main>
    </>
  );
};

const UserInfoWrapper = styled.div`
  width: 100%;
  height: 150px;
  border: 1px solid red;
  display: flex;
  align-items: center;
`;
const NavTep = styled.ul`
  display: flex;
  border-bottom: 1px solid #e6e6e6;
  padding: 1rem;
  gap: 20px;
`;

const NavTepLists = styled.li`
  color: #878f97;
  font-weight: bold;
`;

const CardLists = styled.div`
  border: 1px solid #dfdfdf;
  width: 200px;
  height: 100px;
`;

const UserImg = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
  &img {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
`;

const SetIcon = styled.button`
  width: 30px;
  height: 30px;
  background-color: white;
  border-radius: 50%;
  overflow: hidden;
  border: none;
  margin: 0 0 0 -20px;
`;
const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
`;
const InfoBtn = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const NickNameIcon = styled.button`
  width: 30px;
  height: 30px;
  background-color: white;
  border-radius: 50%;
  overflow: hidden;
  border: none;
`;

export default MyPage;
