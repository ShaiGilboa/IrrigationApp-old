import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';

import { useSelector } from 'react-redux';
import {RootState} from '../Store';

import GlobalStyle from '../Globalstyle';
import QuoteApp from '../QuoteApp';

interface props {
  
};

const App : React.FC<PropsWithChildren<props>> = () => {

  const { appStatus } = useSelector((state: RootState) => state.app);
  console.log('appStatus', appStatus);
  
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