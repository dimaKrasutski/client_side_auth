import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

export const PageTitle = ({ title, secondaryTitle }) => (
  <h1 className="mb-6">
    <FormattedMessage id={title} />
    {
      secondaryTitle &&
      <span className="text-gray-dark-secondary ml-2">
        <FormattedMessage id={secondaryTitle} />
      </span>
    }
  </h1>
);

PageTitle.propTypes = {
  title: PropTypes.string.isRequired,
  secondaryTitle: PropTypes.string,
};

PageTitle.defaultProps = {
  secondaryTitle: '',
};
