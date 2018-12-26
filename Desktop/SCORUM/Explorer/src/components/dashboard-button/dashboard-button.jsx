import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Button from 'reactstrap/lib/Button';

export const DashboardButton = ({ text, onClick }) => (
  <Button outline size="xs" className="float-right mt-0_5" onClick={onClick}>
    <FormattedMessage id={text} />
  </Button>
);

DashboardButton.propTypes = {
  text: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

DashboardButton.defaultProps = {
  onClick: null,
};
