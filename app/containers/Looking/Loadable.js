/**
 *
 * Asynchronously loads the component for Looking
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
