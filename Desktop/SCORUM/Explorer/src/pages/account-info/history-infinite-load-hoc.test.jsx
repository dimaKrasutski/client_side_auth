import { createTransactionsFetcher, HISTORY_TYPE_CONVERSION, reduceConversion } from '../../helpers/transactions';
import { withHistoryInfiniteLoad } from './history-infinite-load-hoc';
import { DEFAULT_LOCALE } from '../../constants';

const conversionTransactions = [
  {
    timestamp: '2018-03-07T15:42:39',
    index: 0,
    op: {
      amount: '100000.000 SCR',
    },
  },
  {
    timestamp: '2018-03-07T15:42:41',
    index: 1,
    op: {
      amount: '100000.000 SCR',
    },
  },
  {
    timestamp: '2018-03-07T15:42:49',
    index: 2,
    op: {
      amount: '100000.000 SCR',
    },
  },
];

jest.mock('../../helpers/transactions', () => {
  const unsubscribeMock = jest.fn();
  const subscribeMock = jest.fn();
  const fetchNextMock = jest.fn();
  const isInitialMock = jest.fn();
  const createTransactionsFetcherMock = jest.fn(() => ({
    subscribe: subscribeMock.mockReturnValue({
      unsubscribe: unsubscribeMock,
    }),
    fetchNext: fetchNextMock,
    isInitial: isInitialMock,
  }));

  createTransactionsFetcherMock.subscribeMock = subscribeMock;
  createTransactionsFetcherMock.fetchNextMock = fetchNextMock;
  createTransactionsFetcherMock.isInitialMock = isInitialMock;
  createTransactionsFetcherMock.unsubscribeMock = unsubscribeMock;
  return {
    createTransactionsFetcher: createTransactionsFetcherMock,
    HISTORY_TYPE_CONVERSION: 'conversiooon',
    reduceConversion: 'yes',
  };
});

let wrapper;
let HOC;

xdescribe('History infinite load HOC', () => {
  beforeEach(() => {
    createTransactionsFetcher.subscribeMock.mockReset();
    createTransactionsFetcher.fetchNextMock.mockReset();
    HOC = withHistoryInfiniteLoad();
    wrapper = shallow(<HOC locale={DEFAULT_LOCALE} userName="Dabooos" isConversionsTabSelected />);
  });

  test('should unsubscribe on willunmount', () => {
    wrapper.instance().componentWillUnmount();
    expect(createTransactionsFetcher.unsubscribeMock).toHaveBeenCalledTimes(1);
  });

  test('should match w/o conversions', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should match with conversions', () => {
    wrapper.setState({
      conversionTransactions,
    });
    expect(wrapper).toMatchSnapshot();
  });

  test('should subscribe to conversions fetcher', () => {
    expect(createTransactionsFetcher).toHaveBeenCalledWith(HISTORY_TYPE_CONVERSION, reduceConversion, 'Dabooos');
    expect(createTransactionsFetcher.subscribeMock).toHaveBeenCalledTimes(1);
    expect(createTransactionsFetcher.fetchNextMock).toHaveBeenCalledTimes(1);
  });

  test('should updateConversions', () => {
    wrapper.instance().updateConversions([1, 2]);
    expect(wrapper.state().conversionTransactions).toEqual([1, 2]);
  });

  describe('when tab is active', () => {
    test('should fetch next', () => {
      wrapper.instance().loadNext();
      expect(createTransactionsFetcher.fetchNextMock).toHaveBeenCalledTimes(2);
    });
  });

  describe('when tab is inactive', () => {
    test('should not fetch next', () => {
      createTransactionsFetcher.fetchNextMock.mockReset();
      wrapper = shallow(<HOC locale={DEFAULT_LOCALE} userName="Dabooos" isConversionsTabSelected={false} />);
      wrapper.instance().loadNext();
      expect(createTransactionsFetcher.fetchNextMock).toHaveBeenCalledTimes(1);
    });
  });
});
