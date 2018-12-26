import React from 'react';
import { DashboardButton } from './dashboard-button';

describe('<DashboardButton />', () => {
  test('should match snapshot', () => {
    const wrapper = shallow(<DashboardButton text="test" onClick={jest.fn()} />);
    expect(wrapper).toMatchSnapshot();
  });
});
