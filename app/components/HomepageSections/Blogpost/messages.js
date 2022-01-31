/*
 * Blogpost Messages
 *
 * This contains all the text for the Blogpost component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.Blogpost';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the Blogpost component!',
  },
});
