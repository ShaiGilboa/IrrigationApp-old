import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';
import DragNDrop from './components/DragNDrop';
import SprinklerMenu from './components/SprinklerMenu/SprinklerMenu';
import ResizeDrag from './ResizeDraggable/ResizeDrag';

interface props {
  
};

const QuoteApp : React.FC<props> = () => {

  return (
    <Wrapper>
      QuoteApp
      <DragStorage>
        <ResizeDrag 
          startX={50}
          startY={50}
          startWidth={100}
          startHeight={100}
        />
        <ResizeDrag
          startX={200}
          startY={150}
          startWidth={150}
          startHeight={150}
        >
          <DragableContent>
            ResizeDrag
          </DragableContent>
        </ResizeDrag>
      </DragStorage>
      <SprinklerMenu />
    </Wrapper>
  )
}

export default QuoteApp;

const Wrapper = styled.div`

`;
const DragStorage = styled.div`
  position: relative;
  width: 500px;
  height: 500px;
  border: 1px solid red;
`;

const DragableContent = styled.div`

`;