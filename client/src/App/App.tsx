import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';

import GlobalStyle from '../Globalstyle';
import QuoteApp from '../QuoteApp';

interface props {
  
};
const App : React.FC<PropsWithChildren<props>> = () => {

  return (
    <Wrapper>
      <GlobalStyle/>
      App
      <QuoteApp />
    </Wrapper>
  )
}

export default App;

const Wrapper = styled.div`

`