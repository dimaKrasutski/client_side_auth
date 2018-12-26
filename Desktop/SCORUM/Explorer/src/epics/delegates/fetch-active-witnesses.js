import { ofType, ActionsObservable } from 'redux-observable';
import { mergeMap } from 'rxjs/operators/mergeMap';
import { map } from 'ramda';
import { setActiveWitnesses, setCandidateWitnesses, preloadActiveWitnesses } from '../../actions/delegates';
import { getActiveWitnesses } from '../../api/scorum';
import { catchGlobalErrorWith } from '../common-operators';
import { UNDEFINED_ERROR_ID } from '../../constants';

export const fetchActiveWitnessesEpic = (action$, store) => action$.pipe(
  ofType(preloadActiveWitnesses),
  mergeMap(() => getActiveWitnesses()),
  mergeMap((response) => {
    const witnesses = map((witness) => {
      const result = witness;
      result.votes = (result.votes / 1000000000).toFixed(9);
      return result;
    }, store.getState().delegates.witnesses);
    const active = witnesses.filter(witness => (response.indexOf(witness.owner) > -1));
    const candidates = witnesses.filter(witness => (response.indexOf(witness.owner) === -1));
    return ActionsObservable.of(setActiveWitnesses(active), setCandidateWitnesses(candidates));
  }),
  catchGlobalErrorWith(UNDEFINED_ERROR_ID),
);
