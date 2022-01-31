/*
 *
 * Flights reducer
 *
 */

import produce from 'immer';

import {  RECEIVE_AIRPORT, RECEIVE_ERROR } from './constants';


export const initialState = [];
/* eslint-disable default-case, no-param-reassign */
const AirportListReducer = (state = initialState, { type, airports}) =>
  produce(state, (/* draft */) => {
    switch(type){
      case RECEIVE_AIRPORT:
        return airports;
      default:
        return state;
    }
  });

export default AirportListReducer;
