import React from 'react';
import styled from 'styled-components';
import Search from './components/Search';

function App() {
  return (
    <Background>
      <Search />
    </Background>
  );
}

export default App;

const Background = styled.div`
  height: 100vh;
  background-color: #cae9ff;
`;
