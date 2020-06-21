import React, { MouseEvent, useState, useEffect, PropsWithChildren } from 'react';
import styled from 'styled-components';

interface props {
  startLeft:number,
  startTop:number,
  startWidth: number,
  startHeight: number
};
const ResizeDrag : React.FC<PropsWithChildren<props>> = ({startLeft, startTop, startWidth, startHeight}) => {

  //FOR DRAGGING
  const [dragMouseDown, setDragMouseDown] = useState(false);
  const [xLoc, setXLoc] = useState(startLeft); //mouseX
  const [yLoc, setYLoc] = useState(startTop);
  const [oldX, setOldX] = useState(startLeft);
  const [oldY, setOldY] = useState(startLeft);
  const [viewX, setViewX] = useState(startLeft); //new left +- initial left 
  const [viewY, setViewY] = useState(startTop);
  //FOR RESIZE
  const [sizeMouseDown, setSizeMouseDown] = useState(false);
  const [width, setWidth] = useState(startWidth || 100); //width at any given moment
  const [height, setHeight] = useState(startHeight || 100); //height at any given moment
  const [xVal, setXVal] = useState(startWidth); //mouseX
  const [yVal, setYVal] = useState(startHeight);

  useEffect(()=>{
    
  }, []);

  const dragHandle = () => {

  }

  const mouseDownDrag = (e: MouseEvent) => {
    // if(e.repeat) return;
    setDragMouseDown(true);
//listen for mouse movement

    console.log('e', e);
  };
  const mouseUpDrag = (e: MouseEvent) => {
    setDragMouseDown(false);
//end listen for mouse movement
    console.log('e', e);
  };

  const mouseDownResize = (e: MouseEvent) => {
    // if(e.repeat) return;
    setSizeMouseDown(true);
//listen for mouse movement

    console.log('e', e);
  };
  const mouseUpResize = (e: MouseEvent) => {
    setSizeMouseDown(false);
//end listen for mouse movement

    console.log('e', e);
  };

  return (
    <Wrapper style={{
      left: viewX,
      top: viewY,
      width:`${width}px`, 
      height:`${height}px`,
      }}
      onMouseDown={(e:MouseEvent)=> {
        e.preventDefault();
        e.stopPropagation();
        mouseDownDrag(e);
      }}
      >
      ResizeDrag
      <DragBox
        onMouseDown={(e:MouseEvent)=> {
          e.preventDefault();
          e.stopPropagation();
          mouseDownResize(e);
        }}
      />
    </Wrapper>
  )
}

export default ResizeDrag;

const Wrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  &:hover{
    cursor: pointer;
  }
`;
const DragBox = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  width: 10px;
  height: 10px;
  z-index: 5;
  background: pink;
  &:hover{
    cursor: pointer;
  }
`;