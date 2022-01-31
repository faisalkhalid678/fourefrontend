/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import '@babel/polyfill';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import history from 'utils/history';
import { PersistGate } from 'redux-persist/integration/react';
import { setAutoFreeze } from 'immer';
// import { persistStore } from 'redux-persist';
// import { localForage } from 'localforage';
// To allow immer extensible object adding.
setAutoFreeze(false);
// CSS file from Node Modules
import 'sanitize.css/sanitize.css';

// Import root app
import App from 'containers/App';

// Import Language Provider
import LanguageProvider from 'containers/LanguageProvider';

// Load the favicon and the .htaccess file
/* eslint-disable import/no-unresolved, import/extensions */

// New Image imports for new Template
import '!file-loader?name=[name].[ext]!./assets/img/favlogo.png';
import '!file-loader?name=[name].[ext]!./assets/img/logo.png';
import '!file-loader?name=[name].[ext]!./assets/img/plane.png';

// Test Images
import '!file-loader?name=[name].[ext]!./assets/img/test/hotels/hotels-1.jpg';
import '!file-loader?name=[name].[ext]!./assets/img/test/hotels/hotels-2.jpg';
import '!file-loader?name=[name].[ext]!./assets/img/test/hotels/hotels-3.jpg';
import '!file-loader?name=[name].[ext]!./assets/img/test/tours/tours-1.jpg';
import '!file-loader?name=[name].[ext]!./assets/img/test/tours/tours-2.jpg';
import '!file-loader?name=[name].[ext]!./assets/img/test/tours/tours-3.jpg';
import '!file-loader?name=[name].[ext]!./assets/img/test/tours/tours-4.jpg';
import '!file-loader?name=[name].[ext]!./assets/img/icons/bike.png';
import '!file-loader?name=[name].[ext]!./assets/img/icons/bus.png';
import '!file-loader?name=[name].[ext]!./assets/img/icons/city.png';
import '!file-loader?name=[name].[ext]!./assets/img/icons/earn.png';
import '!file-loader?name=[name].[ext]!./assets/img/icons/flight.png';
import '!file-loader?name=[name].[ext]!./assets/img/icons/hotel.png';
import '!file-loader?name=[name].[ext]!./assets/img/icons/insurance.png';
import '!file-loader?name=[name].[ext]!./assets/img/icons/ride.png';
import '!file-loader?name=[name].[ext]!./assets/img/test/room-gallery/room-gallery-1.jpg';
import '!file-loader?name=[name].[ext]!./assets/img/test/room-gallery/room-gallery-2.jpg';
import '!file-loader?name=[name].[ext]!./assets/img/test/room-gallery/room-gallery-3.jpg';
import '!file-loader?name=[name].[ext]!./assets/img/test/room-blog/room-blog-1.jpg';
import '!file-loader?name=[name].[ext]!./assets/img/test/room-blog/room-blog-2.jpg';
import '!file-loader?name=[name].[ext]!./assets/img/test/room-blog/room-blog-3.jpg';
import '!file-loader?name=[name].[ext]!./assets/img/com.jpg';

// import 'bootstrap-css-only/css/bootstrap.min.css';
// import 'mdbreact/dist/css/mdb.css';

import 'file-loader?name=.htaccess!./.htaccess';
/* eslint-enable import/no-unresolved, import/extensions */

import configureStore from './configureStore';
// Import i18n messages
import { translationMessages } from './i18n';

// Create redux store with history
const initialState = {};
const {persistor, store} = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('app');

const render = messages => {
  ReactDOM.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <LanguageProvider messages={messages}>
          <ConnectedRouter history={history}>
            <App />
          </ConnectedRouter>
        </LanguageProvider>
      </PersistGate>
    </Provider>,
    MOUNT_NODE,
  );
};

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['./i18n', 'containers/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render(translationMessages);
  });
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  new Promise(resolve => {
    resolve(import('intl'));
  })
    .then(() => Promise.all([import('intl/locale-data/jsonp/en.js')]))
    .then(() => render(translationMessages))
    .catch(err => {
      throw err;
    });
} else {
  render(translationMessages);
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
// if (process.env.NODE_ENV === 'production') {
//   require('offline-plugin/runtime').install(); // eslint-disable-line global-require
// }
