import React from 'react';
import styled from 'styled-components';

function Search() {
  const Form = styled.form`
    display: flex;
    justify-content: end;
    margin-top: 40px;
  `;

  return (
    <Form>
      <input type="text" />
      <button>검색</button>
    </Form>
  );
}

export default Search;
