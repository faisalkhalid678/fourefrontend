
import {take, call, put, select, takeLatest } from 'redux-saga/effects';



import { receiveAirport } from './actions';
import { REQUEST_AIRPORT } from './constants';
import { fetchAirport } from './api';

export function* getAirportData(action){
  try {
      const data =  yield call(fetchAirport);
      yield put(receiveAirport(data));
  } catch (error) {
    console.error(error);
  }
}

export default function* AirportSaga(){
    yield takeLatest(REQUEST_AIRPORT, getAirportData);
}



