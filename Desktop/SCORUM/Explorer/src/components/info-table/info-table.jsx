import React from 'react';
import PropTypes from 'prop-types';
import Table from 'reactstrap/lib/Table';
import './info-table.scss';

export const InfoTable = ({ children }) => (
  <Table className="info-table">
    <tbody>
      {children}
    </tbody>
  </Table>
);

InfoTable.propTypes = {
  children: PropTypes.node.isRequired,
};
