/*
 *
 * TravellerDetails actions
 *
 */

import { REQUEST_BOOKING,RESPONSE_BOOKING } from './constants';

export function bookingRequest(data) {
  return {
    type: REQUEST_BOOKING,
    flightDetailsView: data
  };
}

export function bookingResponse(data){
  return {
    type: RESPONSE_BOOKING,
    BookingResponse: data
  };
}


