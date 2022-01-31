import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the flightDetailsView state domain
 */

const selectFlightDetailsViewDomain = state =>
  state.flightDetailsView || initialState;

/**
 * Other specific selectors
 */
const selectFlightListsViewDomain = state => state.flightList || initialState;

/**
 * Default selector used by FlightDetailsView
 */

const makeSelectFlightDetailsView = () =>
  createSelector(
    selectFlightDetailsViewDomain,
    selectFlightListsViewDomain,
    substate => substate,
  );

export default makeSelectFlightDetailsView;
export { selectFlightDetailsViewDomain };
