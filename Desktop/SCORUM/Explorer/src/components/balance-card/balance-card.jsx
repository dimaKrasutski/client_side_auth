import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Input from 'reactstrap/lib/Input';

export const BalanceCard = ({ classNames, innerClassName, children }) => (
  <div className={classNames}>
    <Input tag="div" type="textarea" className={classnames(innerClassName, 'plain-textarea')} plaintext bsSize="lg">
      {children}
    </Input>
  </div>
);

BalanceCard.propTypes = {
  classNames: PropTypes.string,
  innerClassName: PropTypes.string,
  children: PropTypes.node.isRequired,
};

BalanceCard.defaultProps = {
  classNames: null,
  innerClassName: null,
};
