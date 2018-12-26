import { ofType } from 'redux-observable';
import { mergeMap } from 'rxjs/operators/mergeMap';
import { map } from 'rxjs/operators/map';
import { getChainCapital as getChainCapitalAction, setChainCapital } from '../../actions/dashboard';
import { getChainCapital } from '../../api/scorum';
import { catchGlobalErrorWith } from '../common-operators';
import { UNDEFINED_ERROR_ID } from '../../constants';

export const loadChainCapitalEpic = action$ => action$.pipe(
  ofType(getChainCapitalAction),
  mergeMap(() => getChainCapital()),
  map(setChainCapital),
  catchGlobalErrorWith(UNDEFINED_ERROR_ID),
);
