import React from 'react';
import { connect } from 'react-redux';
import { ChangeRoute as ChangeRouteUI } from 'theme/components/change-route/change-route';

const mapStateToProps = state => ({
  locale: state.intl.localeFull,
});

export const ChangeRoute = connect(mapStateToProps)(ChangeRouteUI);

ChangeRoute.to = to => () => <ChangeRoute to={to} />;
