import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Table from 'reactstrap/lib/Table';
import { IconPaymentConvertArrow } from 'theme/components/icons/icon-payment/icon-payment-convert-arrow';
import { RouteLink } from '../../../../components/route-link/route-link';
import { toStandardFormat } from '../../../../helpers/date';
import { LOCALE_KEYS } from '../../../../constants';
import { openModal } from '../../../../actions/modals';
import { ModalWindow } from '../../../../components/modal-window/modal-window';
import './transaction.scss';

class TransactionUI extends Component {
  static propTypes = {
    openDetailsModal: PropTypes.func.isRequired,
    transaction: PropTypes.shape({
      timestamp: PropTypes.string.isRequired,
      block: PropTypes.number.isRequired,
      trx_id: PropTypes.string.isRequired,
      op: PropTypes.arrayOf(
        PropTypes.oneOfType(
          [
            PropTypes.string,
            PropTypes.shape({
              amount: PropTypes.string.isRequired,
              from: PropTypes.string.isRequired,
              to: PropTypes.string.isRequired,
              memo: PropTypes.string.isRequired,
            }),
          ]
        )
      ),
    }).isRequired,
  };

  openDetailsModalHandler = (e) => {
    if (e.target.tagName !== 'A') {
      this.props.openDetailsModal(this.props.transaction.trx_id);
    }
  };

  render() {
    const {
      timestamp,
      block,
      trx_id: trxId,
      // TODO: remove
      op: [, {
        amount,
        from,
        to,
        memo,
      }],
    } = this.props.transaction;

    return (
      <Fragment>
        <tr className="transactions" onClick={this.openDetailsModalHandler}>
          <td className="td-overflow">
            {trxId}
          </td>
          <td className="user-link">
            <RouteLink to={`/account-info/${from}`}>
              {from}
            </RouteLink>
          </td>
          <td>
            <IconPaymentConvertArrow />
          </td>
          <td className="user-link">
            <RouteLink to={`/account-info/${to}`}>
              {to}
            </RouteLink>
          </td>
          <td>
            <div className="date">{toStandardFormat(timestamp, LOCALE_KEYS.RU_RU)}</div>
          </td>
          <td className="digit-value amount">
            {amount}
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
