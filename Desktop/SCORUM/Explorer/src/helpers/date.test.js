import dateformat from 'dateformat';
import { toStandardFormat, LOCALE_DATE_TIME_FORMATS } from './date';
import { DEFAULT_LOCALE, LOCALE_KEYS } from '../constants';

jest.mock('dateformat', () => jest.fn(timestamp => timestamp));

const timestamp = '2018-03-15T15:56:30';
const timestampExpected = new Date(`${timestamp}Z`);
const timestampWithParam = `${timestamp}Z`;

describe('Date helpers', () => {
  beforeAll(() => {
    Date.now = jest.genMockFunction().mockReturnValue(timestamp);
  });

  test('should format with default locale', () => {
    toStandardFormat(timestamp);
    expect(dateformat).toHaveBeenCalledWith(timestampExpected, LOCALE_DATE_TIME_FORMATS[DEFAULT_LOCALE]);
  });

  test('should format with custom locale', () => {
    toStandardFormat(timestamp, LOCALE_KEYS.RU_RU);
    expect(dateformat).toHaveBeenCalledWith(timestampExpected, LOCALE_DATE_TIME_FORMATS[LOCALE_KEYS.RU_RU]);
  });

  describe('when non-existent locale passed', () => {
    test('should format with default locale', () => {
      toStandardFormat(timestamp, 'non-existent');
      expect(dateformat).toHaveBeenCalledWith(timestampExpected, LOCALE_DATE_TIME_FORMATS[LOCALE_KEYS.EN_US]);
    });
  });

  describe('when timestamp with UTC param passed', () => {
    test('should hold this param', () => {
      toStandardFormat(timestampWithParam);
      expect(dateformat).toHaveBeenCalledWith(timestampExpected, LOCALE_DATE_TIME_FORMATS[DEFAULT_LOCALE]);
    });

    test('should replace small z with upper Z', () => {
      toStandardFormat(`${timestamp}z`);
      expect(dateformat).toHaveBeenCalledWith(timestampExpected, LOCALE_DATE_TIME_FORMATS[DEFAULT_LOCALE]);
    });
  });
});
