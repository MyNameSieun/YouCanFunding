import React, { useState } from 'react';
import Navbar from 'components/common/Navbar';
import styled from 'styled-components';
import ProductsList from 'data/products.json';
import SponsorBtn from 'components/post/SponsorBtn';
import SponsorItem from 'components/post/SponsorItem';
import ScheduledNotification from 'components/post/ScheduledNotification';
import ScheduledComments from 'components/post/ScheduledComments';
import CompletedNotification from 'components/post/CompletedNotification';
import CompletedComments from 'components/post/CompletedComments';

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
  const [productLists, setProductLists] = useState(ProductsList);

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
          <img src="assets" alt="" />
        </ImageBox>
        <TitleBox>
          <Title>{productToDisplay.name}</Title>
          <SubTitle>
            프로젝트 설명프로젝트 설명프로젝트 설명프로젝트 설명프로젝트 설명프로젝트 설명 프로젝트 설명 프로젝트
            설명프로젝트 설명프로젝트 설명프로설명프로젝트 설명프로설명프로젝트 설명프로명프로명프로명프로명프로
          </SubTitle>

          {/* <ScheduledNotification
            productIdToDisplay={67}
            onApplyOpenNotification={handleApplyOpenNotification}
            onCancelOpenNotification={handleCancelOpenNotification}
          /> */}

          {/* <SponsorBtn /> */}

          <CompletedNotification />
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
          <ProjectInfoContainer>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores laborum ullam reprehenderit repellendus
            eius veritatis voluptatibus exercitationem mollitia inventore delectus culpa nulla ducimus enim, porro
            reiciendis! Animi ratione et adipisci. Quod amet consequuntur voluptatibus aliquid cum alias molestias
            ratione fugit soluta quis sit, minima praesentium. Quia sint iusto repellat maiores, a, blanditiis facere
            magni numquam dolores necessitatibus, sequi ipsam aperiam. Neque optio pariatur deleniti facere aliquid odio
            soluta reiciendis nesciunt necessitatibus ullam nisi in voluptatum animi earum voluptates voluptate, dolor
            laborum repellat fuga officiis ad minima tempora rerum. Maxime, sunt! Autem molestias magnam sunt officia
            unde, quaerat incidunt ullam deserunt minus tenetur maiores corrupti! Aspernatur, itaque doloribus labore
            esse
          </ProjectInfoContainer>
        ) : (
          // <ScheduledComments />

          // <SponsorItem />

          <CompletedComments />
        )}
      </BottomBox>
    </>
  );
}

export default Post;
