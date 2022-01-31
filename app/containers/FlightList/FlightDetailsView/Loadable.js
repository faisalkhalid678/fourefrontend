/**
 *
 * Asynchronously loads the component for FlightDetailsView
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
