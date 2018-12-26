import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { filter } from 'rxjs/operators/filter';
import { map } from 'rxjs/operators/map';
import { debounceTime } from 'rxjs/operators/debounceTime';

/**
 * Using that to ensure user hits the end of document
 */
const SAFE_TRIGGER_OFFSET = 120;

const INFINITE_SCROLL_DEBOUNCE = 25;

/**
 * Having current inner height of browser window and YOffset (scrolled height from top), check if we hit end of document
 */
const isEndOfDocument = () =>
  (window.innerHeight + window.pageYOffset) >= (document.body.offsetHeight - SAFE_TRIGGER_OFFSET);

export const withInfiniteScroll = WrappedComponent =>
  class WithInfiniteScroll extends Component {
    static propTypes = {
      loadNext: PropTypes.func.isRequired,
    };

    scrollSubscription;
    scroll$ = fromEvent(window, 'scroll').pipe(
      debounceTime(INFINITE_SCROLL_DEBOUNCE),
      filter(isEndOfDocument),
      map(() => window.pageYOffset)
    );

    componentDidMount() {
      const { loadNext } = this.props;
      this.scrollSubscription = this.scroll$.subscribe(loadNext);
    }

    componentWillUnmount() {
      this.scrollSubscription.unsubscribe();
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
