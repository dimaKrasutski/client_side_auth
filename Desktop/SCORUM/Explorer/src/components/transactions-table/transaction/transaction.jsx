import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Table from 'reactstrap/lib/Table';
import { IconPaymentConvertArrow } from 'theme/components/icons/icon-payment/icon-payment-convert-arrow';
import { RouteLink } from '../../../components/route-link/route-link';
import { formatBalanceWithLocale } from '../../../helpers/accounts';
import { openModal } from '../../../actions/modals';
import { ModalWindow } from '../../modal-window/modal-window';

class TransactionUI extends Component {
  static propTypes = {
    openDetailsModal: PropTypes.func.isRequired,
    locale: PropTypes.string.isRequired,
    hash: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    height: PropTypes.number.isRequired,
    transaction: PropTypes.shape({
      timestamp: PropTypes.string.isRequired,
      block_id: PropTypes.string.isRequired,
      transactions: PropTypes.shape({
        amount: PropTypes.string.isRequired,
        from: PropTypes.string.isRequired,
        to: PropTypes.string.isRequired,
        memo: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  };

  openDetailsModalHandler = (e) => {
    if (e.target.tagName !== 'A') {
      this.props.openDetailsModal(this.props.hash);
    }
  };

  render() {
    const {
      locale,
      transaction,
      hash,
      height,
      date,
    } = this.props;

    const formatWithLocale = formatBalanceWithLocale(locale);
    const {
      // TODO: remove
      operations: [[, {
        amount,
        from,
        to,
        memo,
      }]],
    } = transaction;

    return (
      <Fragment>
        <tr className="transactions" onClick={this.openDetailsModalHandler}>
          <td>
            {hash}
          </td>
          <td>
            <RouteLink to={`/account-info/${from}`} locale={locale}>
              {from}
            </RouteLink>
          </td>
          <td>
            <IconPaymentConvertArrow />
          </td>
          <td>
            <RouteLink to={`/account-info/${from}`} locale={locale}>
              {to}
            </RouteLink>
          </td>
          <td>
            <div className="date">{date}</div>
          </td>
          <td className="digit-value amount">
            {formatWithLocale(amount)}
          </td>
        </tr>
        <ModalWindow
          id={hash}
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
                <td>{date}</td>
              </tr>
              <tr>
                <td><FormattedMessage id="explorer.tr-details.amount" /></td>
                <td>{amount}</td>
              </tr>
              <tr>
                <td><FormattedMessage id="explorer.tr-details.hash" /></td>
                <td>{hash}</td>
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
                <td>{height}</td>
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
