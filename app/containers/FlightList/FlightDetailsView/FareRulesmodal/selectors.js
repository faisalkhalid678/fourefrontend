import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the fareRulesmodal state domain
 */

const selectFareRulesmodalDomain = state =>
  state.fareRulesmodal || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by FareRulesmodal
 */

const makeSelectFareRulesmodal = () =>
  createSelector(
    selectFareRulesmodalDomain,
    substate => substate,
  );

export default makeSelectFareRulesmodal;
export { selectFareRulesmodalDomain };
