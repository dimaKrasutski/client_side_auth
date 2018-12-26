import { combineEpics } from 'redux-observable';
import { fetchActiveWitnessesEpic } from './delegates/fetch-active-witnesses';
import { fetchWitnessesByVoteEpic } from './delegates/fetch-witnesses-by-vote';

export const delegatesEpics = combineEpics(fetchActiveWitnessesEpic, fetchWitnessesByVoteEpic);
