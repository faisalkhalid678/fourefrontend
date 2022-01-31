import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the paymentConfirmation state domain
 */

const selectPaymentConfirmationDomain = state =>
  state || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by PaymentConfirmation
 */

const makeSelectPaymentConfirmation = () =>
  createSelector(
    selectPaymentConfirmationDomain,
    substate => substate,
  );

export default makeSelectPaymentConfirmation;
export { selectPaymentConfirmationDomain };
