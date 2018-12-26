import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { InfoTable } from '../../../components/info-table/info-table';

export const BlockDetails = ({ height, hash, date }) => (
  <InfoTable>
    <tr>
      <td>
        <FormattedMessage id="explorer.block-info.details.height" />
      </td>
      <td>{height}</td>
    </tr>
    <tr>
      <td>
        <FormattedMessage id="explorer.block-info.details.date" />
      </td>
      <td>{date}</td>
    </tr>
    <tr>
      <td>
        <FormattedMessage id="explorer.block-info.details.hash" />
      </td>
      <td>{hash}</td>
    </tr>
  </InfoTable>
);

BlockDetails.propTypes = {
  height: PropTypes.string.isRequired,
  hash: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
};
