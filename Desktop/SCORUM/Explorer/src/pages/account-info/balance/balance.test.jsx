import React from 'react';
import { BalanceUI, mapStateToProps } from './balance';
import { DEFAULT_LOCALE, CURRENCY_USD } from '../../../constants';

describe('<Balance />', () => {
  describe('<BalanceUI />', () => {
    test('should match snapshot', () => {
      const wrapper = shallow((
        <BalanceUI
          balance={100}
          scorumpower={100}
          trades={1}
          currency={CURRENCY_USD}
          locale={DEFAULT_LOCALE}
        />
      ));
      expect(wrapper).toMatchSnapshot();
    });

    test('should match snapshot no balance', () => {
      const wrapper = shallow(<BalanceUI locale={DEFAULT_LOCALE} currency={CURRENCY_USD} className="some-test" />);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('mapStateToProps', () => {
    const state = {
      accountInfo: {
        account: {
          balance: 100,
          scorumpower: 100,
        },
      },
      intl: {
        locale: 'en',
      },
    };

    test('should get accountInfo', () => {
      expect(mapStateToProps(state).account.balance).toEqual(state.accountInfo.account.balance);
    });

    test('should get balanceInfo', () => {
      expect(mapStateToProps(state).account.scorumpower).toEqual(state.accountInfo.account.scorumpower);
    });
  });
});
