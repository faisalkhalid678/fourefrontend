/**
 *
 * Asynchronously loads the component for Blogpost
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
