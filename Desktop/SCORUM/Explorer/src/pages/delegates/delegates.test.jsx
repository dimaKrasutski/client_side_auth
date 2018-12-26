import React from 'react';
import { DelegatesUI } from './delegates';

describe('<DelegatesUI />', () => {
  test('should match snapshot', () => {
    const wrapper = shallow(
      <DelegatesUI preloadWitnessesByVoteAction={jest.fn()} activeWitnesses={[]} candidates={[]} />
    );
    expect(wrapper).toMatchSnapshot();
  });
});
