import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { toStandardFormat } from '../../../helpers/date';
import { LOCALE_KEYS } from '../../../constants';
import { openModal } from '../../../actions/modals';
import { ModalWindow } from '../../../components/modal-window/modal-window';

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

  openDetailsModalHandler = () => {
    const { trx_id: trxId } = this.props.transaction;
    this.props.openDetailsModal(`main${trxId}`);
  };

  render() {
    const {
      timestamp,
      trx_id: trxId,
      op: [
        type,
      ],
    } = this.props.transaction;

    return (
      <Fragment>
        <tr className="transactions" onClick={this.openDetailsModalHandler}>
          <td>
            {trxId}
          </td>
          <td>
            <div className="date">{toStandardFormat(timestamp, LOCALE_KEYS.RU_RU)}</div>
          </td>
          <td className="font-weight-bold text-capitalize">
            {type.toString().replace(/_/g, ' ')}
          </td>
        </tr>
        <ModalWindow
          id={`main${trxId}`}
          bodyClassName="transaction-details"
          size="lg"
        >
          <h2 className="mb-3">
            <FormattedMessage id="explorer.tr-details.title" />
          </h2>
          <div><pre>{JSON.stringify(this.props.transaction, null, 2) }</pre></div>
        </ModalWindow>
      </Fragment>
    );
  }
}

export const mapDispatchToProps = dispatch => ({
  openDetailsModal: id => dispatch(openModal(id)),
});

export const Transaction = connect(null, mapDispatchToProps)(TransactionUI);
