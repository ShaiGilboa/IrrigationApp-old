import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';
import DragNDrop from './components/DragNDrop';

interface props {
  
};

const QuoteApp : React.FC<props> = () => {

  return (
    <Wrapper>
      QuoteApp
      <DragNDrop>
        <div>hello</div>
        <div>2</div>
      </DragNDrop>
    </Wrapper>
  )
}

export default QuoteApp;

const Wrapper = styled.div`

`;