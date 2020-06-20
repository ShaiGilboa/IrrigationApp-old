import React, { PropsWithChildren, MouseEvent } from 'react';
import styled from 'styled-components';

interface props {
  // children: React.ReactChild
};

interface WrapperCoordinates {
  top : number,
  left : number
}

interface MouseCoordinates {
  x : number,
  y : number
}

interface WrapperProps {
  topProp: string;
  leftProp: string;
}

const DragNDrop : React.FC<PropsWithChildren<props>> = ({children}) => {
  const [mouseCoordinates, setMouseCoordinates] = React.useState<MouseCoordinates | null>(null)
  const [isMouseDown, setIsMouseDown] = React.useState<boolean>(false);
  const [wrapperLeft, setWrapperLeft] = React.useState<string | undefined>(undefined);
  const [wrapperTop, setWrapperTop] = React.useState<string | undefined>(undefined);

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
    if(wrapperRef && wrapperRef.current){
      const top = wrapperRef.current.getBoundingClientRect().top;
      const left = wrapperRef.current.getBoundingClientRect().left;
      setWrapperTop(top.toString());
      setWrapperLeft(left.toString());
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
      <>
      {children}
      </>
  <p>wrapperCor: {(wrapperTop && wrapperLeft) && (<span>top: {wrapperTop} left: {wrapperLeft}</span>)}</p>
      <p>mouseCor: {mouseCoordinates ? (<span>x: {mouseCoordinates.x} y: {mouseCoordinates.y}</span>) : (<span>none</span>)}</p>

    </Wrapper>
  )
}

export default DragNDrop;

const Wrapper = styled.div`
  width: 200px;
  height: 200px;
  border: 1px solid red;
  color: blue;
  position: absolute;
  &:hover {
    cursor: -webkit-grab;
    cursor: grab;
  }
  &:active {
    cursor: -webkit-grabbing;
    cursor: grabbing; 
  }
`;