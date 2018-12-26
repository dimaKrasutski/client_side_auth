import { combineEpics } from 'redux-observable';
import { dashboardEpics } from './dashboard';
import { blockInfoEpics } from './block-info';
import { delegatesEpics } from './delegates';
import { accountInfoEpics } from './account-info';

export const rootEpic = combineEpics(dashboardEpics, blockInfoEpics, delegatesEpics, accountInfoEpics);
