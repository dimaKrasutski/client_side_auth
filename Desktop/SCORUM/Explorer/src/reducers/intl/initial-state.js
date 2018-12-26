import store from 'store';
import { locale2LangMapping } from 'theme/helpers/localization';
import { getLangMessages } from '../../helpers/lang-messages';
import { LOCALE, DEFAULT_LOCALE, DEFAULT_LANG } from '../../constants';

const localeFull = store.get(LOCALE) || DEFAULT_LOCALE;
const locale = locale2LangMapping[localeFull];
const initialState = {
  locale,
  localeFull,
  messages: getLangMessages(locale || DEFAULT_LANG),
};

export default initialState;
