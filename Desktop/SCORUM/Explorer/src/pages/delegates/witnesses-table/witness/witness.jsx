import React from 'react';
import PropTypes from 'prop-types';
import { RouteLink } from '../../../../components/route-link/route-link';

export const Witness = ({ witness: { owner, votes }, index }) => (
  <tr className="witness">
    <td>
      {index}
    </td>
    <td>
      <RouteLink to={`/account-info/${owner}`}>
        {owner}
      </RouteLink>
    </td>
    <td className="digit-value">
      {votes}
    </td>
  </tr>
);

Witness.propTypes = {
  witness: PropTypes.shape({
    owner: PropTypes.string.isRequired,
    votes: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};
