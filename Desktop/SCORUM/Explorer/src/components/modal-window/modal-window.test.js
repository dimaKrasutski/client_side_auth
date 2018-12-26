import { mapStateToProps, mapDispatchToProps } from './modal-window';
import { openModal, closeModal } from '../../actions/modals';

describe('mapStateToProps', () => {
  test('should get modal state by id', () => {
    expect(mapStateToProps({
      modals: {
        sup: true,
      },
    }, {
      id: 'sup',
    }).isOpen).toBe(true);
  });
});

describe('mapDispatchToProps', () => {
  test('should call dispatch for dispatch methods', () => {
    const dispatch = jest.fn();
    const dispatchMethods = mapDispatchToProps(dispatch);
    dispatchMethods.openModal('test');
    expect(dispatch).toHaveBeenCalledWith(openModal('test'));
    dispatchMethods.closeModal('test');
    expect(dispatch).toHaveBeenCalledWith(closeModal('test'));
  });
});
