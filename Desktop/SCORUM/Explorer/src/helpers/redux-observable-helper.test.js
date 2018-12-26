import { actionsObservableOf } from './redux-observable-helper';

const actionCreator = payload => ({
  type: 'TEST',
  payload,
});

describe('Redux observable helper', () => {
  describe('#actionsObservableOf', () => {
    test('should create action observable from action', () => {
      actionsObservableOf(actionCreator(1)).subscribe((actionObject) => {
        expect(actionObject).toMatchObject(actionCreator(1));
      });
      expect.assertions(1);
    });
  });
});
