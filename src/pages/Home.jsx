import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from 'components/common/Navbar';

function Home({ activeNavTab, setActiveNavTab }) {
  return (
    <>
      <Navbar activeNavTab={activeNavTab} setActiveNavTab={setActiveNavTab} />
      <Link to="/main">
        <button>메인 페이지</button>
      </Link>
      <Link to="/login">
        <button>로그인 페이지</button>
      </Link>
      <Link to="/signup">
        <button>회원가입 페이지</button>
      </Link>
      <Link to="/mypage">
        <button>마이 페이지</button>
      </Link>
      <Link to="/register">
        <button>등록 페이지</button>
      </Link>
      <Link to="/post/:id">
        <button>세부 페이지</button>
      </Link>
    </>
  );
}

export default Home;
