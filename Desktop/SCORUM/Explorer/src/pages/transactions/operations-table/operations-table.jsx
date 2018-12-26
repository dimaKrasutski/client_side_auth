import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Table from 'reactstrap/lib/Table';
import { Transaction } from './transaction/transaction';
import { PreloaderOperations } from '../../../components/preloader/preloader-operations';

export const OperationsTable = ({ operations, blockReady, inProgress }) => (
  <Table className="mt-3 blocks-table">
    <thead className="thead-light">
      <tr>
        <th>
          <FormattedMessage id="explorer.block-info.transactions.hash" />
        </th>
        <th>
          <FormattedMessage id="explorer.block-info.transactions.date" />
        </th>
        <th>
          <FormattedMessage id="explorer.block-info.transactions.type" />
        </th>
      </tr>
    </thead>
    <tbody>
      {!operations.length && !blockReady ?
        <PreloaderOperations /> :
        operations.map((operation) => {
          const [, trxObj] = operation;
          return <Transaction key={trxObj.trx_id} transaction={trxObj} />;
        })
      }
      {
        inProgress && <PreloaderOperations />
      }
    </tbody>
  </Table>
);

OperationsTable.propTypes = {
  blockReady: PropTypes.bool.isRequired,
  inProgress: PropTypes.bool.isRequired,
  operations: PropTypes.arrayOf(
    PropTypes.shape({
      timestamp: PropTypes.string.isRequired,
      block_id: PropTypes.string.isRequired,
      height: PropTypes.number.isRequired,
      transactions: PropTypes.array.isRequired,
    }),
  ).isRequired,
};
