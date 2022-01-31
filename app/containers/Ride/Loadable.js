/**
 *
 * Asynchronously loads the component for Ride
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
