import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the bookingForm state domain
 */

const selectBookingFormDomain = state => state.bookingForm || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by BookingForm
 */

const makeSelectBookingForm = () =>
  createSelector(
    selectBookingFormDomain,
    substate => substate,
  );

export default makeSelectBookingForm;
export { selectBookingFormDomain };
