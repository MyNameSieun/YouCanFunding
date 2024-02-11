import React from 'react';
import Navbar from 'components/common/Navbar';

function Post({ activeNavTab, setActiveNavTab }) {
  return (
    <>
      <Navbar activeNavTab={activeNavTab} setActiveNavTab={setActiveNavTab} />
      Post
    </>
  );
}

export default Post;
