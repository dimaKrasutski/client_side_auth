import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'ramda';
import { createTransactionsAllFetcher } from '../../helpers/operations';
import { withInfiniteScroll } from '../../hocs/with-infinite-scroll';
import { setOperations, setOperationsOffset } from '../../actions/transactions';

export const withTransactionsAllInfiniteLoad = (WrappedComponent) => {
  const WrappedWithInfiniteScroll = withInfiniteScroll(WrappedComponent);

  class TransactionsAllInfiniteLoad extends Component {
    static propTypes = {
      operationsOffset: PropTypes.number.isRequired,
      isValidTabSelected: PropTypes.bool.isRequired,
      operations: PropTypes.arrayOf().isRequired,
      setOperationsAction: PropTypes.func.isRequired,
      setOperationsOffsetAction: PropTypes.func.isRequired,
    };

    transactionsFetcher = createTransactionsAllFetcher(
      this.props.operationsOffset,
      this.props.setOperationsOffsetAction,
    );

    transactionsFetcherSubscription;

    state = {
      inProgress: false,
    };

    /**
     * Initial subscribe to fetcher and instant preload of first bunch
     */
    componentDidMount() {
      const { operationsOffset } = this.props;
      this.transactionsFetcherSubscription = this.transactionsFetcher.subscribe(this.updateTransactions);
      if (operationsOffset === -1) {
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
      this.props.setOperationsAction(nextTransactions);
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
    operations: transactions.operations,
    isValidTabSelected: transactions.selectedTab === 'all',
    operationsOffset: transactions.operationsOffset,
  });

  const mapDispatchToProps = dispatch => ({
    setOperationsAction: compose(dispatch, setOperations),
    setOperationsOffsetAction: compose(dispatch, setOperationsOffset),
  });

  return connect(mapStateToProps, mapDispatchToProps)(TransactionsAllInfiniteLoad);
};
