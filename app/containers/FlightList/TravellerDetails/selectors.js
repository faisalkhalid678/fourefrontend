import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the travellerDetails state domain
 */

const selectTravellerDetailsDomain = state =>
  state.travellerDetails || initialState;

 const selectTravellerRouterDomain = state =>
  state.search.query || initialState;
  // state.flightDetailsView.query || initialState;

/**
 * Other specific selectors
 */

const selectSingleFlightDetails = state =>
state.flightDetailsView || initialState;


/**
 * Default selector used by TravellerDetails
 */

const makeSelectTravellerDetails = () =>
  createSelector(
    selectTravellerDetailsDomain,
    substate => substate,
  );

const makeSelectTravellerRouter = () =>
  createSelector(
    selectTravellerRouterDomain,
    substate => substate,
  );

const makeSelectSingleFlightDetails = () =>
  createSelector(
    selectSingleFlightDetails,
    substate => substate,
  );

// export default makeSelectTravellerDetails;
export {makeSelectSingleFlightDetails, makeSelectTravellerRouter,makeSelectTravellerDetails, selectTravellerDetailsDomain };
