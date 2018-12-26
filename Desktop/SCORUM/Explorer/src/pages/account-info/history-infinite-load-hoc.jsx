import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { TransactionsEmpty } from './transactions-empty/transactions-empty';
import { createTransactionsFetcher } from '../../helpers/transactions';
import { withInfiniteScroll } from '../../hocs/with-infinite-scroll';

const TRANSACTIONS_PER_SCROLL_LIMIT = 20;

export const withHistoryInfiniteLoad = (WrappedComponent, userName, reducer) => {
  const WrappedWithInfiniteScroll = withInfiniteScroll(WrappedComponent);

  class HistoryInfiniteLoad extends Component {
    static propTypes = {
      isValidTabSelected: PropTypes.bool.isRequired,
      timestamp: PropTypes.number.isRequired,
    };

    transactionsFetcher = createTransactionsFetcher(
      reducer,
      userName,
      TRANSACTIONS_PER_SCROLL_LIMIT,
    );
    transactionsFetcherSubscription;

    state = {
      transactions: null,
      inProgress: false,
    };

    /**
     * Initial subscribe to fetcher and instant preload of first bunch
     */
    componentDidMount() {
      this.transactionsFetcherSubscription = this.transactionsFetcher.subscribe(this.updateTransactions);
      this.transactionsFetcher.fetchNext();
    }

    componentWillUnmount() {
      this.transactionsFetcherSubscription.unsubscribe();
    }

    /**
     * Initiate loading of next transactions
     */
    loadNext = () => {
      if (this.transactionsFetcher.hasNext()) {
        this.setState({
          inProgress: true,
        });
        this.transactionsFetcher.fetchNext();
      }
    };

    updateTransactions = (nextTransactions) => {
      this.setState(prevState => ({
        transactions: this.transactionsFetcher.isInitial() ?
          nextTransactions :
          prevState.transactions.concat(nextTransactions),
        inProgress: false,
      }));
    };

    render() {
      const { inProgress, transactions } = this.state;

      if (transactions !== null && !transactions.length) {
        return (
          <TransactionsEmpty
            titleId="explorer.account-info.transactions.empty.title"
            subtitleId="explorer.account-info.transactions.empty.subtitle"
            values={{ userName }}
          />
        );
      }

      return (
        <WrappedWithInfiniteScroll
          {...this.props}
          inProgress={inProgress}
          loadNext={this.loadNext}
          transactions={transactions}
          userName={userName}
        />
      );
    }
  }

  return HistoryInfiniteLoad;
};
