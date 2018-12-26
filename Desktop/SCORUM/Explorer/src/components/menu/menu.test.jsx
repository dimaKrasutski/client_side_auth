import React from 'react';
import { Menu } from './menu';

describe('<Menu />', () => {
  test('should match snapshot', () => {
    const wrapper = shallow(<Menu />);
    expect(wrapper).toMatchSnapshot();
  });
});
