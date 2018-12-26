import React from 'react';
import { MainUI } from './main';

describe('<MainUI />', () => {
  test('should match snapshot', () => {
    const wrapper = shallow(<MainUI locale="en-us" dismissGlobalAlert={jest.fn()} >test</MainUI>);
    expect(wrapper).toMatchSnapshot();
  });
});
