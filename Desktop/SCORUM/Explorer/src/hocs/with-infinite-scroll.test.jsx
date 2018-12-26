import React from 'react';
import { withInfiniteScroll } from './with-infinite-scroll';

let wrapper;
const loadNext = jest.fn();

describe('withInfiniteScroll', () => {
  beforeEach(() => {
    const WrappedComponent = () => <div>Hey</div>;
    const WithScroll = withInfiniteScroll(WrappedComponent);
    wrapper = shallow(<WithScroll loadNext={loadNext} />);
  });

  test('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  /**
   * Dunno how to test window scroll yet.
   */
});
