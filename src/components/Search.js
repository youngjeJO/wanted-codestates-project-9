import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { pushData, createData } from '../store/searchSlice';

function Search() {
  const [inputData, setinputData] = useState(null);
  const [selectIndex, setSelectIndex] = useState(-1);
  const { preventData } = useSelector((state) => state.searchSlice);
  const [checkError, setCheckError] = useState(true);
  const dispatch = useDispatch();

  useEffect(async () => {
    if (localStorage.getItem(inputData)) {
      dispatch(createData(JSON.parse(localStorage.getItem(inputData))));
    } else if (inputData) {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_SEARCH_KEY}?name=${inputData}`
        );
        dispatch(createData(data.slice(0, 7)));
      } catch {
        setCheckError(!checkError);
      }
    }
  }, [inputData, selectIndex]);

  let debounve;
  const onChange = (e) => {
    const inputVal = e.target.value.trim();
    if (debounve) {
      clearTimeout(debounve);
    }
    debounve = setTimeout(() => {
      setinputData(inputVal);
    }, 400);
  };

  const searchItem = (e) => {
    e.preventDefault();
    if (selectIndex !== -1) {
      setSelectIndex(-1);
      dispatch(pushData(inputData));
    } else {
      dispatch(pushData(inputData));
    }
  };

  const keyDown = (e) => {
    const dataLenght = preventData.slice(0, 7).length;
    const selectedItem = document.querySelectorAll('.resultList');
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (selectIndex >= dataLenght - 1) return;
      setSelectIndex(selectIndex + 1);
      setinputData(selectedItem[selectIndex + 1].innerText);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (selectIndex === 0) return;
      setSelectIndex(selectIndex - 1);
      setinputData(selectedItem[selectIndex - 1].innerText);
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
          onChange={onChange}
          onKeyDown={keyDown}
        />
        <button type="button" onClick={searchItem}>
          검색
        </button>
      </SearchBar>
      <Result inputData={inputData}>
        {preventData.length >= 1 ? (
          <ResultItem className="listTitle">추천 검색어</ResultItem>
        ) : (
          <ResultItem className="listTitle">검색어 없음</ResultItem>
        )}
        {inputData
          ? preventData.map((item, index) => (
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
    cursor: pointer;
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
