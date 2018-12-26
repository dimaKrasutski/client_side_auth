import React from 'react';
import { PreloaderBlocks, PreloaderRow } from './preloader-blocks';

describe('<PreloaderBlocks />', () => {
  test('should match snapshot', () => {
    const wrapper = shallow(<PreloaderBlocks />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('<PreloaderRow />', () => {
  test('should match snapshot', () => {
    const wrapper = shallow(<PreloaderRow />);
    expect(wrapper).toMatchSnapshot();
  });
});
