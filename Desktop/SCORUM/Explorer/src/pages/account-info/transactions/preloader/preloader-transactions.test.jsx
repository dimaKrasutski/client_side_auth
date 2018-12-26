import React from 'react';
import { PreloaderTransactions, PreloaderRow } from './preloader-transactions';

describe('<PreloaderTransactions />', () => {
  test('should match snapshot', () => {
    const wrapper = shallow(<PreloaderTransactions />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('<PreloaderRow />', () => {
  test('should match snapshot', () => {
    const wrapper = shallow(<PreloaderRow />);
    expect(wrapper).toMatchSnapshot();
  });
});
