/*
 *
 * GetBookingPnr reducer
 *
 */
import produce from 'immer';
import { REQUEST_PNR_FLIGHT,RECEIVE_PNR_FLIGHT } from './constants';

export const initialState = { };

/* eslint-disable default-case, no-param-reassign */
const getBookingPnrReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case REQUEST_PNR_FLIGHT:
          return {...state, booking: [], loading: true};
      case RECEIVE_PNR_FLIGHT:
        return  { ...state, booking: action.pnrData, error: action.pnrData.message, loading: false };
      default:
        return state;
    }
  });

export default getBookingPnrReducer;
