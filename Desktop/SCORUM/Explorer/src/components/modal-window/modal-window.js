import { connect } from 'react-redux';
import { compose } from 'ramda';
import { ModalWindowUI } from 'theme/components/modal-window/modal-window';
import {
  openModal as openModalAction,
  closeModal as closeModalAction,
} from '../../actions/modals';

export const mapStateToProps = ({ modals }, { id }) => ({
  isOpen: modals[id],
});

export const mapDispatchToProps = dispatch => ({
  openModal: compose(dispatch, openModalAction),
  closeModal: compose(dispatch, closeModalAction),
});

export const ModalWindow = connect(mapStateToProps, mapDispatchToProps)(ModalWindowUI);
