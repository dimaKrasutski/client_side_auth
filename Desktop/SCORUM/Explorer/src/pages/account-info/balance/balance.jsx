import React from 'react';
import { pick } from 'ramda';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';
import { IconScr } from 'theme/components/icons/icon-scr/icon-scr';
import { IconSp } from 'theme/components/icons/icon-sp/icon-sp';
import { BalanceCard } from '../../../components/balance-card/balance-card';
import { BalanceCardBody } from '../../../components/balance-card/balance-card-body';
import './balance.scss';

export const BalanceUI = ({
  account, locale, className,
}) => {
  const currency = 'USD';
  const { balance, scorumpower } = pick(['balance', 'scorumpower'], account);

  return (
    <div className={classNames('balance-wrapper', className)}>
      <div className="balance">
        <Row className="no-gutters mb-1_5">
          <Col xs="6">
            <BalanceCard classNames="card-left">
              <BalanceCardBody
                title="explorer.account-info.balanse-card.title-scr"
                icon={<IconScr />}
                balance={balance}
                trades={1}
                currency={currency}
                locale={locale}
              />
            </BalanceCard>
          </Col>
          <Col xs="6">
            <BalanceCard classNames="card-right">
              <BalanceCardBody
                title="explorer.account-info.balanse-card.title-sp"
                icon={<IconSp />}
                balance={scorumpower}
                trades={1}
                currency={currency}
                locale={locale}
              />
            </BalanceCard>
          </Col>
        </Row>
      </div>
    </div>
  );
};

BalanceUI.propTypes = {
  locale: PropTypes.string.isRequired,
  account: PropTypes.objectOf(PropTypes.string),
  className: PropTypes.string,
};

BalanceUI.defaultProps = {
  account: {},
  className: null,
};

export const mapStateToProps = ({ accountInfo, intl }) => ({
  account: accountInfo.account,
  locale: intl.localeFull,
});

export const Balance = connect(mapStateToProps)(BalanceUI);
