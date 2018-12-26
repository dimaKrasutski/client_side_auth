import { createActions } from 'redux-actions';

export const {
  preloadBlock,
  setBlock,
  selectBlocksTab,
} = createActions(
  'PRELOAD_BLOCK',
  'SET_BLOCK',
  'SELECT_BLOCKS_TAB',
);
