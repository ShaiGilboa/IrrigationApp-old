import { actionMan } from '../reducers/appReducer'; //interface 


//STATUS CHANGES//
export const setStatusLoading = (): actionMan => {
  return {
    type: 'SET_STATUS_LOADING',
    payload: null,
  }
};
export const setStatusIdle = (): actionMan => {
  return {
    type: 'SET_STATUS_IDLE',
    payload: null,
  }
};