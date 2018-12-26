import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GA from '../helpers/ga';

const withTracker = (WrappedComponent) => {
  const HOC = class extends Component {
    static propTypes = {
      location: PropTypes.shape({
        pathname: PropTypes.string.isRequired,
      }),
    };

    static defaultProps = {
      location: {},
    };

    componentDidMount() {
      const page = this.props.location.pathname;
      GA.trackPage(page);
    }

    componentWillReceiveProps(nextProps) {
      const currentPage = this.props.location.pathname;
      const nextPage = nextProps.location.pathname;

      if (currentPage !== nextPage) {
        GA.trackPage(nextPage);
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

  return HOC;
};

export default withTracker;
