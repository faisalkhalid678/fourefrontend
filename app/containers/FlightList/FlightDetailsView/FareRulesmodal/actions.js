/*
 *
 * FareRulesmodal actions
 *
 */

import { REQUEST_FARE_RULES,RECEIVE_FARE_RULES } from './constants';

export function requestFareRules(details) {
  return {
    type: REQUEST_FARE_RULES,
    details: details
  };
}


export function receiveFareRules(details) {
  return {
    type: RECEIVE_FARE_RULES,
    details:details
  }
}
