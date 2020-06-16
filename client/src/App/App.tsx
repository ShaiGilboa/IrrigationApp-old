import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';
import QuoteApp from '../QuoteApp';

interface props {
  
};
const App : React.FC<PropsWithChildren<props>> = () => {

  return (
    <Wrapper>
      App
      <QuoteApp />
    </Wrapper>
  )
}

export default App;

const Wrapper = styled.div`

`