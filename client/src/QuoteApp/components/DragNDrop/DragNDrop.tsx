import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';
import { Coordinates } from './interfaces';

interface props {
  
};

// the movement is not dependent on knowing the location.
// using transform: translate(Xpx, Ypx), means that the component
// will move, but in RELATION to the starting point.
const DragNDrop : React.FC<PropsWithChildren<props>> = ({children}) => {
  // how much the component will move on each drag
  const [translateValues, setTranslateValues] = React.useState<Coordinates>({x:0, y:0})
  // all the translations that have happened up to each iteration
  // on mouse up we add up the translations of that current drag
  const [translateUpToNow, setTranslateUpToNow] = React.useState<Coordinates>({x:0, y:0})
  // where the mouse is
  const [mouseCoordinates, setMouseCoordinates] = React.useState<Coordinates>({x:0, y:0})
  // flag to know if the mouse has been clicked
  const [isMouseDown, setIsMouseDown] = React.useState<boolean>(false);
  
  // setting the position of everything for the start of the drag
  const mouseDown = React.useCallback(({clientX, clientY}) : void => {
    setTranslateUpToNow({
      x: translateValues.x,
      y: translateValues.y
    })
    setMouseCoordinates({
      x: clientX,
      y: clientY
    })
    setIsMouseDown(true)
  }, [isMouseDown, translateUpToNow])

  // when the mouse moves the translations changes accordingly 
  const mouseMove = React.useCallback(({clientX, clientY}) : void =>{
    // only effective when the mouse is down
    if(isMouseDown){
      // each coordinate is set to be the value of the start of drag
      // plus the sum of the movement of the mouse in relation to where it was clicked
      setTranslateValues({
        x: translateUpToNow.x + (clientX - mouseCoordinates.x),
        y: translateUpToNow.y + (clientY - mouseCoordinates.y)  
      })
    }
  }, [isMouseDown, mouseCoordinates])

  // when the mouse is up, set flag to false  
  const mouseUp = React.useCallback((): void => {
    setIsMouseDown(false)
  }, [isMouseDown])

  // on click we start a new listener
  React.useEffect(()=>{
    window.addEventListener('mousemove', mouseMove)
    window.addEventListener('mouseup', mouseUp)

    return () => {
      window.removeEventListener('mousemove', mouseMove)
      window.removeEventListener('mouseup', mouseUp)
    }
  },[isMouseDown, mouseUp])

  return (
    <Wrapper
    // the movement of the component is by translate
      style={{transform: `translate(${translateValues.x}px, ${translateValues.y}px)`}}
      onMouseDown={(event)=>{
        event.preventDefault();
        event.stopPropagation();
        mouseDown(event);
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