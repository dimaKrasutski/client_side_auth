import React from 'react';
import { TransactionsUI } from './transactions';

describe('<TransactionsUI />', () => {
  test('should match snapshot', () => {
    const wrapper = shallow(<TransactionsUI selectedTab="transactions" selectTab={jest.fn()} />);
    expect(wrapper).toMatchSnapshot();
  });
});
