import React from 'react';
import styled from 'styled-components';

const SearchContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 40px;
`;

const SearchInput = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 8px;
  outline: none;

  &:focus {
    border-color: var(--main-color);
  }
`;

const SearchButton = styled.button`
  padding: 8px 12px;
  background-color: var(--main-color);
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

function Search() {
  return (
    <SearchContainer>
      <SearchInput type="text" placeholder="검색어를 입력하세요" />
      <SearchButton>검색</SearchButton>
    </SearchContainer>
  );
}

export default Search;
