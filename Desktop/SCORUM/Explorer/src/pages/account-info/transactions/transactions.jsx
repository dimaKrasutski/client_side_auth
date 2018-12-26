import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Table from 'reactstrap/lib/Table';
import { Transaction } from './transaction/transaction';
import { PreloaderTransactions } from './preloader/preloader-transactions';

import './transactions.scss';

export const TransactionsUI = ({
  transactions, inProgress, locale, userName,
}) => (
  <Table className="mt-3 transactions-table">
    <thead className="thead-light">
      <tr>
        <th className="fixed-column">
          <FormattedMessage id="explorer.account-info.transactions.hash" />
        </th>
        <th>
          <FormattedMessage id="explorer.account-info.transactions.who" />
        </th>
        <th>
          <FormattedMessage id="explorer.account-info.transactions.date" />
        </th>
        <th className="text-right">
          <FormattedMessage id="explorer.account-info.transactions.amount" />
        </th>
      </tr>
    </thead>
    <tbody>
      {transactions === null ?
        <PreloaderTransactions /> :
        transactions.map(transaction => (
          <Transaction key={transaction.index} locale={locale} transaction={transaction} userName={userName} />
        ))
      }
      {inProgress && <PreloaderTransactions />}
    </tbody>
  </Table>
);

TransactionsUI.propTypes = {
  userName: PropTypes.string.isRequired,
  locale: PropTypes.string.isRequired,
  transactions: PropTypes.arrayOf(PropTypes.shape()),
  inProgress: PropTypes.bool.isRequired,
};

TransactionsUI.defaultProps = {
  transactions: null,
};

export const mapStateToProps = ({ intl }) => ({
  locale: intl.localeFull,
});

export const Transactions = connect(mapStateToProps)(TransactionsUI);
