import React, { useState } from 'react';
import Navbar from 'components/common/Navbar';
import SearchInput from 'components/SearchInput';
import CategoryTab from 'components/CategoryTab';
import HomeVerticalCard from 'components/HomeVerticalCard';
import HomeAddBtn from 'components/HomeAddBtn';
import Banner from 'components/Banner';

function Main({ activeNavTab, setActiveNavTab, activeTab, setActiveTab }) {
  const [search, setSearch] = useState();
  const [visibleProducts, setVisibleProducts] = useState(8);

  return (
    <>
      <Navbar activeNavTab={activeNavTab} setActiveNavTab={setActiveNavTab} />
      <Banner />
      <SearchInput search={search} setSearch={setSearch} />
      <CategoryTab activeTab={activeTab} setActiveTab={setActiveTab} />
      <HomeVerticalCard
        activeTab={activeTab}
        search={search}
        activeNavTab={activeNavTab}
        visibleProducts={visibleProducts}
      />
      <HomeAddBtn activeNavTab={activeNavTab} setVisibleProducts={setVisibleProducts} />
    </>
  );
}

export default Main;
