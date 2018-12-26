import React from 'react';
import { BlockTableUI } from './blocks-table';
import { LOCALE_KEYS } from '../../../constants';

describe('<BlockTableUI />', () => {
  test('should match snapshot', () => {
    const wrapper = shallow(<BlockTableUI locale={LOCALE_KEYS.EN_US} blocks={[]} />);
    expect(wrapper).toMatchSnapshot();
  });
});
