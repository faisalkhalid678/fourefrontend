import { take, call, put, select,takeLatest } from 'redux-saga/effects';

import { requestFareRules } from './actions';
import {fetchRules } from './FareRulesmodal/api';

export function* getFareRulesData(action){
  // try {
  //   const Rules = yield call(fetchRules,action.details);
  //   yield put(requestFareRules(Rules));
  // } catch (error) {
  //   console.error("Fare Rules Error", error);
  // }
}

// Individual exports for testing
export default function* flightDetailsViewSaga() {
  // yield takeLatest(MODAL_IS_OPEN, getFareRulesData);
}
