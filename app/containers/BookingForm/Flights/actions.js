/*
 *
 * BookingForm actions
 *
 */

import { UPDATE_QUERY } from './constants';

export function updateQuery(data) {
  return {
    type: UPDATE_QUERY,
    flightQuery: data,
  };
}
