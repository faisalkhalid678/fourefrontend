/*
 *
 * FlightList reducer
 *
 */
import produce from 'immer';
import { UPDATE_QUERY } from './constants';

export const initialState = {  query:[] };

/* eslint-disable default-case, no-param-reassign */
const queryReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case UPDATE_QUERY:
        return {...state, query: action.flightQuery};
      default:
        return state;
    }
  });

export default queryReducer;


