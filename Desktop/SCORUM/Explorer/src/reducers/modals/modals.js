import { handleActions } from 'redux-actions';
import { openModal, closeModal } from '../../actions/modals';

export const modals = handleActions(
  {
    [openModal]: (state, { payload: modalId }) => ({
      ...state,
      [modalId]: true,
    }),
    [closeModal]: (state, { payload: modalId }) => ({
      ...state,
      [modalId]: false,
    }),
  },
  {},
);
