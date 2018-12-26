import { handleActions } from 'redux-actions';
import initialState from './initial-state';
import { setAccountInfo } from '../../actions/account-info';

export default handleActions(
  {
    [setAccountInfo]: (state, { payload: account }) => ({
      ...state,
      account,
    }),
  },
  initialState,
);
