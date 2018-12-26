import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import { IconTransactionsEmpty } from 'theme/components/icons/icon-transactions-empty/icon-transactions-empty';

export const TransactionsEmpty = ({ titleId, subtitleId, values }) => (
  <div className="text-center pt-3_5 pt-sm-8_5 text-gray-dark-secondary">
    <IconTransactionsEmpty />
    <h4 className="mt-0_5 mb-0">
      <FormattedMessage id={titleId} />
    </h4>
    {
      subtitleId &&
      <FormattedHTMLMessage id={subtitleId} values={values} />
    }
  </div>
);

TransactionsEmpty.propTypes = {
  titleId: PropTypes.string,
  subtitleId: PropTypes.string,
  values: PropTypes.shape().isRequired,
};

TransactionsEmpty.defaultProps = {
  titleId: 'explorer.account-info.transactions.empty.title',
  subtitleId: 'explorer.account-info.transactions.empty.subtitle',
};
