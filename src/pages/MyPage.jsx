import React from 'react';
import styled from 'styled-components';

const MyPage = () => {
  const UserInfoWrapper = styled.div`
    width: 100%;
    height: 150px;
    border: 1px solid red;
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
  return (
    <>
      <UserInfoWrapper>
        <img src="" alt="유저 프로필사진" />
        <span>프로필사진 수정</span>
        <p>닉네임</p>
        <span>닉네임수정</span>
        <p>이메일 아이디?</p>
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

export default MyPage;
