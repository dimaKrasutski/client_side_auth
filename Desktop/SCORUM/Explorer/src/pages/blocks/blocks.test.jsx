import React from 'react';
import { BlocksUI } from './blocks';

describe('<BlocksUI />', () => {
  test('should match snapshot', () => {
    const wrapper = shallow(<BlocksUI currentBlockNumber="-1" />);
    expect(wrapper).toMatchSnapshot();
  });
});
