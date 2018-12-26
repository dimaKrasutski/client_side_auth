import React from 'react';
import { BlockUI } from './block';

describe('<BlockUI />', () => {
  test('should match snapshot', () => {
    const wrapper = shallow(<BlockUI
      block={[100, { timestamp: '2018-04-06T05:55:51', block_id: 123 }]}
      locale="en-us"
      history={{}}
    />);
    expect(wrapper).toMatchSnapshot();
  });
});
