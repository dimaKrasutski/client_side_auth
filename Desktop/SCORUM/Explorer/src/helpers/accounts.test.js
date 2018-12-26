import {
  getAccountInfo,
  SCR_BALANCE_RESPONSE_FIELD_NAME,
  SP_BALANCE_RESPONSE_FIELD_NAME,
  getBalanceConverter,
  formatBalanceWithLocale,
  formatBalanceToPrice,
} from './accounts';
import { DEFAULT_LOCALE } from '../constants';

const testScr = '123000.000000 SCR';
const testSp = '123123.000000 SP';
const mockAccount = [{
  [SCR_BALANCE_RESPONSE_FIELD_NAME]: testScr,
  [SP_BALANCE_RESPONSE_FIELD_NAME]: testSp,
  unused: 123,
  name: 'Tony Bullet-Tooth',
}];

describe('Account helpers', () => {
  describe('#getAccountInfo', () => {
    test('should get account info from response and filter keys', () => {
      expect(getAccountInfo(mockAccount)).toEqual({
        [SCR_BALANCE_RESPONSE_FIELD_NAME]: testScr,
        [SP_BALANCE_RESPONSE_FIELD_NAME]: testSp,
      });
    });
  });

  describe('#getBalanceConverter', () => {
    test('should create converter with trade rate', () => {
      const convertBalance = getBalanceConverter('1.24');
      expect(convertBalance('12000 SCR')).toEqual(14880);
    });
  });

  describe('#formatBalanceToPrice', () => {
    test('should format price balance', () => {
      expect(formatBalanceToPrice('12000 SCR', DEFAULT_LOCALE)).toEqual('12,000.000');
    });
  });

  describe('#formatBalanceWithLocale', () => {
    test('should format price balance with locale', () => {
      const formatBalance = formatBalanceWithLocale(DEFAULT_LOCALE);
      expect(formatBalance('0 SCR')).toEqual('0.000');
      expect(formatBalance('14880 SCR')).toEqual('14,880.000');
    });
  });
});
