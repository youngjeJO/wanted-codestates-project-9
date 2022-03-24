import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

function Search() {
  const [inputData, setinputData] = useState('');
  const [getData, setGetData] = useState([]);
  const [selectIndex, setSelectIndex] = useState(-1);

  const URL = process.env.REACT_APP_SEARCH_KEY;
  useEffect(async () => {
    const { data } = await axios.get(URL + inputData);
    setGetData(data.slice(0, 10));
  }, [inputData]);

  const onChange = (e) => {
    setinputData(e.target.value);
  };

  const searchItem = (e) => {
    e.preventDefault();
    const selectedItem = document.querySelectorAll('.resultList');
    setinputData(selectedItem[selectIndex].innerText);
    setSelectIndex(-1);
  };

  const keyDown = (e) => {
    const dataLenght = getData.slice(0, 10).length;
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (selectIndex >= dataLenght - 1) return;
      setSelectIndex(selectIndex + 1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (selectIndex === 0) return;
      setSelectIndex(selectIndex - 1);
    }
  };

  return (
    <MainContainer>
      <Textbox>
        <p>국내 모든 임상시험 검색하고</p>
        <p>온라인으로 참여하기</p>
      </Textbox>
      <SearchBar onSubmit={searchItem}>
        <input
          type="text"
          placeholder="질환명을 입력해 주세요"
          value={inputData}
          onChange={onChange}
          onKeyDown={keyDown}
        />
        <button type="button">검색</button>
      </SearchBar>
      <Result inputData={inputData}>
        {getData.length >= 1 ? (
          <ResultItem className="listTitle">추천 검색어</ResultItem>
        ) : (
          <ResultItem className="listTitle">검색어 없음</ResultItem>
        )}
        {inputData
          ? getData.map((item, index) => (
              <ResultItem
                className="resultList"
                selected={index === selectIndex}
              >
                {item.name}
              </ResultItem>
            ))
          : null}
      </Result>
    </MainContainer>
  );
}

export default Search;

const MainContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Textbox = styled.div`
  margin-top: 8%;
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
  display: ${({ inputData }) => (inputData ? 'block' : 'none')};
  padding: 0px 40px;
  width: 50%;
  box-sizing: border-box;
  background-color: #ffffff;
  border-radius: 40px;
  overflow: hidden;
  .listTitle {
    font-size: 5px;
  }
  .listTitle:hover {
    background-color: #ffffff;
  }
`;

const ResultItem = styled.li`
  padding: 5px 10px;
  list-style: none;
  border-radius: 40px;
  background-color: ${({ selected }) => (selected ? '#eeeeee' : '#ffffff')};

  :hover {
    background-color: #eeeeee;
  }
`;
