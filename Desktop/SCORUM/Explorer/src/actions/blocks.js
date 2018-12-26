import { createActions } from 'redux-actions';

export const {
  setBlocks,
  setBlockNumber,
  setCurrentBlockNumber,
} = createActions(
  'SET_BLOCKS',
  'SET_BLOCK_NUMBER',
  'SET_CURRENT_BLOCK_NUMBER',
);
