import React from 'react';
import { TransactionsEmpty } from './transactions-empty';

describe('<TransactionsEmpty />', () => {
  test('should match snapshot', () => {
    const wrapper = shallow(<TransactionsEmpty titleId="test-title" subtitleId="test-subtitle" />);
    expect(wrapper).toMatchSnapshot();
  });
});
