import { ofType, ActionsObservable } from 'redux-observable';
import { mergeMap } from 'rxjs/operators/mergeMap';
import {
  setWitnesses,
  preloadActiveWitnesses,
  preloadWitnessesByVote,
} from '../../actions/delegates';
import { getWitnessesByVote } from '../../api/scorum';
import { catchGlobalErrorWith } from '../common-operators';
import { UNDEFINED_ERROR_ID } from '../../constants';

export const fetchWitnessesByVoteEpic = action$ => action$.pipe(
  ofType(preloadWitnessesByVote),
  mergeMap(() => getWitnessesByVote()),
  mergeMap(response => (ActionsObservable.of(setWitnesses(response), preloadActiveWitnesses()))),
  catchGlobalErrorWith(UNDEFINED_ERROR_ID),
);
