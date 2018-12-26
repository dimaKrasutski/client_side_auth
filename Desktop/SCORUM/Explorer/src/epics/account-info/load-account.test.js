import configureMockStore from 'redux-mock-store';
import { createEpicMiddleware } from 'redux-observable';
import { of } from 'rxjs/observable/of';
import * as scorumAPI from '../../api/scorum';
import { loadAccountEpic } from './load-account';
import { preloadAccountInfo } from '../../actions/account-info';
import { SCR_BALANCE_RESPONSE_FIELD_NAME, SP_BALANCE_RESPONSE_FIELD_NAME } from '../../helpers/accounts';
import { globalError } from '../../actions/system';
import { UNDEFINED_ERROR_ID } from '../../constants';

jest.mock('../../helpers/error-logger');

const getEpicMiddleware = () => createEpicMiddleware(loadAccountEpic);
const getMockStore = () => configureMockStore([getEpicMiddleware()]);

const testUserName = 'user123';
const mockAccountResponse = [{
  [SCR_BALANCE_RESPONSE_FIELD_NAME]: '123000',
  [SP_BALANCE_RESPONSE_FIELD_NAME]: '123123',
}];

describe('Load account epic', () => {
  let store;
  let mockStore;

  beforeEach(() => {
    mockStore = getMockStore();
    store = mockStore();
  });

  describe('when account is returned and were fine', () => {
    beforeEach(() => {
      jest.spyOn(scorumAPI, 'getAccount').mockImplementation(() => of(mockAccountResponse));
      store.dispatch(preloadAccountInfo(testUserName));
    });

    test('should call API', () => {
      expect(scorumAPI.getAccount).toHaveBeenCalledWith(testUserName);
    });
  });

  describe('when error is thrown in between', () => {
    beforeEach(() => {
      jest.spyOn(scorumAPI, 'getAccount').mockImplementation(() => of(null));
      store.dispatch(preloadAccountInfo(testUserName));
    });

    test('should catch global error', () => {
      expect(store.getActions()).toEqual([
        preloadAccountInfo(testUserName),
        globalError(UNDEFINED_ERROR_ID),
      ]);
    });
  });
});
