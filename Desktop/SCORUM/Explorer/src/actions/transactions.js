import { createActions } from 'redux-actions';

export const {
  setTransactions,
  setTransactionsOffset,
  selectTransactionsTab,
  setOperations,
  setOperationsOffset,
} = createActions(
  'SET_TRANSACTIONS',
  'SET_TRANSACTIONS_OFFSET',
  'SELECT_TRANSACTIONS_TAB',
  'SET_OPERATIONS',
  'SET_OPERATIONS_OFFSET',
);
