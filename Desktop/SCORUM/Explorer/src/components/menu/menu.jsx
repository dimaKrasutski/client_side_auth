import React from 'react';
import { FormattedMessage } from 'react-intl';
import { RouteLink } from '../../components/route-link/route-link';
import './menu.scss';

export const Menu = () => (
  <div className="header-menu font-weight-bold text-small text-uppercase d-inline-block">
    <RouteLink to="/" className="mr-3_5 ml-5">
      <FormattedMessage id="explorer.menu.dashboard" />
    </RouteLink>
    <RouteLink to="/blocks" className="mr-3_5">
      <FormattedMessage id="explorer.menu.blocks" />
    </RouteLink>
    <RouteLink to="/transactions" className="mr-3_5">
      <FormattedMessage id="explorer.menu.transactions" />
    </RouteLink>
    <RouteLink to="/delegates">
      <FormattedMessage id="explorer.menu.delegates" />
    </RouteLink>
  </div>
);
