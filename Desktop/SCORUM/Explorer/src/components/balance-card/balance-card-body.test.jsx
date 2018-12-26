import React from 'react';
import { BalanceCardBody } from './balance-card-body';
import { DEFAULT_LOCALE, CURRENCY_EUR, CURRENCY_USD } from '../../constants';

const trades = {
  [CURRENCY_EUR]: '1.24',
  [CURRENCY_USD]: '1.02',
};

describe('<BalanceCardBody />', () => {
  test('should match snapshot', () => {
    const wrapper = shallow(<BalanceCardBody balance="1250000.200 SCR" currency={CURRENCY_USD} trades={trades} locale={DEFAULT_LOCALE} title="test" icon={<span>Im icon</span>} />);
    expect(wrapper).toMatchSnapshot();
  });

  describe('when no balance', () => {
    test('should match snapshot', () => {
      const wrapper = shallow(<BalanceCardBody locale={DEFAULT_LOCALE} currency={CURRENCY_USD} trades={trades} title="test" icon={<span>Im icon</span>} />);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('when no trades', () => {
    test('should match snapshot', () => {
      const wrapper = shallow(<BalanceCardBody locale={DEFAULT_LOCALE} currency={CURRENCY_USD} title="test" icon={<span>Im icon</span>} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
