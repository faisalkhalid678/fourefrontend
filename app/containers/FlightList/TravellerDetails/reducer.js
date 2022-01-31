/*
 *
 * TravellerDetails reducer
 *
 */
import produce from 'immer';
import { REQUEST_BOOKING,RESPONSE_BOOKING } from './constants';

export const initialState = {bookingResponse: [], loading:true};

/* eslint-disable default-case, no-param-reassign */
const travellerDetailsReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case REQUEST_BOOKING:
        return {...state, bookingResponse: [],loading:true};
      case RESPONSE_BOOKING:
        return {...state, bookingResponse: action.BookingResponse, loading:false};
      default:
        return state;
    }
  });

export default travellerDetailsReducer;
