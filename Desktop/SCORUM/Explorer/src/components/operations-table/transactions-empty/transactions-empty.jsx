import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl';
import { IconTransactionsEmpty } from 'theme/components/icons/icon-transactions-empty/icon-transactions-empty';

export const TransactionsEmpty = ({ titleId, subtitleId }) => (
  <div className="text-center pt-3_5 pt-sm-8_5 text-gray-dark-secondary">
    <IconTransactionsEmpty />
    <h4 className="mt-0_5 mb-0">
      <FormattedMessage id={titleId} />
    </h4>
    <FormattedHTMLMessage id={subtitleId} />
  </div>
);

TransactionsEmpty.propTypes = {
  titleId: PropTypes.string,
  subtitleId: PropTypes.string,
};

TransactionsEmpty.defaultProps = {
  titleId: 'explorer.transactions.empty.title',
  subtitleId: 'explorer.transactions.empty.subtitle',
};
