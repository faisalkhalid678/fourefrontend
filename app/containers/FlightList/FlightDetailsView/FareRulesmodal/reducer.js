/*
 *
 * FareRulesmodal reducer
 *
 */
import produce from 'immer';
import { REQUEST_FARE_RULES,RECEIVE_FARE_RULES } from './constants';

export const initialState = {details: [], loading: true};

/* eslint-disable default-case, no-param-reassign */
const fareRulesmodalReducer = (state = initialState, action) =>
  produce(state, (/* draft */) => {
    switch (action.type) {
      case REQUEST_FARE_RULES:
        return  {...state, details:[], loading:true };
      case RECEIVE_FARE_RULES:
        return {...state, details: action.details, loading: false}
      default:
        return state;
    }
  });

export default fareRulesmodalReducer;
