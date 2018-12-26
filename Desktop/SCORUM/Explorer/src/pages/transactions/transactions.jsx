import React from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import { Tabs, Tab } from 'theme/components/tabs/tabs';
import PropTypes from 'prop-types';
import { compose } from 'ramda';
import { PageTitle } from '../../components/page-title/page-title';
import { Main } from '../main';
import { TransactionsTable } from './transactions-table/transactions-table';
import { OperationsTable } from './operations-table/operations-table';
import { withTransactionsInfiniteLoad } from './transactions-infinite-load-hoc';
import { withTransactionsAllInfiniteLoad } from './transactions-all-infinite-load-hoc';
import { selectTransactionsTab } from '../../actions/transactions';

const TransactionsWithInfiniteLoad = withTransactionsInfiniteLoad(TransactionsTable);
const TransactionsAllWithInfiniteLoad = withTransactionsAllInfiniteLoad(OperationsTable);

export const TransactionsUI = ({
  selectTab,
  selectedTab,
}) => (
  <Main>
    <Container className="pt-6 operations-container">
      <Row>
        <Col xs="12">
          <PageTitle title="explorer.transactions.title" />
        </Col>
      </Row>
      <Row>
        <Col xs="12">
          <Tabs onTabSelect={selectTab} activeTab={selectedTab}>
            <Tab tabId="transactions" label="explorer.block-info.transactions.title">
              <TransactionsWithInfiniteLoad />
            </Tab>
            <Tab tabId="all" label="explorer.block-info.transactions.all">
              <TransactionsAllWithInfiniteLoad />
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  </Main>
);

TransactionsUI.propTypes = {
  selectedTab: PropTypes.string.isRequired,
  selectTab: PropTypes.func.isRequired,
};

const mapStateToProps = ({ transactions }) => ({
  selectedTab: transactions.selectedTab,
});

const mapDispatchToProps = dispatch => ({
  selectTab: compose(dispatch, selectTransactionsTab),
});

export const Transactions = connect(mapStateToProps, mapDispatchToProps)(TransactionsUI);

