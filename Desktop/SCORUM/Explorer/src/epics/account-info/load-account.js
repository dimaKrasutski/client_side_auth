import { ofType } from 'redux-observable';
import { mergeMap } from 'rxjs/operators/mergeMap';
import { map } from 'rxjs/operators/map';
import { compose } from 'ramda';
import { preloadAccountInfo, setAccountInfo } from '../../actions/account-info';
import { redirectTo404 } from '../../actions/system';
import { getAccountInfo } from '../../helpers/accounts';
import { getAccount } from '../../api/scorum';
import { catchGlobalErrorWith } from '../common-operators';
import { UNDEFINED_ERROR_ID } from '../../constants';

/**
 * Loads user from scorum API triggered by FETCH_ACCOUNT with userName
 * @param {Observable} action$
 */
export const loadAccountEpic = action$ => action$.pipe(
  ofType(preloadAccountInfo),
  mergeMap(({ payload: userName }) => getAccount(userName)),
  map((response) => {
    if (!response.length) return redirectTo404();
    return compose(setAccountInfo, getAccountInfo)(response);
  }),
  catchGlobalErrorWith(UNDEFINED_ERROR_ID),
);
