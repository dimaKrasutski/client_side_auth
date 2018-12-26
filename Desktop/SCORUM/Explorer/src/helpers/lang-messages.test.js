import { getLangMessages } from './lang-messages';

describe('', () => {
  test('getLangMessages', () => {
    expect(getLangMessages('en')).toMatchSnapshot();
  });
});
