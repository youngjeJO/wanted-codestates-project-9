import React from 'react';
import styled from 'styled-components';

function Search() {
  return (
    <MainContainer>
      <Textbox>
        <p>국내 모든 임상시험 검색하고</p>
        <p>온라인으로 참여하기</p>
      </Textbox>
      <SearchBar>
        <input type="text" placeholder="질환명을 입력해 주세요" />
        <button type="button">검색</button>
      </SearchBar>
      <Result>{}</Result>
    </MainContainer>
  );
}

export default Search;

const MainContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Textbox = styled.div`
  font-weight: bold;

  p {
    text-align: center;
    font-size: 25px;
  }
`;

const SearchBar = styled.form`
  display: flex;
  justify-content: flex-end;
  height: 50px;
  width: 50%;
  box-sizing: border-box;
  background-color: #ffffff;
  border-radius: 40px;
  overflow: hidden;
  input {
    margin: 0;
    padding: 0;
    width: 80%;
    height: 100%;
    border: none;
    outline: none;
  }
  button {
    padding: 0;
    height: 100%;
    width: 15%;
    background-color: #007be9;
    color: #ffffff;
    font-weight: bold;
    font-size: 16px;
    border: none;
  }
`;

const Result = styled.ul`
  width: 50%;
  box-sizing: border-box;
  background-color: #ffffff;
  border-radius: 40px;
`;
