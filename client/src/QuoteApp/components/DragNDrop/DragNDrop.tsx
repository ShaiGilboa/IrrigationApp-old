import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { MouseCoordinates } from './interfaces';

interface props {
  
};

const DragNDrop : React.FC<PropsWithChildren<props>> = ({children}) => {
  // const componentRef = React.useRef<any>(null)
  // const [currentValues, setCurrentValues] = React.useState<any>({left: 0, top: 0});
  const [translateValues, setTranslateValues] = React.useState<any>({x:0, y:0})
  const [mouseCoordinates, setMouseCoordinates] = React.useState<MouseCoordinates>({x:0, y:0})
  const [translateUpToNow, setTranslateUpToNow] = React.useState<any>({x:0, y:0})
  const [isMouseDown, setIsMouseDown] = React.useState<boolean>(false);
  
  // setting the position of everything for the start of the drag
  const drag = React.useCallback(({clientX, clientY}) : void => {
    setTranslateUpToNow({
      x: translateValues.x,
      y: translateValues.y
    })
    setMouseCoordinates({
      x: clientX,
      y: clientY
    })
    setIsMouseDown(true)
  }, [isMouseDown, , mouseCoordinates])

  const mouseMove = React.useCallback(({clientX, clientY}) : void =>{
    if(isMouseDown && mouseCoordinates){
      setTranslateValues({
        x: translateUpToNow.x + (clientX - mouseCoordinates.x),
        y: translateUpToNow.y + (clientY - mouseCoordinates.y)  
      })
    }
  }, [isMouseDown, mouseCoordinates])

  const mouseUp = React.useCallback(({clientX, clientY}): void => {
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
      style={{transform: `translate(${translateValues.x}px, ${translateValues.y}px)`}}
      onMouseDown={(event)=>{
        event.preventDefault();
        event.stopPropagation();
        drag(event);
      }}
    >
      {children}
    </Wrapper>
  )
}

export default DragNDrop;

const Wrapper = styled.div`
  position: relative;
  width: fit-content;
  height: fit-content;
  &:hover{
    cursor: grab;
  }
  &:active{
    cursor: grabbing;
  }
`;