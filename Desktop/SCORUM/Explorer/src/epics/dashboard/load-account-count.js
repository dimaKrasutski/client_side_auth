import { ofType } from 'redux-observable';
import { mergeMap } from 'rxjs/operators/mergeMap';
import { map } from 'rxjs/operators/map';
import { loadAccountCount, setAccountCount } from '../../actions/dashboard';
import { getAccountCount } from '../../api/scorum';
import { catchGlobalErrorWith } from '../common-operators';
import { UNDEFINED_ERROR_ID } from '../../constants';

export const loadAccountCountEpic = action$ => action$.pipe(
  ofType(loadAccountCount),
  mergeMap(() => getAccountCount()),
  map(setAccountCount),
  catchGlobalErrorWith(UNDEFINED_ERROR_ID),
);
