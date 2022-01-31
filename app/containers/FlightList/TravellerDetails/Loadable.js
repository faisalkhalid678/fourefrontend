/**
 *
 * Asynchronously loads the component for TravellerDetails
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
