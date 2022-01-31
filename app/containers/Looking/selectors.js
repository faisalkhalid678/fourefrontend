import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the looking state domain
 */

const selectLookingDomain = state => state.looking || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Looking
 */

const makeSelectLooking = () =>
  createSelector(
    selectLookingDomain,
    substate => substate,
  );

export default makeSelectLooking;
export { selectLookingDomain };
