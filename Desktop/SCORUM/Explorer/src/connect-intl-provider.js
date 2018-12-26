import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';

const mapStateToProps = state => ({
  locale: state.intl.localeFull,
  messages: state.intl.messages,
});

export default connect(mapStateToProps)(IntlProvider);
