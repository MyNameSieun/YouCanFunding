import React from 'react';
import styled from 'styled-components';

const SearchContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 40px;
`;

const Input = styled.input`
  border: 1px solid #ccc;
  border-radius: 50px;
  outline: none;
  width: 356px;
  height: 41px;
  text-indent: 10px;
  &:focus {
    border-color: var(--main-color);
  }
`;

function SearchInput({ search, setSearch }) {
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  return (
    <SearchContainer>
      <Input type="text" placeholder="검색어를 입력하세요" onChange={handleSearch} value={search} />
    </SearchContainer>
  );
}

export default SearchInput;
