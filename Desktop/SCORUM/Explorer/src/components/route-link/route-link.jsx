import { connect } from 'react-redux';
import { RouteLink as RouteLinkUI } from 'theme/components/route-link/route-link';

const mapStateToProps = state => ({
  locale: state.intl.localeFull,
});

export const RouteLink = connect(mapStateToProps)(RouteLinkUI);
