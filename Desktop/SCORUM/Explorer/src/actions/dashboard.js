import { createActions } from 'redux-actions';

export const {
  getChainCapital,
  setChainCapital,
  loadOperations,
  setDashboardOperations,
  loadBlocks,
  setBlocks,
  loadAccountCount,
  setAccountCount,
} = createActions(
  'GET_CHAIN_CAPITAL',
  'SET_CHAIN_CAPITAL',
  'LOAD_OPERATIONS',
  'SET_DASHBOARD_OPERATIONS',
  'LOAD_BLOCKS',
  'SET_BLOCKS',
  'LOAD_ACCOUNT_COUNT',
  'SET_ACCOUNT_COUNT',
);
