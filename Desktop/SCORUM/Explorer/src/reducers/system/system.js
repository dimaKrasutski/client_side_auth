import { handleActions } from 'redux-actions';
import { globalError, clearError, redirectTo404, clearRedirect } from '../../actions/system';
import { UNDEFINED_ERROR_ID } from '../../constants';
import initialState from './initial-state';

export const system = handleActions(
  {
    [globalError]: (state, { payload: { error = UNDEFINED_ERROR_ID, links } }) => ({
      ...state,
      globalError: {
        ...state.globalError,
        id: error,
        links,
      },
    }),
    [clearError]: state => ({
      ...state,
      globalError: initialState.globalError,
    }),
    [redirectTo404]: state => ({
      ...state,
      redirect404: true,
    }),
    [clearRedirect]: state => ({
      ...state,
      redirect404: false,
    }),
  },
  initialState,
);

