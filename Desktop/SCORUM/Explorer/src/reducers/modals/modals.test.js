import { modals } from './modals';
import { openModal, closeModal } from '../../actions/modals';

describe('modals reducer', () => {
  describe('#openModal', () => {
    test('should set modal state open by id', () => {
      expect(modals({ test: true }, openModal('supModalId'))).toMatchObject({
        supModalId: true,
        test: true,
      });
    });
  });

  describe('#closeModal', () => {
    test('should set modal state closed by id', () => {
      expect(modals({ test: true }, closeModal('supModalId'))).toMatchObject({
        supModalId: false,
        test: true,
      });
    });
  });
});
