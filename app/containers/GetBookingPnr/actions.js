/*
 *
 * GetBookingPnr actions
 *
 */

import { RECEIVE_PNR_FLIGHT, REQUEST_PNR_FLIGHT } from './constants';

export function requestPnrFlight (obj) {
  return {
    type: REQUEST_PNR_FLIGHT,
    pnr: obj.pnr,
    last_name: obj.last_name,
    endpoint: obj.endpoint,
  };
}

export function recevingPnrFlight (pnrData) {
  return {
    type: RECEIVE_PNR_FLIGHT,
    pnrData: pnrData
  };
}
