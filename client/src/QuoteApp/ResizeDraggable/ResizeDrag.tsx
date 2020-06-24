import React, { MouseEvent, useState, useEffect, useCallback, PropsWithChildren } from 'react';
import styled from 'styled-components';

interface props {
  startX: number,
  startY: number,
  startWidth: number,
  startHeight: number,
};
const ResizeDrag : React.FC<PropsWithChildren<props>> = ({startX, startY, startWidth, startHeight, children}) => {
  const [mouseLoc, setMouseLoc] = useState({
    mouseX: 0,
    mouseY: 0
  })
  //INITIAL
  const [initialValues, setInitialValues] = useState({
    initialX: 0,
    initialY: 0,
    initialWidth: startWidth,
    initialHeight: startHeight
  })
  //FOR DRAGGING
  const [dragState, setDragState] = useState({
    isDragging: false,
    translateX: startX,
    translateY: startY
  });
  //FOR RESIZE
  const [resizeState, setResizeState] = useState({
    isResizing: false,
    resizeWidth: startWidth,
    resizeHeight: startHeight
  });

////////////////////
//////DRAGGING//////
  const mouseDownDrag = useCallback(({clientX, clientY}): void => {
    console.log('drag');
    setMouseLoc({
      mouseX: clientX, 
      mouseY: clientY,
    })
    setInitialValues({
      initialX: dragState.translateX, 
      initialY: dragState.translateY,
      initialWidth: resizeState.resizeWidth,
      initialHeight: resizeState.resizeHeight
    })
    setDragState({
      ...dragState, 
      isDragging: true
    });
  }, [dragState]);

  const mouseMoveDrag = useCallback( ( {clientX, clientY} ): void => {
    if(dragState.isDragging){
      setDragState(oldState => ({
        ...oldState, 
        translateX: initialValues.initialX + (clientX - mouseLoc.mouseX),  
        translateY: initialValues.initialY + (clientY - mouseLoc.mouseY)
      }));
    }
  }, [dragState]);

  const mouseUpDrag = useCallback((): void => {
    if(dragState.isDragging){
      setDragState({
      ...dragState, 
      isDragging: false
      });
    }
  }, [dragState]);

  useEffect(() => {
    // console.log('drag on');
    window.addEventListener('mousemove', mouseMoveDrag);
    window.addEventListener('mouseup', mouseUpDrag);
    return () => {
      // console.log('drag off');
      window.removeEventListener('mousemove', mouseMoveDrag);
      window.removeEventListener('mouseup', mouseUpDrag);
    }
  //functions in dependancy array: useeffect only fires if function CHANGES (which only happens on isDragging toggle, due to useCallback)
  }, [mouseMoveDrag, mouseUpDrag]);

/////////////////////
//////RESIZING///////
  const mouseDownResize = useCallback(({clientX, clientY}): void => {
    console.log('resize');
    setMouseLoc({
      mouseX: clientX, 
      mouseY: clientY,
    })
    setInitialValues({
      ...initialValues,
      initialWidth: resizeState.resizeWidth,
      initialHeight: resizeState.resizeHeight
    })
    setResizeState({
      ...resizeState, 
      isResizing: true
    });
  }, [resizeState, initialValues]);

  const mouseMoveResize = useCallback( ({clientX, clientY}): void => {
    if(resizeState.isResizing){
      // console.log('clientX - initialResize.initialX', clientX - initialResize.initialX);
      setResizeState({
        ...resizeState, 
        resizeWidth: initialValues.initialWidth + (clientX - mouseLoc.mouseX),
        resizeHeight: initialValues.initialHeight + (clientY - mouseLoc.mouseY)
      });
      
    };
  }, [resizeState]);

  const mouseUpResize = useCallback((): void => {
    if(resizeState.isResizing){
      setResizeState({
        ...resizeState, 
        isResizing: false
      });
    }
  }, [resizeState]);

  useEffect(() => {
    // console.log('resize on');
    window.addEventListener('mousemove', mouseMoveResize);
    window.addEventListener('mouseup', mouseUpResize);
    return () => {
      // console.log('resize off');
      window.removeEventListener('mousemove', mouseMoveResize);
      window.removeEventListener('mouseup', mouseUpResize);
    }
  //functions in dependancy array: useeffect only fires if function CHANGES (which only happens on isResizing toggle, due to useCallback)
  }, [mouseMoveResize, mouseUpResize]);


  return (
    <Wrapper style={{
      transform: `translate(${dragState.translateX}px, ${dragState.translateY}px)`,
      width:`${(resizeState.resizeWidth > 10)? resizeState.resizeWidth : 10}px`, 
      height:`${(resizeState.resizeHeight > 10)? resizeState.resizeHeight : 10}px`,
      cursor:`${dragState.isDragging? 'grabbing': 'grab'}`
      }}
      onMouseDown={(e: MouseEvent)=> {
        // console.log('mousedown');
        e.preventDefault();
        e.stopPropagation();
        mouseDownDrag(e);
      }}
      >
      {children}
      <ResizeBox
        // style={{cursor:`${resizeState.isResizing? 'grabbing': 'pointer'}`}}
        onMouseDown={(e:MouseEvent)=> {
          e.preventDefault();
          e.stopPropagation();
          mouseDownResize(e);
        }}
      >
        <ResizeUI />
      </ResizeBox>
    </Wrapper>
  )
}

export default ResizeDrag;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  /* background: skyblue; */
  position: absolute;

  /* scroll bar stuff */
  overflow: auto;
  /* Hide scrollbar for Chrome, Safari and Opera */
  &::-webkit-scrollbar {
    display: none;
  }
/* Hide scrollbar for IE and Edge */
  -ms-overflow-style: none;
  &:hover {
    div {
      visibility: visible;
    }
  }
`;
const ResizeBox = styled.div`
  position: absolute;
  /* visibility: hidden; */
  /* border: 1px solid red; */
  overflow: hidden;
  bottom: 0;
  right: 0;
  width: 10px;
  height: 10px;
  &:hover{
    cursor: nwse-resize;
    cursor: nw-resize;
  }
`;

const ResizeUI = styled.div`
  background: transparent;
  visibility: hidden;
  position: absolute;
  left: -5px;
  top: 5px;
  width: 25px;
  height: 2px;
  transform: rotate(-45deg);
  border: 1px grey solid;
`;