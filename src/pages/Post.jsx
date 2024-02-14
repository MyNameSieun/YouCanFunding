import React, { useEffect, useState } from 'react';
import Navbar from 'components/common/Navbar';
import styled from 'styled-components';
import SponsorBtn from 'components/post/SponsorBtn';
import SponsorItem from 'components/post/SponsorItem';
import ScheduledNotification from 'components/post/ScheduledNotification';
import ScheduledComments from 'components/post/ScheduledComments';
import CompletedNotification from 'components/post/CompletedNotification';
import CompletedComments from 'components/post/CompletedComments';
import { useParams } from 'react-router';
import { collection, getDocs, query, updateDoc, doc } from '@firebase/firestore';
import { db } from '../firebase';
import SponsorList from 'components/post/SponsorList';

const ProjectIntroduction = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: row;
  margin-top: 100px;
  position: relative;
`;

const ImageBox = styled.div`
  border: 2px solid #dfdfdf;
  background-color: white;
  border-radius: 9px;
  width: 500px;
  height: 375px;
  position: relative;

  & img {
    background-size: 100%;
    background-repeat: no-repeat;
  }
`;

const TitleBox = styled.div`
  margin-left: 60px;
  width: 504px;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 30px;
  line-height: 1.7;
  margin-bottom: 8px;
`;

const SubTitle = styled.div`
  color: #818181;
  font-size: 16px;
  line-height: 1.5;
  margin-top: 16px;
`;

const PostTab = styled.div`
  display: flex;
  justify-content: space-between;
  width: 350px;
  margin: 80px auto;
  font-size: 24px;
  font-weight: bold;
`;

const TabItem = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-top: 20px;
  padding-bottom: 5px;
  cursor: pointer;
  color: ${(props) => (props.activePostTab ? 'black' : '#878f97')};
  font-weight: ${(props) => (props.activePostTab ? 'bold' : 'bolder')};

  border-bottom: ${(props) => (props.activePostTab ? '3px solid var(--main-color)' : 'none')};
  margin-bottom: ${(props) => (props.activePostTab ? '-23px' : '0')};
`;

const Hr = styled.div`
  border: 2px solid #e6e6e6;
  margin-top: -60px;
`;

const BottomBox = styled.div`
  width: 80%;
  margin: 0 auto;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const ProjectInfoContainer = styled.div`
  font-size: 16px;
  line-height: 1.8;
  margin: 50px auto;
`;

function Post({ activeNavTab, setActiveNavTab }) {
  const [activePostTab, setActivePostTab] = useState('project');
  const [projects, setProject] = useState([]);
  const id = useParams().id;
  const [receiptPrice, setReceiptPrice] = useState(0);
  const [userComment, setUserComment] = useState([]);

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

  // 데이터를 로딩중일 때
  if (projects.length <= 0) {
    return <div>로딩중입니다..!</div>;
  }

  // id에 해당하는 데이터 추출
  const foundProject = projects.find((project) => project.id === id);

  // quill.js 결과 HTML 파싱
  const dangerousHTML = { __html: foundProject.content };

  // 오픈 알림 신청
  const handleApplyOpenNotification = async (projectIdToDisplay) => {
    await updateDoc(doc(db, 'projects', projectIdToDisplay), { myPageState: 'notificationSettings' });

    const updatedProjects = projects.map((project) => {
      if (project.id === projectIdToDisplay) {
        return { ...project, myPageState: 'notificationSettings' };
      }
      return project;
    });

    setProject(updatedProjects);

    console.log(`프로젝트 ID ${projectIdToDisplay}에 대한 오픈 알림 신청`);
  };

  // 오픈 알림 취소
  const handleCancelOpenNotification = async (projectIdToDisplay) => {
    await updateDoc(doc(db, 'projects', projectIdToDisplay), { myPageState: 'none' });
    const updatedProjects = projects.map((project) => {
      if (project.id === projectIdToDisplay) {
        return { ...project, myPageState: 'none' };
      }
      return project;
    });

    setProject(updatedProjects);

    console.log(`프로젝트 ID ${projectIdToDisplay}에 대한 오픈 알림 취소`);
  };

  const handleTabClick = (tab) => {
    setActivePostTab(tab);
  };

  return (
    <>
      <Navbar activeNavTab={activeNavTab} setActiveNavTab={setActiveNavTab} />
      <ProjectIntroduction>
        <ImageBox>
          <img src={foundProject.mainImage} width="500px" height="298px" alt={foundProject.title} />
        </ImageBox>
        <TitleBox>
          <Title>{foundProject.title}</Title>
          <SubTitle>{foundProject.summary}</SubTitle>
          <ScheduledNotification
            projectIdToDisplay={foundProject.id}
            onApplyOpenNotification={handleApplyOpenNotification}
            onCancelOpenNotification={handleCancelOpenNotification}
          />

          <SponsorBtn receiptPrice={receiptPrice} setReceiptPrice={setReceiptPrice} />

          {/* <CompletedNotification /> */}
        </TitleBox>
      </ProjectIntroduction>
      <PostTab>
        <TabItem activePostTab={activePostTab === 'project'} onClick={() => handleTabClick('project')}>
          프로젝트 설명
        </TabItem>
        <TabItem activePostTab={activePostTab === 'comments'} onClick={() => handleTabClick('comments')}>
          서포터
        </TabItem>
      </PostTab>
      <Hr />
      <BottomBox>
        {activePostTab === 'project' ? (
          <ProjectInfoContainer dangerouslySetInnerHTML={dangerousHTML} />
        ) : (
          // <ScheduledComments />

          <SponsorList userComment={userComment} setUserComment={setUserComment} />

          // <CompletedComments />
        )}
      </BottomBox>
    </>
  );
}

export default Post;
