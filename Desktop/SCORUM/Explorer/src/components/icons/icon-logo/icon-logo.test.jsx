import React from 'react';
import { IconLogo } from './icon-logo';

describe('<IconLogo />', () => {
  test('should match snapshot', () => {
    const wrapper = shallow(<IconLogo />);
    expect(wrapper).toMatchSnapshot();
  });
});
