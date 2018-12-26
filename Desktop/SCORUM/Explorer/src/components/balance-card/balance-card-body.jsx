import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { formatBalanceWithLocale, getBalanceConverter } from '../../helpers/accounts';
import { currencyPropTypes } from '../../helpers/prop-types/currency';

export const BalanceCardBody = ({
  icon, title, balance, locale, currency,
}) => {
  const rate = 1;
  const formatBalanceLocale = formatBalanceWithLocale(locale);
  const convertToCurrency = getBalanceConverter(rate);
  return (
    <Fragment>
      <span className="d-flex align-items-center pb-1_5">
        {icon}
        <span className="ml-1 font-weight-normal">
          <FormattedMessage id={title} />
        </span>
      </span>
      <div>
        <h2 className="mb-0 h2">
          {balance ?
            formatBalanceLocale(balance) :
            <div className="preloader mt-1_5 mb-2 preloader-lg" />
          }
        </h2>
        <h4 className="text-gray-dark-hint">
          {balance && rate ?
            `${formatBalanceLocale(convertToCurrency(balance))} ${currency}` :
            <div className="preloader mb-1_5" />
          }
        </h4>
      </div>
    </Fragment>
  );
};

BalanceCardBody.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  balance: PropTypes.number,
  currency: currencyPropTypes.isRequired,
  locale: PropTypes.string.isRequired,
};

BalanceCardBody.defaultProps = {
  balance: null,
};
