import React, { useEffect, useState } from 'react';
import Navbar from 'components/common/Navbar';
import styled from 'styled-components';
import defaultUser from 'assets/defaultUser.png';
import ScheduledNotification from 'components/post/ScheduledNotification';
import ScheduledComments from 'components/post/ScheduledComments';
import CompletedComments from 'components/post/CompletedComments';
import CompletedNotification from 'components/post/CompletedNotification';
import ProductsList from 'data/products.json';
import HeartButton from 'components/HeartButton';
import SponsorBtn from 'components/SponsorBtn';
import SponsorItem from 'components/SponsorItem';
import { useParams } from 'react-router';
import { collection, getDocs, query } from '@firebase/firestore';
import { db } from '../firebase';

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
  height: 298px;
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
  line-height: 1.2;
`;
const Achieve = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  font-size: 18px;
  color: #464646;
  margin: 30px auto;
  & > div {
    margin-bottom: 10px;
  }
`;

const PointText = styled.span`
  color: ${(props) => props.color};
  font-size: 24px;
`;
const InProgress = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  input {
    padding: 12px;
    border: 1px solid #ddd;
    border-radius: 5px;
    width: 100%;
    font-size: 18px;
    margin-right: 10px;
  }
  button {
    padding: 10px 20px;
    background-color: var(--sub-color);
    color: white;
    border: none;
    border-radius: 7px;
    width: 40%;
    cursor: pointer;
    font-size: 18px;
    transition: background-color 0.3s ease;
  }

  &:hover {
    background-color: #ff3300f6;
  }
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
  cursor: pointer;
  color: ${(props) => (props.activePostTab ? 'black' : '#878f97')};
  font-weight: ${(props) => (props.activePostTab ? 'bold' : 'normal')};

  /* ${(props) => (props.$activePostTab === props.children ? 'border-bottom: 1px solid var(--main-color)' : 'none')} */
  border-bottom: ${(props) => (props.activePostTab ? '4px solid var(--main-color)' : 'none')};
  margin-bottom: ${(props) => (props.activePostTab ? '-23px' : '0')};
`;

const Hr = styled.div`
  border: 2px solid #e6e6e6;
  margin-top: -40px;
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

function Post({ activeNavTab, setActiveNavTab }) {
  const [activePostTab, setActivePostTab] = useState('project');
  const [productLists, setProductLists] = useState(ProductsList);
  const [projects, setProject] = useState([]);
  const id = useParams().id;

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

  // id에 해당하는 데이터 추출출
  const foundProject = projects.find((project) => project.id === id);

  // quill.js 결과 HTML 파싱
  const dangerousHTML = { __html: foundProject.content };

  const productIdToDisplay = 67;
  const productToDisplay = productLists.productList.find((product) => product.id === productIdToDisplay);

  // 오픈 알림 신청
  const handleApplyOpenNotification = async (productIdToDisplay) => {
    const updatedProductList = productLists.productList.map((product) => {
      if (product.id === productIdToDisplay) {
        return { ...product, myPageState: 'notificationSettings' };
      }
      return product;
    });

    setProductLists({ ...productLists, productList: updatedProductList });

    console.log(`프로젝트 ID ${productIdToDisplay}에 대한 오픈 알림 신청`);
  };

  // 오픈 알림 취소
  const handleCancelOpenNotification = async (productIdToDisplay) => {
    const updatedProductList = productLists.productList.map((product) => {
      if (product.id === productIdToDisplay) {
        return { ...product, myPageState: 'schedule' };
      }
      return product;
    });

    setProductLists({ ...productLists, productList: updatedProductList });

    console.log(`Cancel Open Notification for Project ID: ${productIdToDisplay}`);
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
            productIdToDisplay={67}
            onApplyOpenNotification={handleApplyOpenNotification}
            onCancelOpenNotification={handleCancelOpenNotification}
          />

          {/* <Achieve>
            <div>
              <PointText color="var(--main-color)">98%</PointText> 달성
            </div>
            <div>
              <PointText color="var(--sub-color)">123123</PointText>원 모금
            </div>
          </Achieve>
          <InProgress>
            <input placeholder="후원 금액을 입력해주세요." />
            <button>후원하기</button>
            <HeartButton />
          </InProgress> */}
          {/*<SponsorBtn />*/}

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
          <ScheduledComments />

          // <CommentContainer>
          //   <CommentItem>
          //     <CommentImage src={defaultUser} alt="User Profile" />
          //     <CommentText>
          //       박시은님이 <FontWeight>165,000원</FontWeight> 펀딩했어요.
          //     </CommentText>
          //   </CommentItem>
          //   <CommentItem>
          //     <CommentImage src={defaultUser} alt="User Profile" />
          //     <CommentText>
          //       박시은님이 <FontWeight>165,000원</FontWeight> 펀딩했어요.
          //     </CommentText>
          //   </CommentItem>
          //   <CommentItem>
          //     <CommentImage src={defaultUser} alt="User Profile" />
          //     <CommentText>
          //       박시은님이 <FontWeight>165,000원</FontWeight> 펀딩했어요.
          //     </CommentText>
          //   </CommentItem>
          // </CommentContainer>
          //   <SponsorItem />
          // <CompletedComments />
        )}
      </BottomBox>
    </>
  );
}

export default Post;
