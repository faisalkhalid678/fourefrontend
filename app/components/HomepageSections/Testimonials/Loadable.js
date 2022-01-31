/**
 *
 * Asynchronously loads the component for Testimonials
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
