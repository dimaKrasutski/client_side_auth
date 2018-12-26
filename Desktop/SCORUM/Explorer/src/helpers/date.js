import dateformat from 'dateformat';
import { DEFAULT_LOCALE, LOCALE_KEYS } from '../constants';

/**
 * @TODO: Remove UTC when we decide to switch to format dates based on current user Timezone
 */
export const LOCALE_DATE_TIME_FORMATS = {
  [LOCALE_KEYS.EN_US]: 'UTC:dd/mm/yy h:MM TT',
  [LOCALE_KEYS.RU_RU]: 'UTC:dd/mm/yy HH:MM',
};

export const toStandardFormat = (timestamp, locale = DEFAULT_LOCALE) => {
  const localeDateTimeFormat = LOCALE_DATE_TIME_FORMATS[locale] || LOCALE_DATE_TIME_FORMATS[DEFAULT_LOCALE];
  // Convert timestamp passed to UTC format using 'Z' symbol at the end (if not defined already)
  const dateFromTimestamp = new Date(timestamp.replace(/(zZ)*$/, 'Z'));
  return dateformat(dateFromTimestamp, localeDateTimeFormat);
};
