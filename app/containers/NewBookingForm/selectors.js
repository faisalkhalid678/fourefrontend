import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the newBookingForm state domain
 */

const selectNewBookingFormDomain = state =>
  state.newBookingForm || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by NewBookingForm
 */

const makeSelectNewBookingForm = () =>
  createSelector(
    selectNewBookingFormDomain,
    substate => substate,
  );

export default makeSelectNewBookingForm;
export { selectNewBookingFormDomain };
