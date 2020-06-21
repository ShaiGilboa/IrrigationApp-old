import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';
import DragNDrop from './components/DragNDrop';

import ResizeDrag from './ResizeDraggable/ResizeDrag';

interface props {
  
};

const QuoteApp : React.FC<props> = () => {

  return (
    <Wrapper>
      QuoteApp
      <ul
        // style={{margin:0, padding:0, listStyleType: 'none'}}
      >
        <li
        // style={{margin:0, padding:0}}
        >
          <DragNDrop>
          <div>hello</div>
          <div>2</div>
          </DragNDrop>
        </li>
        <li
        // style={{margin:0, padding:0}}
        >
          <DragNDrop>
          <div>hello</div>
          <div>2</div>
          </DragNDrop>
        </li>
        <li
        // style={{margin:0, padding:0}}
        >
          <DragNDrop>
          <div>hello</div>
          <div>2</div>
          </DragNDrop>
        </li>
        <li
        // style={{margin:0, padding:0}}
        >
          <DragNDrop>
          <div>hello</div>
          <div>2</div>
          </DragNDrop>
        </li>
      </ul>

      <div>
        test
        <p>test2</p>
      </div>

      <DragNDrop>
        <div>test</div>
        <DragNDrop>
          <p>test2</p>
        </DragNDrop>
      </DragNDrop>
      
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