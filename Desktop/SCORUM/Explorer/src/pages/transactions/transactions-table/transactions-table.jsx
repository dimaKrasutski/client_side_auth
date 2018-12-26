import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Table from 'reactstrap/lib/Table';
import { Transaction } from './transaction/transaction';
import { PreloaderTransactions } from './preloader-transactions';

export const TransactionsTable = ({ transactions, blockReady, inProgress }) => (
  <Table className="mt-3 transactions-table">
    <thead className="thead-light">
      <tr>
        <th>
          <FormattedMessage id="explorer.block-info.transactions.hash" />
        </th>
        <th>
          <FormattedMessage id="explorer.block-info.transactions.from" />
        </th>
        <th />
        <th>
          <FormattedMessage id="explorer.block-info.transactions.to" />
        </th>
        <th>
          <FormattedMessage id="explorer.block-info.transactions.date" />
        </th>
        <th className="text-right">
          <FormattedMessage id="explorer.block-info.transactions.amount" />
        </th>
      </tr>
    </thead>
    <tbody>
      {!transactions.length && !blockReady ?
        <PreloaderTransactions /> :
        transactions.map((transaction) => {
          const [, trxObj] = transaction;
          return <Transaction key={trxObj.trx_id} transaction={trxObj} />;
        })
      }
      { inProgress && <PreloaderTransactions /> }
    </tbody>
  </Table>
);

TransactionsTable.propTypes = {
  blockReady: PropTypes.bool.isRequired,
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      timestamp: PropTypes.string.isRequired,
      block_id: PropTypes.string.isRequired,
      height: PropTypes.number.isRequired,
      transactions: PropTypes.array.isRequired,
    }),
  ).isRequired,
  inProgress: PropTypes.bool.isRequired,
};
