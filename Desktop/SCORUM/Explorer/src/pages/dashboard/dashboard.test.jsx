import React from 'react';
import { DashboardUI } from './dashboard';

describe('<DashboardUI />', () => {
  test('should match snapshot', () => {
    const wrapper = shallow((<DashboardUI
      locale="en-us"
      preloadChainCapital={jest.fn()}
      loadOperationsAction={jest.fn()}
      loadBlocksAction={jest.fn()}
      loadAccountCountAction={jest.fn()}
      amountSCR={0}
      amountSP={0}
      blocks={[]}
      operations={[]}
      blocksCount="1"
    />));
    expect(wrapper).toMatchSnapshot();
  });
});
