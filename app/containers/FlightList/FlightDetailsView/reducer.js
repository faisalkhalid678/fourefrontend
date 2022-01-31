/*
 *
 * FlightDetailsView reducer
 *
 */
import produce from 'immer';
import { REQUEST_SINGLE_FLIGHT,QUERY_DATA } from './constants';

export const initialState = {singleFlight: [], loading: true, query: ''};

/* eslint-disable default-case, no-param-reassign */
const flightDetailsViewReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case REQUEST_SINGLE_FLIGHT:
        return  {...state, singleFlight: action.singleFlight, loading:false};
        case QUERY_DATA:
          return {...state, query: action.query};
      default:
        return state;
    }

  });

export default flightDetailsViewReducer;
