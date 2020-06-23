import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { MouseCoordinates } from './interfaces';
import DragNDrop from './DragNDrop';

interface props {
  
};

const test : React.FC<PropsWithChildren<props>> = ({children}) => {
  const componentRef = React.useRef<any>(null)
  const [currentValues, setCurrentValues] = React.useState<any>({left: null, top: null});
  const [mouseCoordinates, setMouseCoordinates] = React.useState<MouseCoordinates | null>(null)
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
    if(componentRef != null && componentRef.current != null) {
      setCurrentValues({
      left: componentRef.current.left,
      top: componentRef.current.top
    })}
    setIsMouseDown(true)
  }, [setIsMouseDown, componentRef, setCurrentValues, setMouseCoordinates])

  const mouseMove = React.useCallback(({clientX, clientY}) : void =>{
    if(isMouseDown && mouseCoordinates){
      setCurrentValues((previousValues : any) => ({
        x: previousValues.x + (clientX - mouseCoordinates.x),
        y: previousValues.y + (clientY - mouseCoordinates.y)  
      }))
    }
  }, [isMouseDown, mouseCoordinates])

  return (
    <Wrapper
      ref={componentRef}
      style={{left:`${currentValues.left}px;`, top:`${currentValues.top}px;`}}
      onMouseDown={(event)=>{
        event.preventDefault();
        event.stopPropagation();
        drag(event);
      }}
    >
      DragNDroptest
      {children}
    </Wrapper>
  )
}

export default test;

const Wrapper = styled.div`
  position: relative;
  width: fit-content;
  height: fit-content;
`;