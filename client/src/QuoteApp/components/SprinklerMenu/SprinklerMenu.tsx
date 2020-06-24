import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';
import DragNDrop from '../DragNDrop';
import { ReactComponent as Popup } from './assets/sprinkle-svgrepo-com.svg';
import { ReactComponent as Rotter } from './assets/sprinkler.svg';

interface props {
  
};

const SprinklerMenu : React.FC<PropsWithChildren<props>> = () => {
  const testRef = React.useRef(null)
  const clickHandler = (event : any) => {
    // event.preventDefault();
    // console.log('test')
    console.log('event', event.target)
  }

  return (
    <Wrapper>
      <Sprinkler>
        <DragNDrop>
        <Popup 
        onMouseDown={clickHandler}
        style={{height:'30px', border:'1px red solid'}}/>
        </DragNDrop>
      </Sprinkler>
      <Sprinkler>
        <DragNDrop>
        <Popup 
        onMouseDown={clickHandler}
        style={{height:'30px', border:'1px red solid'}}/>
        </DragNDrop>
      </Sprinkler>
    </Wrapper>
  )
}

export default SprinklerMenu;

const Wrapper = styled.ul`
  list-style-type: none;
  border: 1px green solid;
`;

const Sprinkler = styled.li`
  height: 30px;
`;