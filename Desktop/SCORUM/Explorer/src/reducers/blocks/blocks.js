import { handleActions } from 'redux-actions';
import initialState from './initial-state';
import { setBlocks, setBlockNumber, setCurrentBlockNumber } from '../../actions/blocks';

export default handleActions(
  {
    [setBlocks]: (state, { payload: blocks }) => ({
      ...state,
      blocks: state.blocks.concat(blocks),
    }),
    [setBlockNumber]: (state, { payload: props }) => ({
      ...state,
      headBlockNumber: props.head_block_number,
      currentBlockNumber: props.head_block_number,
    }),
    [setCurrentBlockNumber]: (state, { payload: number }) => ({
      ...state,
      currentBlockNumber: number,
    }),
  },
  initialState,
);
