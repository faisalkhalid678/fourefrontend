import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the testing state domain
 */

const selectTestingDomain = state => state.testing || initialState;

/**
 * Other specific selectors
 */

/**
 * Default selector used by Testing
 */

const makeSelectTesting = () =>
  createSelector(
    selectTestingDomain,
    substate => substate,
  );

export default makeSelectTesting;
export { selectTestingDomain };
