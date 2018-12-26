import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Table from 'reactstrap/lib/Table';
import { Transaction } from './transaction/transaction';
import { PreloaderBlocks } from '../preloader/preloader-blocks';

export const TransactionsTableUI = ({
  transactions,
  blockReady,
  locale,
  height,
  date,
}) => (
  <Table className="mt-3 blocks-table">
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
        <PreloaderBlocks /> :
        transactions.map((transaction) => {
          const [trxHash, trxObj] = transaction;
          return (<Transaction
            key={transaction.trx_id}
            locale={locale}
            hash={trxHash}
            transaction={trxObj}
            height={height}
            date={date}
          />);
        })
      }
    </tbody>
  </Table>
);

TransactionsTableUI.propTypes = {
  locale: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  blockReady: PropTypes.bool.isRequired,
  height: PropTypes.number.isRequired,
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      timestamp: PropTypes.string.isRequired,
      block_id: PropTypes.string.isRequired,
      height: PropTypes.number.isRequired,
      transactions: PropTypes.array.isRequired,
    }),
  ).isRequired,
};

export const mapStateToProps = ({ intl }) => ({
  locale: intl.localeFull,
});

export const TransactionsTable = connect(mapStateToProps)(TransactionsTableUI);
