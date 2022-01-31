import { take, call, put, select, takeLatest } from 'redux-saga/effects';

import {submitFlightDetails } from './api';
import { bookingResponse } from './actions';
import { REQUEST_BOOKING } from './constants';


export function* submitFlightData(action){
  try {
    const response = yield call(submitFlightDetails,action.flightDetailsView);
      yield put(bookingResponse(response));

  } catch (error) {
    console.error(error);
  }
}


// Individual exports for testing
export default function* travellerDetailsSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(REQUEST_BOOKING,submitFlightData);
}


