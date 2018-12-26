import { ofType } from 'redux-observable';
import { mergeMap } from 'rxjs/operators/mergeMap';
import { map } from 'rxjs/operators/map';
import { compose, reverse } from 'ramda';
import { loadBlocks, setBlocks } from '../../actions/dashboard';
import { getBlocksHistory } from '../../api/scorum';
import { catchGlobalErrorWith } from '../common-operators';
import { UNDEFINED_ERROR_ID } from '../../constants';

export const loadBlocksEpic = action$ => action$.pipe(
  ofType(loadBlocks),
  mergeMap(() => getBlocksHistory(-1, 5)),
  map(compose(
    setBlocks,
    reverse,
  )),
  catchGlobalErrorWith(UNDEFINED_ERROR_ID),
);
