import React from 'react';
import { OperationsTable } from './operations-table';

describe('<OperationsTable />', () => {
  test('should match snapshot', () => {
    const wrapper = shallow(<OperationsTable operations={[]} blockReady />);
    expect(wrapper).toMatchSnapshot();
  });
});
