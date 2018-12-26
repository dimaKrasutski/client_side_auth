import { createActions } from 'redux-actions';

export const {
  preloadActiveWitnesses,
  setActiveWitnesses,
  setCandidateWitnesses,
  preloadWitnessesByVote,
  setWitnesses,
} = createActions(
  'PRELOAD_ACTIVE_WITNESSES',
  'SET_ACTIVE_WITNESSES',
  'SET_CANDIDATE_WITNESSES',
  'PRELOAD_WITNESSES_BY_VOTE',
  'SET_WITNESSES',
);
