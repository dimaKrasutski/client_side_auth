import { combineEpics } from 'redux-observable';
import { loadAccountEpic } from './account-info/load-account';

export const accountInfoEpics = combineEpics(loadAccountEpic);
