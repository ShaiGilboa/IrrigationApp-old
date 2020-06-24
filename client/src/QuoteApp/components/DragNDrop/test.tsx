import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { MouseCoordinates } from './interfaces';
import DragNDrop from './DragNDrop';

interface props {
  
};

const Test : React.FC<PropsWithChildren<props>> = ({children}) => {
  const componentRef = React.useRef<any>(null)
  const [currentValues, setCurrentValues] = React.useState<any>({left: 0, top: 0});
  const [translateValues, setTranslateValues] = React.useState<any>({x:0, y:0})
  const [mouseCoordinates, setMouseCoordinates] = React.useState<MouseCoordinates>({x:0, y:0})
  const [isMouseDown, setIsMouseDown] = React.useState<boolean>(false);

  // set the initial values once the component mounts
  React.useEffect(()=>{
    if(componentRef != null && componentRef.current != null) {
      setCurrentValues({
      left: componentRef.current.getBoundingClientRect().left,
      top: componentRef.current.getBoundingClientRect().top
    })}
  }, [componentRef])
  
  // setting the position of everything for the start of the drag
  const drag = React.useCallback(({clientX, clientY}) : void => {
    setMouseCoordinates({
      x: clientX,
      y: clientY
    })
    setIsMouseDown(true)
  }, [isMouseDown, , mouseCoordinates])

  const mouseMove = React.useCallback(({clientX, clientY}) : void =>{
    if(isMouseDown && mouseCoordinates){
      setTranslateValues({
        x: currentValues.left + (clientX - mouseCoordinates.x),
        y: currentValues.top + (clientY - mouseCoordinates.y)  
      })
    }
  }, [isMouseDown, mouseCoordinates, currentValues])

  const mouseUp = React.useCallback((): void => {
    setIsMouseDown(false)
  }, [isMouseDown])

  React.useEffect(()=>{
    window.addEventListener('mousemove', mouseMove)
    window.addEventListener('mouseup', mouseUp)

    return () => {
      window.removeEventListener('mousemove', mouseMove)
      window.removeEventListener('mouseup', mouseUp)
    }
  },[isMouseDown, mouseMove, mouseUp])

  return (
    <Wrapper
      ref={componentRef}
      style={{transform: `translate(${translateValues.x}px, ${translateValues.y}px)`}}
      // style={{left:`${currentValues.left}px`, top:`${currentValues.top}px`}}
      onMouseDown={(event)=>{
        event.preventDefault();
        event.stopPropagation();
        drag(event);
      }}
    >
      <p>
        currentValues: T {currentValues.top} L {currentValues.left}
        </p>
        <p>
        translateVlaues: X:{translateValues.x} Y:{translateValues.y}
        </p>
        <p>
        MouseCoordinates: X:{mouseCoordinates.x} Y:{mouseCoordinates.y}
        </p>
      DragNDroptest
      {children}
    </Wrapper>
  )
}

export default Test;

const Wrapper = styled.div`
  position: relative;
  width: fit-content;
  height: fit-content;
  border: 1px solid red;
  &:hover{
    cursor: grab;
  }
`;