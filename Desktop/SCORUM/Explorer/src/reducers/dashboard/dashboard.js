import { handleActions } from 'redux-actions';
import initialState from './initial-state';
import { setBlocks, setDashboardOperations, setAccountCount, setChainCapital } from '../../actions/dashboard';

export default handleActions(
  {
    [setChainCapital]: (state, { payload: { circulating_scr: totalScr, circulating_sp: totalSP } }) => ({
      ...state,
      amountSCR: totalScr,
      amountSP: totalSP,
    }),
    [setBlocks]: (state, { payload: blocks }) => ({
      ...state,
      blocks,
      blocksCount: blocks[0][0],
    }),
    [setDashboardOperations]: (state, { payload: operations }) => ({
      ...state,
      operations,
      operationsCount: operations[0][0],
    }),
    [setAccountCount]: (state, { payload: accountCount }) => ({
      ...state,
      accountCount,
    }),
  },
  initialState,
);
