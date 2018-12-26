import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { wrapRoute2Locale } from 'theme/helpers/localization';
import { toStandardFormat } from '../../../../helpers/date';
import './block.scss';

export class BlockUI extends Component {
  static propTypes = {
    history: PropTypes.shape().isRequired,
    locale: PropTypes.string.isRequired,
    block: PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.shape({
          timestamp: PropTypes.string.isRequired,
          block_id: PropTypes.string.isRequired,
        }),
      ])
    ).isRequired,
  };

  openBlockDetailsPage = () => {
    const { locale, history, block } = this.props;
    const [height] = block;
    history.push(wrapRoute2Locale(`/block-info/${height}`, locale));
  };

  render() {
    const { locale, block } = this.props;

    // TODO: rewrite
    const [height, blockData] = block;

    const {
      timestamp,
      block_id: blockId,
      transactions,
    } = blockData;

    return (
      <tr className="block" onClick={this.openBlockDetailsPage}>
        <td>
          {height}
        </td>
        <td>
          <span>{toStandardFormat(timestamp, locale)}</span>
        </td>
        <td>
          {blockId}
        </td>
        <td className="text-right">
          {transactions.length}
        </td>
      </tr>
    );
  }
}

export const Block = withRouter(BlockUI);
