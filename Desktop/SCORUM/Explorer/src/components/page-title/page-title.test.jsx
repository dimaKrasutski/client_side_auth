import React from 'react';
import { PageTitle } from './page-title';

describe('<PageTitle />', () => {
  test('should match snapshot', () => {
    const wrapper = shallow(<PageTitle title="test" secondaryTitle="sec" />);
    expect(wrapper).toMatchSnapshot();
  });
});
