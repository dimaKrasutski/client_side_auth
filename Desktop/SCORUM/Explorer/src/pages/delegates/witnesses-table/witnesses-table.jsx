import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Table from 'reactstrap/lib/Table';
import { Witness } from './witness/witness';
import { PreloaderWitnesses } from './preloader/preloader-witnesses';
import './witnesses-table.scss';

const WITNESSES_COUNT = 21;

export const WitnessesTable = ({ witnesses, isCandidates }) => {
  const startIndex = isCandidates ? WITNESSES_COUNT + 1 : 1;
  return (
    <Table className="mt-4 mb-6 delegates-table">
      <thead className="thead-light">
        <tr>
          <th className="position-column">
            <FormattedMessage id="explorer.delegates.table.pos" />
          </th>
          <th>
            <FormattedMessage id="explorer.delegates.table.delegator-name" />
          </th>
          <th className="text-right">
            <FormattedMessage id="explorer.delegates.table.votes" />
          </th>
        </tr>
      </thead>
      <tbody>
        {
          !witnesses.length ?
            <PreloaderWitnesses /> :
            witnesses.map((witness, index) => (<Witness
              key={witness.owner}
              index={startIndex + index}
              witness={witness}
            />))
        }
      </tbody>
    </Table>
  );
};

WitnessesTable.propTypes = {
  witnesses: PropTypes.arrayOf(
    PropTypes.shape({
      owner: PropTypes.string.isRequired,
      votes: PropTypes.string.isRequired,
    }),
  ).isRequired,
  isCandidates: PropTypes.bool,
};

WitnessesTable.defaultProps = {
  isCandidates: false,
};
