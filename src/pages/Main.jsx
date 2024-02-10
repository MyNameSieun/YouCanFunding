import React, { useState } from 'react';
import styled from 'styled-components';
import Navbar from 'components/common/Navbar';
import Search from 'components/Search';
import CategoryTab from 'components/CategoryTab';
import HomeVerticalCard from 'components/HomeVerticalCard';
import HomeAddBtn from 'components/HomeAddBtn';

const Banner = styled.div`
  background-color: #ffcd6b;
  height: 350px;
  width: 100%;
`;

function Main() {
  const [activeTab, setActiveTab] = useState('전체');

  return (
    <>
      <Navbar />
      <Banner />
      <Search />
      <CategoryTab activeTab={activeTab} setActiveTab={setActiveTab} />
      <HomeVerticalCard activeTab={activeTab} />
      <HomeAddBtn />
    </>
  );
}

export default Main;
