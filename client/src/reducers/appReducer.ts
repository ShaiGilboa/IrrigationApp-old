import produce from 'immer';

const initialState = {
  appStatus: 'idle',

}
//appStatus: 'idle', 'loading'
export interface appState {
  appStatus: string,
}

export interface actionMan {
  type: string,
  payload: any,
}

const appReducer = (state: appState = initialState, action: actionMan) => {
  switch (action.type) {
    case 'SET_STATUS_LOADING':
      
      return produce(state, draftState => {
        draftState.appStatus = 'loading';
      });
    case 'SET_STATUS_IDLE':
      
      return produce(state, draftState => {
        draftState.appStatus = 'idle';
      });
  
    default:
      return state;
  }
}

export default appReducer;