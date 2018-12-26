import React from 'react';
import { BalanceCard } from './balance-card';

describe('<BalanceCard />', () => {
  test('should render balance card', () => {
    const wrapper = shallow(<BalanceCard classNames="test">Some info about balance</BalanceCard>);
    expect(wrapper).toMatchSnapshot();
  });
});
