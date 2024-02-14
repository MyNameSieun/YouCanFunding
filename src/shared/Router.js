// Router.js
import Home from 'pages/Home';
import Login from 'pages/Login';
import Main from 'pages/Main';
import MyPage from 'pages/MyPage';
import Post from 'pages/Post';
import Register from 'pages/Register';
import SignUp from 'pages/SignUp';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/main" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/post/:id" element={<Post />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
