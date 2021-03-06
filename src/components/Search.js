/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { FiSearch } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { pushData, createData, loadingData } from '../store/searchSlice';

function Search() {
  const [inputData, setinputData] = useState('');
  const [selectIndex, setSelectIndex] = useState(-1);
  const { dataList, loading } = useSelector((state) => state.searchSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!inputData) {
      dispatch(createData([]));
      return;
    }

    const debounce = setTimeout(async () => {
      if (localStorage.getItem(inputData)) {
        dispatch(createData(JSON.parse(localStorage.getItem(inputData))));
        if (JSON.parse(localStorage.getItem(inputData)).length === 0) {
          dispatch(loadingData(false));
        }
      } else if (!localStorage.getItem(inputData)) {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_KEY}?name=${inputData}`
        );
        dispatch(createData(data.slice(0, 7)));
        if (data.length === 0) {
          dispatch(loadingData(false));
        }
      }
    }, 600);

    // eslint-disable-next-line consistent-return
    return () => {
      clearTimeout(debounce);
    };
  }, [inputData, selectIndex, loading]);

  const onChange = (e) => {
    setinputData(e.target.value.trim());
  };

  const searchItem = (e) => {
    e.preventDefault();

    if (selectIndex !== -1) {
      setSelectIndex(-1);
      dispatch(pushData(inputData));
    } else if (dataList) {
      dispatch(pushData(inputData));
    }
  };

  const keyDown = (e) => {
    const dataLenght = dataList.slice(0, 7).length;
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
        <p>?????? ?????? ???????????? ????????????</p>
        <p>??????????????? ????????????</p>
      </Textbox>
      <SearchBar onSubmit={searchItem}>
        <FiSearch className="icon" />
        <input
          type="text"
          placeholder="???????????? ????????? ?????????"
          value={inputData}
          onChange={onChange}
          onKeyDown={keyDown}
        />
        <button type="button" onClick={searchItem}>
          ??????
        </button>
      </SearchBar>
      <Result inputData={inputData}>
        <ResultTitle>
          {loading
            ? dataList.length >= 1
              ? '?????? ?????????'
              : '????????? ...'
            : '????????? ??????'}
        </ResultTitle>
        {inputData
          ? dataList.map((item, index) => (
              <ResultItem
                className="resultList"
                selected={index === selectIndex}
              >
                <FiSearch className="icon" />
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
  align-items: center;
  height: 50px;
  width: 50%;
  box-sizing: border-box;
  background-color: #ffffff;
  border-radius: 40px;
  overflow: hidden;
  .icon {
    padding-left: 10px;
    width: 10%;
    font-size: 20px;
  }

  input {
    margin: 0;
    padding: 0 10px;
    width: 70%;
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
  @media screen and (max-width: 450px) {
    width: 90%;
    input {
      width: 300px;
    }
    button {
      width: 60px;
    }
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
  @media screen and (max-width: 450px) {
    width: 90%;
    }
  }
  
`;

const ResultItem = styled.li`
  padding: 5px 10px;
  list-style: none;
  border-radius: 40px;
  background-color: ${({ selected }) => (selected ? '#eeeeee' : '#ffffff')};

  .icon {
    padding-right: 10px;
    width: 10%;
    font-size: 15px;
  }

  :hover {
    background-color: #eeeeee;
  }
`;

const ResultTitle = styled.li`
  padding: 5px 10px;
  list-style: none;
  border-radius: 40px;
`;
