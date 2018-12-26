import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { toStandardFormat } from '../../../helpers/date';
import { LOCALE_KEYS } from '../../../constants';
import { openModal } from '../../../actions/modals';
import { ModalWindow } from '../../../components/modal-window/modal-window';

class OperationUI extends Component {
  static propTypes = {
    openDetailsModal: PropTypes.func.isRequired,
    hash: PropTypes.string.isRequired,
    operation: PropTypes.shape({
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
    const { hash } = this.props;
    this.props.openDetailsModal(`all${hash}`);
  };

  render() {
    const { hash, operation } = this.props;
    const {
      expiration,
      operations: [
        [
          type,
        ],
      ],
    } = operation;

    return (
      <Fragment>
        <tr className="transactions" onClick={this.openDetailsModalHandler}>
          <td>
            {hash}
          </td>
          <td>
            <div className="date">{toStandardFormat(expiration, LOCALE_KEYS.RU_RU)}</div>
          </td>
          <td className="font-weight-bold text-capitalize">
            {type.toString().replace(/_/g, ' ')}
          </td>
        </tr>
        <ModalWindow
          id={`all${hash}`}
          bodyClassName="transaction-details"
          size="lg"
        >
          <h2 className="mb-3">
            <FormattedMessage id="explorer.tr-details.title" />
          </h2>
          <div><pre>{JSON.stringify(operation, null, 2) }</pre></div>
        </ModalWindow>
      </Fragment>
    );
  }
}

export const mapDispatchToProps = dispatch => ({
  openDetailsModal: id => dispatch(openModal(id)),
});

export const Operation = connect(null, mapDispatchToProps)(OperationUI);
