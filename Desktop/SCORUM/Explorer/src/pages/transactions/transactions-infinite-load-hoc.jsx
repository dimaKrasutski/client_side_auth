import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'ramda';
import { createTransactionsFetcher } from '../../helpers/operations';
import { withInfiniteScroll } from '../../hocs/with-infinite-scroll';
import { setTransactions, setTransactionsOffset } from '../../actions/transactions';

export const withTransactionsInfiniteLoad = (WrappedComponent) => {
  const WrappedWithInfiniteScroll = withInfiniteScroll(WrappedComponent);

  class TransactionsInfiniteLoad extends Component {
    static propTypes = {
      transactionsOffset: PropTypes.number.isRequired,
      transactions: PropTypes.arrayOf().isRequired,
      isValidTabSelected: PropTypes.bool.isRequired,
      setTransactionsAction: PropTypes.func.isRequired,
      setTransactionsOffsetActions: PropTypes.func.isRequired,
    };

    transactionsFetcher = createTransactionsFetcher(
      this.props.transactionsOffset,
      this.props.setTransactionsOffsetActions
    );

    transactionsFetcherSubscription;

    state = {
      inProgress: false,
    };

    /**
     * Initial subscribe to fetcher and instant preload of first bunch
     */
    componentDidMount() {
      const { transactionsOffset } = this.props;
      this.transactionsFetcherSubscription = this.transactionsFetcher.subscribe(this.updateTransactions);
      if (transactionsOffset === -1) {
        this.transactionsFetcher.fetchNext();
      }
    }

    componentWillUnmount() {
      this.transactionsFetcherSubscription.unsubscribe();
    }

    /**
     * Initiate loading of next transactions
     */
    loadNext = () => {
      if (this.props.isValidTabSelected && this.transactionsFetcher.hasNext()) {
        this.setState({
          inProgress: true,
        });
        this.transactionsFetcher.fetchNext();
      }
    };

    updateTransactions = (nextTransactions) => {
      this.props.setTransactionsAction(nextTransactions);
      this.setState({
        inProgress: false,
      });
    };

    render() {
      const { inProgress } = this.state;

      return (
        <WrappedWithInfiniteScroll
          {...this.props}
          inProgress={inProgress}
          loadNext={this.loadNext}
        />
      );
    }
  }

  const mapStateToProps = ({ transactions }) => ({
    transactions: transactions.transactions,
    isValidTabSelected: transactions.selectedTab === 'transactions',
    transactionsOffset: transactions.transactionsOffset,
  });

  const mapDispatchToProps = dispatch => ({
    setTransactionsAction: compose(dispatch, setTransactions),
    setTransactionsOffsetActions: compose(dispatch, setTransactionsOffset),
  });

  return connect(mapStateToProps, mapDispatchToProps)(TransactionsInfiniteLoad);
};
