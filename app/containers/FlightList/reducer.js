/*
 *
 * FlightList reducer
 *
 */
import produce from 'immer';
import { REQUEST_API_DATA,QUERY_DATA, RECEIVE_API_DATA,FLIGHT_REQUEST_FAILED } from './constants';

export const initialState = { flights: [],error:'', loading: true, query:[] };

/* eslint-disable default-case, no-param-reassign */
const flightListReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {

      case REQUEST_API_DATA:
          return {...state, flights: [], loading: true};
      case RECEIVE_API_DATA:
        return  { ...state, flights: action.flights, error: action.flights.message, loading: false };
      case FLIGHT_REQUEST_FAILED:
        return {...state,flights:[], error: action.error, loading: false};

      default:
        return state;
    }
  });

export default flightListReducer;


