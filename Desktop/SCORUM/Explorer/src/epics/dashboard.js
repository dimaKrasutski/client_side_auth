import { combineEpics } from 'redux-observable';
import { loadBlocksEpic } from './dashboard/load-blocks';
import { loadOperationsEpic } from './dashboard/load-operations';
import { loadAccountCountEpic } from './dashboard/load-account-count';
import { loadChainCapitalEpic } from './dashboard/load-chain-capital';

export const dashboardEpics = combineEpics(
  loadOperationsEpic,
  loadBlocksEpic,
  loadAccountCountEpic,
  loadChainCapitalEpic,
);
