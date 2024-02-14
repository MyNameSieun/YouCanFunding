import React, { useEffect, useRef, useState } from 'react';
import { auth, db, storage } from '../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import styled from 'styled-components';
import Navbar from 'components/common/Navbar';
import defaultUser from 'assets/defaultUser.png';
import { IoIosSettings } from 'react-icons/io';
import { BsPencilSquare } from 'react-icons/bs';
import { collection, getDocs, query, updateDoc, where } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const MyPage = ({ activeNavTab, setActiveNavTab }) => {
  const user = auth.currentUser;
  const [projects, setProject] = useState([]);
  const [upLoadImg, setUpLoadImg] = useState(user?.photoURL);
  const fileInput = useRef(null);
  const [isEditingImg, setIsEditingImg] = useState(false);
  const [userNickName, setUserNickName] = useState(user?.displayName);
  const [isEditingName, setIsEditingName] = useState(false);
  const [activeMyTab, setActiveMyTab] = useState('내가 등록한 펀딩');
  const [pageScroll, setPageScroll] = useState(8);
  const navigate = useNavigate();

  // DB에서 데이터 가져오기
  useEffect(() => {
    const getProjects = async () => {
      const projectQuery = query(collection(db, 'projects'));
      const querySnapshot = await getDocs(projectQuery);

      const projectList = querySnapshot.docs.map((doc) => {
        return doc.data();
      });
      setProject(projectList);
    };

    getProjects();
  }, []);

  // --- 프로필사진 등록 ----//

  const userImgUploadHandler = (e) => {
    setUpLoadImg(e.target.files[0]);
  };

  // 이미지 등록 클릭
  const onClickFileBtn = () => {
    fileInput.current.click();

    if (!isEditingImg) {
      setIsEditingImg(true);
      return;
    }
    setIsEditingImg(false);
  };

  // 이미지 등록완료
  const onClickDoneBtn = async () => {
    if (!upLoadImg) {
      return alert('수정사항이 없습니다.');
    }
    const userImgRef = ref(storage, `users/${user?.uid}`);
    const result = await uploadBytes(userImgRef, upLoadImg);
    const downloadURL = await getDownloadURL(result.ref);
    setUpLoadImg(downloadURL);
    await updateProfile(user, {
      photoURL: downloadURL
    });

    setIsEditingImg(false);
  };
  // 이미지 등록취소
  const onClickCancelBtn = () => {
    setIsEditingImg(false);
  };

  // ------  닉네임 ----------- //

  // 닉네임 변경 취소
  const onClickCancel = () => {
    setIsEditingName(false);
  };

  const nicknameChangeUtil = (e) => {
    setUserNickName(e.target.value);
  };

  const nickNameOnClickHandler = () => {
    if (!isEditingName) {
      setIsEditingName(true);
      return;
    }
    setIsEditingName(false);
  };

  // 닉네임 변경 완료
  const onClickModifyDone = async () => {
    if (!userNickName) {
      return alert('수정사항이 없습니다.');
    }
    if (userNickName) {
      await updateProfile(user, { displayName: userNickName });
      const nicknameQuery = query(collection(db, 'users'), where('uid', '==', user.uid));
      const nicknameSnapshot = await getDocs(nicknameQuery);
      nicknameSnapshot.docs.forEach((doc) => {
        updateDoc(doc.ref, { nickname: user?.displayName });
      });
    }

    setUserNickName(userNickName);
    setIsEditingName(false);
  };

  // 마이탭 변경
  const activeTabHandler = (e) => {
    setActiveMyTab(e.target.textContent);
  };

  // 더보기 버튼
  const MoreBtn = () => {
    setPageScroll((pageScroll) => pageScroll + 4);
  };
  let buttonText = '더 보기';
  switch (activeMyTab) {
    case '내가 등록한 펀딩':
      buttonText = ' 내가 등록한 펀딩 더 보기';
      break;
    case '스크랩한 펀딩':
      buttonText = '스크랩한 펀딩 더 보기';
      break;
    case '알림 신청한 펀딩':
      buttonText = '알림 신청한 펀딩 더 보기';
      break;
    case '내가 후원한 펀딩':
      buttonText = '내가 후원한 펀딩 더 보기';
      break;
    default:
      break;
  }

  return (
    <>
      <Navbar activeNavTab={activeNavTab} setActiveNavTab={setActiveNavTab} />
      <UserInfoWrapper>
        <UserImg src={user?.photoURL ?? defaultUser} />
        <input
          type="file"
          style={{ display: 'none' }}
          accept="image/jpg,image/png,image/jpeg"
          name="profileImg"
          onChange={userImgUploadHandler}
          ref={fileInput}
        />
        {isEditingImg ? (
          <ImgBtnWrapper>
            <CancelImgBtn onClick={onClickCancelBtn}>취소</CancelImgBtn>
            <DoneImgBtn onClick={onClickDoneBtn}>수정</DoneImgBtn>
          </ImgBtnWrapper>
        ) : (
          <SetIcon onClick={onClickFileBtn}>
            <IoIosSettings size={20} />
          </SetIcon>
        )}

        <UserInfo>
          {isEditingName ? (
            <BtnWrapper>
              <input
                type="text"
                onChange={nicknameChangeUtil}
                value={userNickName}
                defaultValue={user?.displayName}
                autoFocus
              />
              <CancelBtn onClick={onClickCancel}>취소</CancelBtn>
              <DoneBtn onClick={onClickModifyDone}>수정완료</DoneBtn>
            </BtnWrapper>
          ) : (
            <UserText>
              <UserNickName>{user?.displayName ?? '닉네임'}</UserNickName>
              <NickNameIcon onClick={nickNameOnClickHandler}>
                <BsPencilSquare size={15} />
              </NickNameIcon>
            </UserText>
          )}
          <p>{user?.email ?? '소셜 계정으로 로그인 중입니다.'}</p>
        </UserInfo>
      </UserInfoWrapper>
      <nav>
        <NavTep>
          <NavTepLists onClick={activeTabHandler} $activeTab={activeMyTab}>
            내가 등록한 펀딩
          </NavTepLists>
          <NavTepLists onClick={activeTabHandler} $activeTab={activeMyTab}>
            스크랩한 펀딩
          </NavTepLists>
          <NavTepLists onClick={activeTabHandler} $activeTab={activeMyTab}>
            알림 신청한 펀딩
          </NavTepLists>
          <NavTepLists onClick={activeTabHandler} $activeTab={activeMyTab}>
            내가 후원한 펀딩
          </NavTepLists>
        </NavTep>
      </nav>
      <main>
        <CardContainer>
          {projects
            .filter(
              (project) =>
                (activeMyTab === '내가 등록한 펀딩' && project.myPageState === 'register') ||
                (activeMyTab === '스크랩한 펀딩' && project.myPageState === 'clipping') ||
                (activeMyTab === '알림 신청한 펀딩' && project.myPageState === 'notificationSettings') ||
                (activeMyTab === '내가 후원한 펀딩' && project.myPageState === 'support')
            )
            .slice(0, pageScroll)
            .map((project) => (
              <CardLists key={project.id} onClick={() => navigate(`/post/${project.id}`)}>
                <ProductImg src={project.mainImage} alt="상품 이미지" />
                <ProductName>{project.title}</ProductName>
              </CardLists>
            ))}
        </CardContainer>
        <MoreMyBtnWrapper>
          <MoreMyBtn onClick={() => MoreBtn()}>{buttonText}</MoreMyBtn>
        </MoreMyBtnWrapper>
      </main>
    </>
  );
};

export default MyPage;

const UserInfoWrapper = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 30px;
  margin-left: 40px;
  margin-bottom: 30px;
`;

const NavTep = styled.ul`
  display: flex;
  justify-content: space-evenly;
  gap: 10px;
  border-bottom: 2px solid #e6e6e6;
  margin-bottom: 35px;
  font-weight: bold;
  font-size: 20px;
`;

const NavTepLists = styled.li`
  color: #878f97;
  padding: 1rem;
  ${(props) => (props.$activeTab === props.children ? 'border-bottom: 3px solid var(--main-color);' : 'none')};
  ${(props) => (props.$activeTab === props.children ? 'color:black' : 'none')};
  cursor: pointer;
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: start;
  gap: 30px;
  flex-wrap: wrap;
`;

const CardLists = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 20px;
  border: 2px solid #dfdfdf;
  border-radius: 9px;
  width: 270px;
  height: 270px;
  background-color: #ffffff84;
  cursor: pointer;

  &:hover {
    box-shadow: 5px 5px 5px lightgray;
  }
`;

const UserImg = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  overflow: hidden;
`;

const SetIcon = styled.button`
  width: 30px;
  height: 30px;
  background-color: white;
  border-radius: 50%;
  border: none;
  margin: 50px 0 0 -20px;
  display: flex;
  align-items: center;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
  margin-left: 20px;
  color: #818181;
`;

const UserText = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const UserNickName = styled.span`
  font-weight: bold;
  font-size: 1.2rem;
  color: #464646;
`;

const NickNameIcon = styled.button`
  width: 30px;
  height: 30px;
  background-color: white;
  border-radius: 50%;
  overflow: hidden;
  border: none;
`;

const BtnWrapper = styled.div`
  display: flex;
  margin-bottom: 10px;
  gap: 4px;
`;

const DoneBtn = styled.button`
  background-color: var(--main-color);
  color: white;
  border: none;
  padding: 0.3rem 0.6rem;
  border-radius: 5px;
`;

const CancelBtn = styled.button`
  background-color: var(--sub-color);
  color: white;
  border: none;
  padding: 0.3rem 0.6rem;
  border-radius: 5px;
`;

const ProductImg = styled.img`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const ProductName = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin-left: 10px;
`;

const ImgBtnWrapper = styled.div`
  display: flex;
  gap: 4px;
  margin: 140px 0 0 -98px;
`;

const DoneImgBtn = styled.button`
  background-color: var(--main-color);
  color: white;
  border: none;
  padding: 0.3rem 0.6rem;
  border-radius: 5px;
`;

const CancelImgBtn = styled.button`
  background-color: var(--sub-color);
  color: white;
  border: none;
  padding: 0.3rem 0.6rem;
  border-radius: 5px;
`;

const MoreMyBtnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 70px;
`;

const MoreMyBtn = styled.button`
  width: 550px;
  color: #464646;
  font-weight: bold;
  font-size: 18px;
  border-radius: 7px;
  border: 2px solid #dfdfdf;
  padding: 10px;
  margin: 30px auto 80px auto;
  cursor: pointer;
`;
