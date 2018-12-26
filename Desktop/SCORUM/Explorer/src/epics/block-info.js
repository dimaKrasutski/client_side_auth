import { combineEpics } from 'redux-observable';
import { preloadBlockEpic } from './block-info/preload-block';

export const blockInfoEpics = combineEpics(preloadBlockEpic);
