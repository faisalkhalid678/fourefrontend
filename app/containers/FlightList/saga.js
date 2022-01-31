import { take, call, put, select, takeLatest } from 'redux-saga/effects';


import { REQUEST_API_DATA,FLIGHT_REQUEST_FAILED } from './constants';
import { receiveApiData,requestApiFailed} from './actions';
import { fetchEvents } from './api';

export function* getFlightData(action){
  try {
    const flights = yield call(fetchEvents, action.flights);
    yield put(receiveApiData(flights));
  } catch (error) {
    yield put(requestApiFailed(error.error));
  }
}

// Individual exports for testing
export default function* flightListSaga() {
  yield takeLatest(REQUEST_API_DATA, getFlightData);
}
