/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import history from 'utils/history';
import languageProviderReducer from 'containers/LanguageProvider/reducer';
import flightListReducer from 'containers/FlightList/reducer';
import QueryReducer from 'containers/NewBookingForm/Flights/reducer';

/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export default function createReducer(injectedReducers = {}) {
  const flightListPersistConfig = {
    key: 'flightList',
    storage,
  };

  const globalPersistConfig = {
    key: 'global',
    storage,
  };
  const languagePersistConfig = {
    key: 'language',
    storage,
  };
  const routerPersistConfig = {
    key: 'router',
    storage,
  };

  const queryPersistConfig = {
    key: 'query',
    storage,
  };

  const rootReducer = combineReducers({
    language: persistReducer(globalPersistConfig, languageProviderReducer),
    router: connectRouter(history),
    search: persistReducer(queryPersistConfig, QueryReducer),
    flightList: persistReducer(flightListPersistConfig, flightListReducer),
    ...injectedReducers,
  });

  return rootReducer;
}
