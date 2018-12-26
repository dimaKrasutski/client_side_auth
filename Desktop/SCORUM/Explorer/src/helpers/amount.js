import { compose, curry } from 'ramda';
import { MAX_FRACTION_DIGITS, DEFAULT_LOCALE, MIN_FRACTION_DIGITS } from '../constants';

export const processAmountValue = amount => amount.replace(/[^\d.]/g, '');
export const amountStrToNum = compose(Number.parseFloat, processAmountValue);
export const scrToFixed = amount => `${Number.parseFloat(amount).toFixed(MAX_FRACTION_DIGITS)} SCR`;

/* eslint-disable prefer-template */
export const floorFloatAmount = (val, decimals) =>
  Number(Math.floor(Number.parseFloat(val).toFixed(MAX_FRACTION_DIGITS) + 'e' + decimals) + 'e-' + decimals);
/* eslint-enable prefer-template */

export const formatAmountToPrice = (amount, locale = DEFAULT_LOCALE) =>
  Number.parseFloat(amount).toLocaleString(locale, {
    minimumFractionDigits: MIN_FRACTION_DIGITS,
    maximumFractionDigits: MAX_FRACTION_DIGITS,
  });

/**
 * Curried format balance function to partially apply locale and then format numbers
 * @returns {Number}
 */
export const formatAmountWithLocale = curry((locale, balance) => formatAmountToPrice(balance, locale));
