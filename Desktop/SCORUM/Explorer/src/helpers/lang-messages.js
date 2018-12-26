import intlMessagesEN from '../translations/en.yaml';
import intlMessagesZH from '../translations/zh.yaml';
import intlMessagesRU from '../translations/ru.yaml';
import intlMessagesKO from '../translations/ko.yaml';

export const getLangMessages = (lang) => {
  const msg = {
    en: intlMessagesEN,
    zh: intlMessagesZH,
    ru: intlMessagesRU,
    ko: intlMessagesKO,
  };
  return msg[lang];
};
