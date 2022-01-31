/**
 *
 * Asynchronously loads the component for Textblock
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
