import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the getBookingPnr state domain
 */

const selectGetBookingPnrDomain = state => state.getBookingPnr || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by GetBookingPnr
 */

const makeSelectGetBookingPnr = () =>
  createSelector(
    selectGetBookingPnrDomain,
    substate => substate,
  );

export default makeSelectGetBookingPnr;
export { selectGetBookingPnrDomain };
