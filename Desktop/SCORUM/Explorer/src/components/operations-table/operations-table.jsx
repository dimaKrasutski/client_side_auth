import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Table from 'reactstrap/lib/Table';
import { Operation } from './operation/operation';
import { PreloaderOperations } from '../preloader/preloader-operations';

export const OperationsTableUI = ({
  operations,
  blockReady,
  locale,
  inProgress,
}) => (
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
          const [opHash, opObj] = operation;
          return <Operation key={operation.trx_id} locale={locale} hash={opHash} operation={opObj} />;
        })
      }
      {
        inProgress && <PreloaderOperations />
      }
    </tbody>
  </Table>
);

OperationsTableUI.propTypes = {
  locale: PropTypes.string.isRequired,
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

export const mapStateToProps = ({ intl }) => ({
  locale: intl.localeFull,
});

export const OperationsTable = connect(mapStateToProps)(OperationsTableUI);
