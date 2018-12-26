import { createActions } from 'redux-actions';
import { logError } from '../helpers/error-logger';

export const {
  globalError,
  clearError,
  redirectTo404,
  clearRedirect,
} = createActions(
  {
    GLOBAL_ERROR: (errorId, error, links) => {
      if (error) {
        logError(error);
      }
      return { error: errorId, links };
    },
  },
  'CLEAR_ERROR',
  'REDIRECT_TO_404',
  'CLEAR_REDIRECT',
);
