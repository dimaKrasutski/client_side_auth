import { handleActions } from 'redux-actions';
import initialState from './initial-state';
import { setBlock, selectBlocksTab } from '../../actions/block-info';

export default handleActions(
  {
    [setBlock]: (state, { payload: block }) => ({
      ...state,
      block,
    }),
    [selectBlocksTab]: (state, { payload: selectedTab }) => ({
      ...state,
      selectedTab,
    }),
  },
  initialState,
);
