import React, { PropsWithChildren, MouseEvent } from 'react';
import styled from 'styled-components';
import { MouseCoordinates } from './interfaces';

interface props {
  // children: React.ReactChild
};

const DragNDrop : React.FC<PropsWithChildren<props>> = ({children}) => {
  const [mouseCoordinates, setMouseCoordinates] = React.useState<MouseCoordinates | null>(null)
  const [isMouseDown, setIsMouseDown] = React.useState<boolean>(false);
  const [wrapperLeft, setWrapperLeft] = React.useState<string | undefined>('0');
  const [wrapperTop, setWrapperTop] = React.useState<string | undefined>('0');

  const wrapperRef = React.useRef<HTMLDivElement>(null)

  const mouseDownHandler = (event : any) : void => {
    setIsMouseDown(true);
    setMouseCoordinates({
      x: event.clientX,
      y: event.clientY
    })
  }

  const mouseMoveHandler  = (event : any) => {
    document.addEventListener('mouseup',mouseupHandler);
    if((isMouseDown && mouseCoordinates && wrapperLeft) && event.clientX !== mouseCoordinates.x) {
      const valueX = (Number(wrapperLeft || 0) + (event.clientX - mouseCoordinates.x)).toString();
      setWrapperLeft(valueX)
      setMouseCoordinates({
        ...mouseCoordinates,
        x:event.clientX,
      })
    }
    if((isMouseDown && mouseCoordinates && wrapperTop) && event.clientY !== mouseCoordinates.y) {
      const valueY = (Number(wrapperTop || 0) + (event.clientY-mouseCoordinates.y)).toString()
      setWrapperTop(valueY)
      setMouseCoordinates({
        ...mouseCoordinates,
        y:event.clientY,
      })
    }
    document.removeEventListener('mousemove', mouseMoveHandler)
    document.addEventListener('mousemove', mouseMoveHandler)
  }

  const mouseupHandler = (event : any) => {
    setMouseCoordinates({
      x: event.clientX,
      y: event.clientY,
    })
    setIsMouseDown(false);
    document.removeEventListener('mouseup',mouseupHandler)
    document.removeEventListener('mousemove', mouseMoveHandler)
  }

  React.useEffect(() => {
    // if(wrapperRef && wrapperRef.current){
      // const top = wrapperRef.current.getBoundingClientRect().top;
      // const left = wrapperRef.current.getBoundingClientRect().left;
      // setWrapperTop(top.toString());
      // setWrapperLeft(left.toString());
      if(wrapperRef){
      setWrapperTop('0');
      setWrapperLeft('0');
    }
  },[wrapperRef])

  React.useEffect(()=>{
    if(isMouseDown){
      document.addEventListener('mousemove',mouseMoveHandler)
    } else {
      document.removeEventListener('mousemove', mouseMoveHandler)
    }
  },[isMouseDown])

  return (
    <Wrapper
      ref={wrapperRef}
      onMouseDown={(event)=>{
        event.preventDefault();
        event.stopPropagation()
        mouseDownHandler(event)
      }}
      style={(wrapperTop && wrapperLeft) ? {top:wrapperTop+'px', left:wrapperLeft+'px'} : undefined}

    >
      {children}
    </Wrapper>
  )
}

export default DragNDrop;

const Wrapper = styled.div`
  width: fit-content;
  height: fit-content;
  display: inline-block;
  border: 1px solid red;
  color: blue;
  position: relative;
  &:hover {
    cursor: -webkit-grab;
    cursor: grab;
  }
  &:active {
    cursor: -webkit-grabbing;
    cursor: grabbing; 
  }
`;