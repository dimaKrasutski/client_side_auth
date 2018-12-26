import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import store from 'store';
import { chooseLocale, locale2LangMapping } from 'theme/helpers/localization';
import { renderRoutes, matchRoutes } from 'react-router-config';
import changeLocale from './actions/intl';
import { LOCALE, LOCALES } from './constants';
import { isIOS } from './helpers/ua';
import { initializeConfig } from '../resources/config/config';
import { getLangMessages } from './helpers/lang-messages';

class AppRoot extends PureComponent {
  static propTypes = {
    history: PropTypes.shape().isRequired,
    locale: PropTypes.string.isRequired,
    route: PropTypes.shape().isRequired,
    changeLocale: PropTypes.func,
  };

  static defaultProps = {
    changeLocale: null,
  };

  constructor(props) {
    super(props);
    isIOS() && document.documentElement.classList.add('ios');
    initializeConfig();
  }

  componentWillMount() {
    this.chooseLocaleAndRedirect();
  }

  componentWillUnmount() {
    this.unlisten();
  }

  handleLocale = (locale) => {
    const lang = locale2LangMapping[locale];
    store.set(LOCALE, locale);
    this.props.changeLocale(lang, getLangMessages(lang));
  };

  chooseLocaleAndRedirect = () => {
    const { history, route } = this.props;
    const locale = chooseLocale({
      [LOCALE]: this.props.locale,
    });

    const routes = matchRoutes(route.routes, history.location.pathname);
    const isMatchRoute = routes.length && routes[0].match !== null && routes[0].match.params !== null;
    if (isMatchRoute) {
      if (routes[0].match.params.lang === undefined && routes[0].match.isExact) {
        this.handleLocale(locale);
        history.push(`/${locale}${routes[0].match.url}${history.location.search}`);
      } else if (routes[0].match.params.lang !== undefined && LOCALES.includes(routes[0].match.params.lang)) {
        this.handleLocale(routes[0].match.params.lang);
      } else {
        this.handleLocale(locale);
        history.push(`/${locale}${history.location.search}`);
      }
    } else {
      this.handleLocale(locale);
      history.push(`/${locale}${history.location.search}`);
    }
  };

  render() {
    return (
      <div className={`lang-${locale2LangMapping[this.props.locale]}`}>
        {renderRoutes(this.props.route.routes)}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  locale: state.intl.localeFull,
});

const mapDispatchToProps = dispatch => ({
  changeLocale: (locale, messages) => dispatch(changeLocale({ locale, messages })),
});

export default connect(mapStateToProps, mapDispatchToProps)(AppRoot);
