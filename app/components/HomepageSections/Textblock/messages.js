/*
 * Textblock Messages
 *
 * This contains all the text for the Textblock component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.Textblock';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the Textblock component!',
  },
});
