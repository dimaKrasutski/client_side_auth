import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'ramda';
import { createBlocksFetcher } from '../../helpers/blocks';
import { withInfiniteScroll } from '../../hocs/with-infinite-scroll';
import { setBlocks, setCurrentBlockNumber } from '../../actions/blocks';

export const withBlocksInfiniteLoad = (WrappedComponent, reducer) => {
  const WrappedWithInfiniteScroll = withInfiniteScroll(WrappedComponent);

  class BlocksInfiniteLoad extends Component {
    static propTypes = {
      currentBlockNumber: PropTypes.number.isRequired,
      headBlockNumber: PropTypes.number.isRequired,
      setBlocks: PropTypes.func.isRequired,
      setCurrentBlockNumberAction: PropTypes.func.isRequired,
    };

    blocksFetcher = createBlocksFetcher(
      reducer,
      this.props.currentBlockNumber,
      this.props.setCurrentBlockNumberAction
    );

    blocksFetcherSubscription;

    state = {
      inProgress: false,
    };

    /**
     * Initial subscribe to fetcher and instant preload of first bunch
     */
    componentDidMount() {
      const { currentBlockNumber, headBlockNumber } = this.props;
      this.blocksFetcherSubscription = this.blocksFetcher.subscribe(this.updateBlocks);
      if (currentBlockNumber === headBlockNumber) {
        this.blocksFetcher.fetchNext();
      }
    }

    componentWillUnmount() {
      this.blocksFetcherSubscription.unsubscribe();
    }

    /**
     * Initiate loading of next transactions
     */
    loadNext = () => {
      if (this.blocksFetcher.hasNext()) {
        this.setState({
          inProgress: true,
        });
        this.blocksFetcher.fetchNext();
      }
    };

    updateBlocks = (nextBlocks) => {
      this.props.setBlocks(nextBlocks);
      this.setState({
        inProgress: false,
      });
    };

    render() {
      const { inProgress, blocks } = this.state;

      return (
        <WrappedWithInfiniteScroll
          {...this.props}
          inProgress={inProgress}
          loadNext={this.loadNext}
          blocks={blocks}
        />
      );
    }
  }

  const mapStateToProps = ({ blocks }) => ({
    currentBlockNumber: blocks.currentBlockNumber,
    headBlockNumber: blocks.headBlockNumber,
  });

  const mapDispatchToProps = dispatch => ({
    setBlocks: compose(dispatch, setBlocks),
    setCurrentBlockNumberAction: compose(dispatch, setCurrentBlockNumber),
  });

  return connect(mapStateToProps, mapDispatchToProps)(BlocksInfiniteLoad);
};
