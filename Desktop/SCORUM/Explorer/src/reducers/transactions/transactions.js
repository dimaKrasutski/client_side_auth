import { handleActions } from 'redux-actions';
import initialState from './initial-state';
import {
  setTransactions,
  setTransactionsOffset,
  selectTransactionsTab,
  setOperations,
  setOperationsOffset,
} from '../../actions/transactions';

export default handleActions(
  {
    [setTransactions]: (state, { payload: transactions }) => ({
      ...state,
      transactions: state.transactions.concat(transactions),
    }),
    [setTransactionsOffset]: (state, { payload: transactionsOffset }) => ({
      ...state,
      transactionsOffset,
    }),
    [setOperations]: (state, { payload: operations }) => ({
      ...state,
      operations: state.operations.concat(operations),
    }),
    [setOperationsOffset]: (state, { payload: operationsOffset }) => ({
      ...state,
      operationsOffset,
    }),
    [selectTransactionsTab]: (state, { payload: selectedTab }) => ({
      ...state,
      selectedTab,
    }),
  },
  initialState,
);
