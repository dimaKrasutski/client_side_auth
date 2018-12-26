import { amountStrToNum, processAmountValue, scrToFixed, floorFloatAmount, formatAmountWithLocale } from './amount';
import { DEFAULT_LOCALE } from '../constants';

describe('amountStrToNum', () => {
  test('should return a number', () => {
    expect(amountStrToNum('+-*30.6dd5')).toBe(30.65);
  });
});

describe('processAmountValue', () => {
  test('should replace all symbols except numbers and dots', () => {
    expect(processAmountValue('+-*30.6d_d5,')).toBe('30.65');
  });
});

describe('scrToFixed', () => {
  test('should return correct value', () => {
    expect(scrToFixed('10')).toBe('10.000000000 SCR');
  });
});

describe('floorFloatAmount', () => {
  test('should return correct value', () => {
    expect(floorFloatAmount('10.58467', 3)).toBe(10.584);
    expect(floorFloatAmount('1.3432', 3)).toBe(1.343);
    expect(floorFloatAmount('4.3479', 3)).toBe(4.347);
  });

  test('should return 0', () => {
    expect(floorFloatAmount('0.0001', 3)).toBe(0);
    expect(floorFloatAmount('0.000001', 3)).toBe(0);
    expect(floorFloatAmount('0.000000001', 3)).toBe(0);
  });
});

describe('#formatAmountWithLocale', () => {
  test('should format amount with locale', () => {
    const formatAmount = formatAmountWithLocale(DEFAULT_LOCALE);
    expect(formatAmount('0')).toEqual('0.000');
    expect(formatAmount('0.000001')).toEqual('0.000001');
    expect(formatAmount('1.980000001')).toEqual('1.980000001');
  });
});
