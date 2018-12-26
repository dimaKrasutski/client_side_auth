import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Table from 'reactstrap/lib/Table';
import { Block } from './block/block';
import { PreloaderBlocks } from '../../../components/preloader/preloader-blocks';

export const BlockTableUI = ({ locale, blocks, inProgress }) => (
  <Table className="mt-3 blocks-table">
    <thead className="thead-light">
      <tr>
        <th>
          <FormattedMessage id="explorer.blocks.table.height" />
        </th>
        <th>
          <FormattedMessage id="explorer.blocks.table.date" />
        </th>
        <th>
          <FormattedMessage id="explorer.blocks.table.hash" />
        </th>
        <th className="text-right">
          <FormattedMessage id="explorer.blocks.table.transactions" />
        </th>
      </tr>
    </thead>
    <tbody>
      {!blocks.length ?
        <PreloaderBlocks /> :
        // TODO: rewrite
        blocks.map(block => <Block key={block[1].block_id} locale={locale} block={block} />)
      }
      {inProgress && <PreloaderBlocks />}
    </tbody>
  </Table>
);

BlockTableUI.propTypes = {
  locale: PropTypes.string.isRequired,
  blocks: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.shape(
          {
            timestamp: PropTypes.string.isRequired,
            block_id: PropTypes.string.isRequired,
            height: PropTypes.number.isRequired,
            transactions: PropTypes.array.isRequired,
          }
        ),
      ])
    )
  ).isRequired,
  inProgress: PropTypes.bool.isRequired,
};

BlockTableUI.defaultProps = {};

export const mapStateToProps = ({ intl, blocks }) => ({
  locale: intl.localeFull,
  blocks: blocks.blocks,
});

export const BlockTable = connect(mapStateToProps)(BlockTableUI);
