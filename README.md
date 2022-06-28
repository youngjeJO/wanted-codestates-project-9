
## 프로젝트 소개

- 자동 검색 기능 구현하기
- 기간: 22.03.21~22.03.25

## 배포링크

[🚀 배포 링크](https://fabulous-quokka-386634.netlify.app/)
현재 기업 측에서 api 요청을 허용하지 않아 검색 결과가 나오지 않습니다.

## 기술 스택

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)

## 실행 방법

```
① 해당 레포지토리를 클론한다.
② 프로젝트의 패키지를 설치한다. (npm install)
③ scripts 명령어로 프로젝트를 실행한다. (npm start)
```

## 요구사항

- **secret key, api key 등을 레포지토리에 올리지 않도록 유의**
    - README.md 에 관련 설명 명시 필요
- API 호출 최적화
    - 호출별로 로컬 캐싱을 구현합니다. (expire time까지도 있으면 좋음)
    - 입력 마다 호출하지 않고 자신만의 전략으로 API 호출 횟수를 줄입니다. (README.md 에 설명)
- 키보드만으로도 추천 검색어들로 이동이 가능
- 배포하여 웹에서 바로 사용 할 수 있도록 제공 (README.md 에 url 명시)

## 구현 방법

### Api 호출 최적화

- api 호출 최적화를 위해 localstorage에 이전에 검색했던 데이터를 저장했고 동일한 검색어로 검색했을 때 localstorage에 데이터를 불러와 api가 재호출되는 낭비를 줄일 수있었습니다.
- input에 text가 입력과 동시에 api 호출 되는 것을 막기 위해 debounce를 적용해 마지막에 작성된 검색어를 api로 호출 하도록 하였습니다.
    
  ```
    useEffect(() => {
    if (!inputData) {
      return;
    }
    const debounce = setTimeout(async () => {
      if (localStorage.getItem(inputData)) {
        dispatch(createData(JSON.parse(localStorage.getItem(inputData))));
      } else if (!localStorage.getItem(inputData)) {
        const { data } = await axios.get(
          `${process.env.REACT_APP_SEARCH_KEY}?name=${inputData}`
        );
        dispatch(createData(data.slice(0, 7)));
      }
    }, 1000);

    return () => {
      clearTimeout(debounce);
    };
  }, [inputData, selectIndex]);

    ```

### 키보드 이동 구현
- onkeyDown event를 이용해 ArrowDown과 ArrowUp 키를 눌렀을 때 마다 index에 +1 또는  -1을 주어  selectIndex와 ResultItem의 index가 일치하는 target에 background-color를 바꿔줘 focus가 되는 것처럼 보이게 하여 키보드로 ResultItem를 이동하게 하였습니다. 


    ```
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

    ```

### 환경변수 설정

- api가 git에 노출되지 않도록 .env를 사용해 환경변수에 api를 넣고 gitignore를 이용해 git에 업로드 되지 않도록 하였습니다.
- 환경변수를 사용한 배포는 처음이였는데 배포 후에 api가 호출되지 않고 undefind가 console에 찍히는걸 발견하였습니다. 이번 과제 배포는 netlify를 사용했는데 netlify와 같은 배포를 도와주는 사이트는 github와 연동하여 레포지토리에 있는 코드로 배포를 도와주는데 gitignore를 사용해 api가 올라가지 않아 호출을 하지 못하는 상황인 것을 알게되었습니다. 그렇기 때문에 netlify 측에 환경변수를 입력해줘야한다는 것을 알아냈고 netlify 홈페이지 설정페이지에서 쉽게 설정할 수 있다는 것을 알게되어 정상 작동하도록 구현할 수 있었습니다.

### 어려웠던 점 

- 데이터 값이 없는 것을 검색어 없음으로 표시하는데 있어서 뜻 밖에 어려움을 겪었습니다.
- 단순히 데이터의 length가 0인것에 검색어 없음을 주면 되겠다고 생각했으나 검색중... 과 겹치면서 새로운 상태값을 사용해 적용해야한다는 것을 알게되었습니다. 처음에는 search.js 안에서 상태를 만들려고 로직을 구상했으나 store에서 관리중인 상태와 함께 생각해야한다는 것을 먼저 알지 못해 더 오랜 시간이 걸리게되었습니다.
- 이 후에 search.js에서는 데이터가 불러올 때 예외 처리를 하고 store에서 상태를 하나 만들어 관리하는 것으로 해결할 수 있었습니다.

```
if (localStorage.getItem(inputData)) {
        dispatch(createData(JSON.parse(localStorage.getItem(inputData))));
        if (JSON.parse(localStorage.getItem(inputData)).length === 0) {
          dispatch(loadingData(false));
        }
      } else if (!localStorage.getItem(inputData)) {
        const { data } = await axios.get(
          `${process.env.REACT_APP_SEARCH_KEY}?name=${inputData}`
        );
        dispatch(createData(data.slice(0, 7)));
        if (data.length === 0) {
          dispatch(loadingData(false));
        }
      }
 ```
 
