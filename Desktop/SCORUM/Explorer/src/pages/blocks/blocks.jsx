import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { Main } from '../main';
import { BlockTable } from './blocks-table/blocks-table';
import { PageTitle } from '../../components/page-title/page-title';
import { withBlocksInfiniteLoad } from './blocks-infinite-load-hoc';

const BlocksWithInfiniteLoad = withBlocksInfiniteLoad(BlockTable, null);

export const BlocksUI = ({ currentBlockNumber }) => (
  <Main>
    <Container className="pt-6 blocks-container">
      <Row>
        <Col xs="12">
          <PageTitle title="explorer.blocks.title" />
          {
            !!currentBlockNumber &&
            <BlocksWithInfiniteLoad />
          }
        </Col>
      </Row>
    </Container>
  </Main>
);

BlocksUI.propTypes = {
  currentBlockNumber: PropTypes.number.isRequired,
};

const mapStateToProps = ({ blocks }) => ({
  currentBlockNumber: blocks.currentBlockNumber,
});

export const Blocks = connect(mapStateToProps)(BlocksUI);
