import { createActions } from 'redux-actions';

export const {
  preloadAccountInfo,
  setAccountInfo,
} = createActions(
  'PRELOAD_ACCOUNT_INFO',
  'SET_ACCOUNT_INFO',
);
