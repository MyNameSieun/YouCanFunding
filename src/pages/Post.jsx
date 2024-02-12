import React, { useState } from 'react';
import styled from 'styled-components';
import Navbar from 'components/common/Navbar';
import defaultUser from 'assets/defaultUser.png';

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
  width: 534px;
  height: 298px;
  position: relative;

  & img {
    background-size: 100%;
    background-repeat: no-repeat;
  }
`;
const TitleBox = styled.div`
  margin-left: 60px;
  width: 500px;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 28px;
  margin-bottom: 8px;
`;
const SubTitle = styled.div`
  color: #818181;
  font-size: 15px;
  margin-top: 16px;
`;
const Achieve = styled.div`
  font-weight: bold;
  font-size: 18px;
  color: #464646;
  margin-top: 30px;
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
  margin-top: 35px;

  input {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    width: 200px;
    font-size: 16px;
    margin-right: 10px;
  }

  button {
    padding: 10px 20px;
    background-color: #4caf50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #45a049;
    }
  }
`;
const PostTab = styled.div`
  display: flex;
  justify-content: space-between;
  width: 350px;
  margin: 60px auto;
  font-size: 24px;
  font-weight: bold;
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
const ProjectInfoContainer = styled.div``;

const TabItem = styled.div`
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
  color: ${(props) => (props.activePostTab ? 'black' : '#878f97')};
  font-weight: ${(props) => (props.activePostTab ? 'bold' : 'normal')};
`;
const FontWeight = styled.span`
  font-weight: bold;
`;

const CommentContainer = styled.div`
  display: flex;
  align-items: center;
  border: 2px solid #dfdfdf;
  width: 800px;
  margin: 7px auto;
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

function Post({ activeNavTab, setActiveNavTab }) {
  const [activePostTab, setActivePostTab] = useState('project');

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
          <Title>[캣닢 장난감] 고양이를 사랑한 오렌지</Title>
          <SubTitle>
            프로젝트 설명프로젝트 설명프로젝트 설명프로젝트 설명프로젝트 설명프로젝트 설명 프로젝트 설명
          </SubTitle>
          <Achieve>
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
          </InProgress>
        </TitleBox>
      </ProjectIntroduction>
      <PostTab>
        <TabItem activePostTab={activePostTab === 'project'} onClick={() => handleTabClick('project')}>
          프로젝트 설명
        </TabItem>
        <TabItem activePostTab={activePostTab === 'comments'} onClick={() => handleTabClick('comments')}>
          댓글
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
          <>
            <CommentContainer>
              <CommentImage src={defaultUser} alt="User Profile" />
              <CommentText>
                박시은님이 <FontWeight>165,000원</FontWeight> 펀딩했어요.
              </CommentText>
            </CommentContainer>
            <CommentContainer>
              <CommentImage src={defaultUser} alt="User Profile" />
              <CommentText>
                박시은님이 <FontWeight>165,000원</FontWeight> 펀딩했어요.
              </CommentText>
            </CommentContainer>
            <CommentContainer>
              <CommentImage src={defaultUser} alt="User Profile" />
              <CommentText>
                박시은님이 <FontWeight>165,000원</FontWeight> 펀딩했어요.
              </CommentText>
            </CommentContainer>
          </>
        )}
      </BottomBox>
    </>
  );
}

export default Post;
