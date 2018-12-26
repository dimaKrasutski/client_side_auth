import { compose, head, pick, curry, multiply, nAry } from 'ramda';
import { DEFAULT_LOCALE, MIN_FRACTION_DIGITS } from '../constants';
import { floorFloatAmount } from '../helpers/amount';

export const SCR_BALANCE_RESPONSE_FIELD_NAME = 'balance';
export const SP_BALANCE_RESPONSE_FIELD_NAME = 'scorumpower';


export const getAccountInfo = compose(
  pick([SCR_BALANCE_RESPONSE_FIELD_NAME, SP_BALANCE_RESPONSE_FIELD_NAME]),
  head,
);

export const balanceToNumber = nAry(1, Number.parseFloat);

export const formatBalanceToPrice = (balance, locale = DEFAULT_LOCALE) =>
  floorFloatAmount(balanceToNumber(balance), MIN_FRACTION_DIGITS).toLocaleString(locale, {
    minimumFractionDigits: MIN_FRACTION_DIGITS,
    maximumFractionDigits: MIN_FRACTION_DIGITS,
  });

/**
 * Curried format balance function to partially apply locale and then format numbers
 * @returns {Number}
 */
export const formatBalanceWithLocale = curry((locale, balance) => formatBalanceToPrice(balance, locale));

/**
 * Gets balance as string and returns balance as USD
 * @returns {Number}
 */
export const getBalanceConverter = rate => compose(
  multiply(rate),
  balanceToNumber,
);
