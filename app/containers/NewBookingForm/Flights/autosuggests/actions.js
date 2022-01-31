

import { REQUEST_AIRPORT, RECEIVE_AIRPORT, REQUEST_ERROR} from './constants';

export function requestAirport(){
  return{
    type: REQUEST_AIRPORT,
  };
}

export function receiveAirport(airports){
  return{
    type: RECEIVE_AIRPORT,
    airports
  };
}

export function airportError(error){
  return{
    type: REQUEST_ERROR,
    error
  };
}
