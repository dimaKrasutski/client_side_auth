import React from 'react';
import configureStore from 'redux-mock-store';
import { Transaction } from './transaction';
import { DEFAULT_LOCALE } from '../../../../constants';

const mockStore = configureStore([]);
const timestamp = '2018-03-07T15:42:39';
const testTransaction = {
  timestamp,
  index: 5,
  op: {
    amount: '100000 SCR',
    from: 'user1',
    to: 'user2',
  },
};

describe('<Transaction />', () => {
  beforeAll(() => {
    Date.now = jest.genMockFunction().mockReturnValue(timestamp);
  });

  test('should match snapshot', () => {
    const wrapper =
      shallow(<Transaction store={mockStore({})} transaction={testTransaction} locale={DEFAULT_LOCALE} />);
    expect(wrapper).toMatchSnapshot();
  });
});
