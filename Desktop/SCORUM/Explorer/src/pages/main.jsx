import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'ramda';
import { connect } from 'react-redux';
import { ErrorBoundary } from 'theme/components/error-boundary/error-boundary';
import { Header } from 'theme/components/header/header';
import { LogoLink } from 'theme/components/header/logo-link/logo-link';
import { GlobalAlert } from 'theme/components/alerts/global-alert/global-alert';
import { AlertGeneral } from 'theme/components/alerts/alert-general/alert-general';
import { AlertLinks } from 'theme/components/alerts/alert-links/alert-links';
import { IconLogo } from '../components/icons/icon-logo/icon-logo';
import { clearError } from '../actions/system';
import { Menu } from '../components/menu/menu';
import './main.scss';

export const MainUI = ({
  errorMessageId,
  errorLinks,
  children,
  dismissGlobalAlert,
  locale,
}) => (
  <main className="mb-6 ">
    <Header>
      <div>
        <LogoLink to="/" locale={locale}>
          <IconLogo />
        </LogoLink>
        <Menu />
      </div>
    </Header>
    {errorMessageId &&
    <GlobalAlert onDismiss={dismissGlobalAlert}>
      {errorLinks ?
        <AlertLinks
          errorMessageId={errorMessageId}
          errorLinks={errorLinks}
          onClick={dismissGlobalAlert}
          locale={locale}
        /> :
        <AlertGeneral errorMessageId={errorMessageId} />}
    </GlobalAlert>
    }

    <ErrorBoundary onDismissAlert={dismissGlobalAlert}>
      {children}
    </ErrorBoundary>
  </main>
);

MainUI.propTypes = {
  locale: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  dismissGlobalAlert: PropTypes.func.isRequired,
  errorMessageId: PropTypes.string,
  errorLinks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    messageId: PropTypes.string.isRequired,
  })),
};

MainUI.defaultProps = {
  errorMessageId: null,
  errorLinks: null,
};

const mapStateToProps = ({ system, intl }) => ({
  errorMessageId: system.globalError.id,
  errorLinks: system.globalError.links,
  locale: intl.localeFull,
});

const mapDispatchToProps = dispatch => ({
  dismissGlobalAlert: compose(dispatch, clearError),
});

export const Main = connect(mapStateToProps, mapDispatchToProps)(MainUI);
