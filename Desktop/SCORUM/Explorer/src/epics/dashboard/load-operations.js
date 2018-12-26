import { ofType } from 'redux-observable';
import { mergeMap } from 'rxjs/operators/mergeMap';
import { map } from 'rxjs/operators/map';
import { compose, reverse } from 'ramda';
import { loadOperations, setDashboardOperations } from '../../actions/dashboard';
import { getOpsHistory } from '../../api/scorum';
import { catchGlobalErrorWith } from '../common-operators';
import { UNDEFINED_ERROR_ID } from '../../constants';

export const loadOperationsEpic = action$ => action$.pipe(
  ofType(loadOperations),
  mergeMap(() => getOpsHistory(-1, 5)),
  map(
    compose(
      setDashboardOperations,
      reverse,
    )
  ),
  catchGlobalErrorWith(UNDEFINED_ERROR_ID),
);
