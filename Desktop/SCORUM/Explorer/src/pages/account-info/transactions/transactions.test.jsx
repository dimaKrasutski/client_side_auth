import React from 'react';
import { TransactionsUI, mapStateToProps } from './transactions';
import { DEFAULT_LOCALE } from '../../../constants';

const transactions = [
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

const loadNextMock = jest.fn();
let wrapper;

describe('<TransactionsUI />', () => {
  beforeEach(() => {
    loadNextMock.mockReset();
    wrapper = shallow(<TransactionsUI locale={DEFAULT_LOCALE} userName="Dabooos" inProgress={false} transactions={transactions} loadNext={loadNextMock} />);
  });

  test('should', () => {
    expect(wrapper).toMatchSnapshot();
  });

  test('should match with inProgress', () => {
    wrapper = shallow(<TransactionsUI locale={DEFAULT_LOCALE} userName="Dabooos" transactions={transactions} inProgress loadNext={loadNextMock} />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('mapStateToProps', () => {
  test('should fill props from state', () => {
    const state = {
      intl: {
        localeFull: 'ko-ko',
      },
    };
    expect(mapStateToProps(state).locale).toEqual('ko-ko');
  });
});
