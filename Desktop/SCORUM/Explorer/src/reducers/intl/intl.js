import { handleActions } from 'redux-actions';
import { lang2LocaleMapping } from 'theme/helpers/localization';
import changeLocale from '../../actions/intl';
import initialState from './initial-state';

export default handleActions(
  {
    [changeLocale]: (state, { payload: { locale, messages } }) => ({
      ...state,
      locale,
      localeFull: lang2LocaleMapping[locale],
      messages,
    }),
  },
  initialState
);
