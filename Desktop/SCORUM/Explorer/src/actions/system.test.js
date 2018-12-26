import { globalError } from './system';
import { logError } from '../helpers/error-logger';

jest.mock('../helpers/error-logger');

describe('system action creators', () => {
  test('should create global error with error id', () => {
    expect(globalError('test-id')).toMatchSnapshot();
    expect(logError).not.toHaveBeenCalled();
  });

  test('should create global error with error id and error', () => {
    const error = new Error('test');
    expect(globalError('test-id', error)).toMatchSnapshot();
    expect(logError).toHaveBeenCalledWith(error);
  });

  test('should create global error with error id, error and links', () => {
    const error = new Error('test');
    expect(globalError('test-id', error, [{ id: 'id', href: 'href', messageId: 'messageId' }])).toMatchSnapshot();
    expect(logError).toHaveBeenCalledWith(error);
  });
});
