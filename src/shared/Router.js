// Router.js
import { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from 'pages/Home';
import Login from 'pages/Login';
import Main from 'pages/Main';
import MyPage from 'pages/MyPage';
import Post from 'pages/Post';
import Register from 'pages/Register';
import SignUp from 'pages/SignUp';
import React from 'react';

const Router = () => {
  const [activeNavTab, setActiveNavTab] = useState('inProgress');
  const [activeTab, setActiveTab] = useState('전체');
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Home activeNavTab={activeNavTab} setActiveNavTab={setActiveNavTab} isMainPage={false} />}
        />
        <Route
          path="/main"
          element={
            <Main
              activeNavTab={activeNavTab}
              setActiveNavTab={setActiveNavTab}
              isMainPage={true}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          }
        />
        <Route path="/login" element={<Login activeNavTab={activeNavTab} setActiveNavTab={setActiveNavTab} />} />
        <Route path="/signup" element={<SignUp activeNavTab={activeNavTab} setActiveNavTab={setActiveNavTab} />} />
        <Route path="/mypage" element={<MyPage activeNavTab={activeNavTab} setActiveNavTab={setActiveNavTab} />} />
        <Route path="/register" element={<Register activeNavTab={activeNavTab} setActiveNavTab={setActiveNavTab} />} />
        <Route path="/post/:id" element={<Post activeNavTab={activeNavTab} setActiveNavTab={setActiveNavTab} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
