import { take, call, put, select,takeLatest } from 'redux-saga/effects';

import {REQUEST_FARE_RULES} from './constants';
import { receiveFareRules } from './actions';
import {fetchRules } from './api';

export function* getFareRulesData(action){
  try {
    const Rules = yield call(fetchRules,action.details);
    yield put(receiveFareRules(Rules));
  } catch (error) {
    // console.error("Fare Rules Error", error);
  }
}

// Individual exports for testing
export default function* flightDetailsViewSaga() {
  yield takeLatest(REQUEST_FARE_RULES, getFareRulesData);
}
