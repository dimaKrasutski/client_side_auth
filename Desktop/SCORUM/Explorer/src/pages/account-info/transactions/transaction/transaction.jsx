import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Table from 'reactstrap/lib/Table';
import { IconOutcome } from 'theme/components/icons/icon-income/icon-outcome';
import { IconIncome } from 'theme/components/icons/icon-income/icon-income';
import { toStandardFormat } from '../../../../helpers/date';
import { formatBalanceWithLocale } from '../../../../helpers/accounts';
import { LOCALE_KEYS } from '../../../../constants';
import { openModal } from '../../../../actions/modals';
import { ModalWindow } from '../../../../components/modal-window/modal-window';
import { RouteLink } from '../../../../components/route-link/route-link';
import './transaction.scss';

class TransactionUI extends Component {
  static propTypes = {
    openDetailsModal: PropTypes.func.isRequired,
    locale: PropTypes.string.isRequired,
    userName: PropTypes.string.isRequired,
    transaction: PropTypes.shape({
      timestamp: PropTypes.string.isRequired,
      trx_id: PropTypes.string.isRequired,
      block: PropTypes.number.isRequired,
      op: PropTypes.shape({
        amount: PropTypes.string.isRequired,
        from: PropTypes.string.isRequired,
        to: PropTypes.string.isRequired,
        memo: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  };

  openDetailsModalHandler = (e) => {
    if (e.target.tagName !== 'A') {
      this.props.openDetailsModal(this.props.transaction.trx_id);
    }
  };

  render() {
    const {
      locale,
      transaction,
      userName,
    } = this.props;

    const formatWithLocale = formatBalanceWithLocale(locale);
    const {
      timestamp,
      trx_id: trxId,
      block,
      op: {
        amount,
        from,
        to,
        memo,
      },
    } = transaction;
    const income = to === userName;
    const showedUserName = income ? from : to;

    return (
      <Fragment>
        <tr className="transactions" onClick={this.openDetailsModalHandler}>
          <td>
            <span>{trxId}</span>
          </td>
          <td>
            {income ? <IconIncome className="mr-1_5" /> : <IconOutcome className="mr-1_5" />}
            <RouteLink to={`/account-info/${showedUserName}`}>
              {showedUserName}
            </RouteLink>
          </td>
          <td>
            {toStandardFormat(timestamp, locale)}
          </td>
          <td className="digit-value amount">
            {income ? '+' : '-'} {formatWithLocale(amount)} SCR
          </td>
        </tr>
        <ModalWindow
          id={trxId}
          bodyClassName="transaction-details"
          size="lg"
        >
          <h2 className="mb-3">
            <FormattedMessage id="explorer.tr-details.title" />
          </h2>
          <Table>
            <tbody>
              <tr>
                <td><FormattedMessage id="explorer.tr-details.date" /></td>
                <td>{toStandardFormat(timestamp, LOCALE_KEYS.RU_RU)}</td>
              </tr>
              <tr>
                <td><FormattedMessage id="explorer.tr-details.amount" /></td>
                <td>{amount}</td>
              </tr>
              <tr>
                <td><FormattedMessage id="explorer.tr-details.hash" /></td>
                <td>{trxId}</td>
              </tr>
              <tr>
                <td><FormattedMessage id="explorer.tr-details.to" /></td>
                <td>{to}</td>
              </tr>
              <tr>
                <td><FormattedMessage id="explorer.tr-details.memo" /></td>
                <td>{memo}</td>
              </tr>
              <tr>
                <td><FormattedMessage id="explorer.tr-details.from" /></td>
                <td>{from}</td>
              </tr>
              <tr>
                <td><FormattedMessage id="explorer.tr-details.block" /></td>
                <td>{block}</td>
              </tr>
            </tbody>
          </Table>
        </ModalWindow>
      </Fragment>
    );
  }
}

export const mapDispatchToProps = dispatch => ({
  openDetailsModal: id => dispatch(openModal(id)),
});

export const Transaction = connect(null, mapDispatchToProps)(TransactionUI);
