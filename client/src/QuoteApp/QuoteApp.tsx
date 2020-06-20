import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';
import DragNDrop from './components/DragNDrop';

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
    </Wrapper>
  )
}

export default QuoteApp;

const Wrapper = styled.div`

`;