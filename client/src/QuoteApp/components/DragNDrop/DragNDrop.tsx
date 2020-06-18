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

const DragNDrop : React.FC<PropsWithChildren<props>> = ({children}) => {
  const [wrapperCoordinates, setWrapperCoordinates] = React.useState<WrapperCoordinates | null>(null)
  const [mouseCoordinates, setMouseCoordinates] = React.useState<MouseCoordinates | null>(null)
  const [isMouseDown, setIsMouseDown] = React.useState<boolean>(false);

  const wrapperRef = React.useRef<HTMLDivElement>(null)

  const mouseDownHandler = (event : any) : void => {
    setIsMouseDown(true);
    setMouseCoordinates({
      x: event.clientX,
      y: event.clientY
    })
  }

  const mouseMoveHandler  = (event : any) => {
    console.log('up');
    // event.preventDefault()
    console.log('event', event) 
    document.addEventListener('mouseup',mouseupHandler)
    if((isMouseDown && mouseCoordinates && wrapperCoordinates) && event.clientX !== mouseCoordinates.x) {
      setWrapperCoordinates({
        top: wrapperCoordinates.top,
        left: wrapperCoordinates.left + (event.clientX - mouseCoordinates.x),
      })
      setMouseCoordinates({
        ...mouseCoordinates,
        x:event.clientX,
      })
    }
    if((isMouseDown && mouseCoordinates && wrapperCoordinates) && event.clientY !== mouseCoordinates.y) {
      setWrapperCoordinates({
        left: wrapperCoordinates.left,
        top: wrapperCoordinates.top + (event.clientY-mouseCoordinates.y),
      })
      setMouseCoordinates({
        ...mouseCoordinates,
        y:event.clientY,
      })
    }
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
      setWrapperCoordinates({
        top,
        left,
      })
    }
  },[wrapperRef])

  React.useEffect(()=>{
    if(isMouseDown){
      console.log('down')
      document.addEventListener('mousemove',mouseMoveHandler)
    } else {
      console.log('up')
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
    >
      <>
      {children}
      </>
  <p>wrapperCor: {wrapperCoordinates && (<span>top: {wrapperCoordinates.top} left: {wrapperCoordinates.left}</span>)}</p>
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
`;