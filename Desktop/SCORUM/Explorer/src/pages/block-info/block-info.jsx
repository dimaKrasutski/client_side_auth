import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import { compose, nth, pick } from 'ramda';
import { Tabs, Tab } from 'theme/components/tabs/tabs';
import { ChangeRoute } from '../../components/change-route/change-route';
import { Main } from '../main';
import { PageTitle } from '../../components/page-title/page-title';
import { BlockDetails } from './block-details/block-details';
import { TransactionsTable } from '../../components/transactions-table/transactions-table';
import { OperationsTable } from '../../components/operations-table/operations-table';
import { preloadBlock as preloadBlockAction, selectBlocksTab } from '../../actions/block-info';
import { toStandardFormat } from '../../helpers/date';
import { TransactionsEmpty } from '../../components/transactions-table/transactions-empty/transactions-empty';

const RedirectTo404 = ChangeRoute.to('/404');

export class BlockInfoUI extends Component {
  static propTypes = {
    match: PropTypes.shape().isRequired,
    block: PropTypes.shape().isRequired,
    locale: PropTypes.string.isRequired,
    redirect404: PropTypes.bool.isRequired,
    selectedTab: PropTypes.string.isRequired,
    preloadBlock: PropTypes.func.isRequired,
    selectTab: PropTypes.func.isRequired,
  };

  componentWillMount() {
    const { preloadBlock, match } = this.props;
    preloadBlock(match.params.block);
  }

  render() {
    if (this.props.redirect404) {
      return <RedirectTo404 />;
    }

    const {
      match,
      block,
      locale,
      selectedTab,
      selectTab,
    } = this.props;
    let transfers = [];
    const simplify = compose(pick(['operations']), nth(1));
    if (block && block.transactions) {
      transfers = block.transactions.filter(trx =>
        simplify(trx).operations.find(op => nth(0, op) === 'transfer') !== undefined);
    }
    return (
      !!block &&
      <Main>
        <Container className="pt-6 blocks-container">
          <Row>
            <Col xs="12">
              <PageTitle title="explorer.block-info.title" secondaryTitle={match.params.block} />
            </Col>
          </Row>
          <Row className="mb-4">
            <Col xs="5">
              <BlockDetails
                height={match.params.block}
                hash={block.block_id}
                date={toStandardFormat(block.timestamp, locale)}
              />
            </Col>
          </Row>
          <Row>
            <Col xs="12">
              <Tabs onTabSelect={selectTab} activeTab={selectedTab}>
                <Tab tabId="transactions" label="explorer.block-info.transactions.title">
                  {
                    !transfers.length ?
                      (<TransactionsEmpty
                        titleId="explorer.block-info.transactions.empty.title"
                      />) :
                      <TransactionsTable
                        transactions={transfers}
                        height={match.params.block}
                        blockReady={!!block}
                        date={toStandardFormat(block.timestamp, locale)}
                      />
                  }
                </Tab>
                <Tab tabId="all" label="explorer.block-info.transactions.all">
                  {
                    !block.transactions.length ?
                      (<TransactionsEmpty
                        titleId="explorer.block-info.transactions.empty.title"
                      />) :
                      <OperationsTable operations={block.transactions} blockReady={!!block} />
                  }
                </Tab>
              </Tabs>
            </Col>
          </Row>
        </Container>
      </Main>
    );
  }
}

const mapStateToProps = ({ blockInfo, intl, system }) => ({
  block: blockInfo.block,
  locale: intl.localeFull,
  selectedTab: blockInfo.selectedTab,
  redirect404: system.redirect404,
});

const mapDispatchToProps = dispatch => ({
  preloadBlock: compose(dispatch, preloadBlockAction),
  selectTab: compose(dispatch, selectBlocksTab),
});

export const BlockInfo = withRouter(connect(mapStateToProps, mapDispatchToProps)(BlockInfoUI));
