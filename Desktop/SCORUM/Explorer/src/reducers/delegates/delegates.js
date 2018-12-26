import { handleActions } from 'redux-actions';
import initialState from './initial-state';
import { setActiveWitnesses, setCandidateWitnesses, setWitnesses } from '../../actions/delegates';

export default handleActions(
  {
    [setActiveWitnesses]: (state, { payload: active }) => ({
      ...state,
      active,
    }),
    [setCandidateWitnesses]: (state, { payload: candidates }) => ({
      ...state,
      candidates,
    }),
    [setWitnesses]: (state, { payload: witnesses }) => ({
      ...state,
      witnesses,
    }),
  },
  initialState,
);
