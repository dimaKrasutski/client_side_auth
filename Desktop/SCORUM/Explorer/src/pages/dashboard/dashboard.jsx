import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Container from 'reactstrap/lib/Container';
import { FormattedMessage } from 'react-intl';
import { compose } from 'ramda';
import { Redirect } from 'react-router-dom';
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';
import Table from 'reactstrap/lib/Table';
import Input from 'reactstrap/lib/Input';
import { IconScr } from 'theme/components/icons/icon-scr/icon-scr';
import { IconSp } from 'theme/components/icons/icon-sp/icon-sp';
import { wrapRoute2Locale } from 'theme/helpers/localization';
import { Main } from '../main';
import { BalanceCard } from '../../components/balance-card/balance-card';
import { BalanceCardBody } from '../../components/balance-card/balance-card-body';
import { DashboardButton } from '../../components/dashboard-button/dashboard-button';
import { loadOperations, loadBlocks, loadAccountCount, getChainCapital } from '../../actions/dashboard';
import { Block } from './block/block';
import { Transaction } from './transaction/transaction';
import './dashboard.scss';

export class DashboardUI extends Component {
  static propTypes = {
    locale: PropTypes.string.isRequired,
    amountSCR: PropTypes.number.isRequired,
    amountSP: PropTypes.number.isRequired,
    blocksCount: PropTypes.number.isRequired,
    operationsCount: PropTypes.number,
    accountCount: PropTypes.number.isRequired,
    blocks: PropTypes.arrayOf().isRequired,
    operations: PropTypes.arrayOf().isRequired,
    preloadChainCapital: PropTypes.func.isRequired,
    loadOperationsAction: PropTypes.func.isRequired,
    loadBlocksAction: PropTypes.func.isRequired,
    loadAccountCountAction: PropTypes.func.isRequired,
  };

  static defaultProps = {
    operationsCount: 0,
  };

  state = {
    redirectToBlocks: false,
    redirectToTransactions: false,
  };

  componentWillMount() {
    const {
      loadOperationsAction, loadBlocksAction, loadAccountCountAction, preloadChainCapital,
    } = this.props;
    preloadChainCapital();
    loadOperationsAction();
    loadBlocksAction();
    loadAccountCountAction();
  }

  goToBlocksPage = () => {
    this.setState({ redirectToBlocks: true });
  };

  goToTransactionsPage = () => {
    this.setState({ redirectToTransactions: true });
  };

  render() {
    const {
      locale,
      amountSCR,
      amountSP,
      blocks,
      operations,
      blocksCount,
      operationsCount,
      accountCount,
    } = this.props;

    const { redirectToBlocks, redirectToTransactions } = this.state;

    if (redirectToBlocks) {
      return <Redirect push to={wrapRoute2Locale('/blocks', locale)} />;
    }

    if (redirectToTransactions) {
      return <Redirect push to={wrapRoute2Locale('/transactions', locale)} />;
    }

    return (
      <Main>
        <Container className="pt-6 dashboard-container">
          <Row>
            <Col xs="4">
              <BalanceCard classNames="card-left" innerClassName="pl-3">
                <BalanceCardBody
                  title="explorer.dashboard.balance-card.total-scr"
                  icon={<IconScr />}
                  balance={amountSCR}
                  trades={1}
                  currency="USD"
                  locale={locale}
                />
              </BalanceCard>
            </Col>
            <Col xs="4">
              <BalanceCard classNames="card-left" innerClassName="pl-3">
                <BalanceCardBody
                  title="explorer.dashboard.balance-card.total-sp"
                  icon={<IconSp />}
                  balance={amountSP}
                  trades={1}
                  currency="USD"
                  locale={locale}
                />
              </BalanceCard>
            </Col>
            <Col xs="4">
              <BalanceCard classNames="card-left h-100" innerClassName="h-100 pl-3">
                <span>
                  <FormattedMessage id="explorer.dashboard.balance-card.total-users" />
                </span>
                <h2 className="mt-1_5 mb-2">{accountCount}</h2>
              </BalanceCard>
            </Col>
          </Row>
          <Row className="mt-6">
            <Col xs="6">
              <Input type="text" plaintext className="mb-0">
                <span className="h3 mr-1">
                  {operationsCount}
                </span>
                <span className="font-weight-normal text-align">
                  <FormattedMessage id="explorer.dashboard.total-transactions" />
                </span>
              </Input>
              <Table className="dashboard-transactions-table">
                <thead className="thead-light">
                  <tr>
                    <th>
                      <FormattedMessage id="explorer.dashboard.transactions.hash" />
                    </th>
                    <th>
                      <FormattedMessage id="explorer.dashboard.transactions.date" />
                    </th>
                    <th>
                      <FormattedMessage id="explorer.dashboard.transactions.type" />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    operations.map(operation => (
                      <Transaction key={operation[1].trx_id} locale={locale} transaction={operation[1]} />
                    ))
                  }
                </tbody>
              </Table>
              <DashboardButton text="explorer.dashboard.all-transactions" onClick={this.goToTransactionsPage} />
            </Col>
            <Col xs="6">
              <Input type="text" plaintext className="mb-0">
                <span className="h3 mr-1">
                  {blocksCount}
                </span>
                <span className="font-weight-normal text-align">
                  <FormattedMessage id="explorer.dashboard.total-blocks" />
                </span>
              </Input>
              <Table className="dashboard-blocks-table">
                <thead className="thead-light">
                  <tr>
                    <th>
                      <FormattedMessage id="explorer.dashboard.blocks.height" />
                    </th>
                    <th>
                      <FormattedMessage id="explorer.dashboard.blocks.date" />
                    </th>
                    <th>
                      <FormattedMessage id="explorer.dashboard.blocks.hash" />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {
                    blocks.map(block => (<Block key={block[1].block_id} locale={locale} block={block} />))
                  }
                </tbody>
              </Table>
              <DashboardButton text="explorer.dashboard.all-blocks" onClick={this.goToBlocksPage} />
            </Col>
          </Row>
        </Container>
      </Main>
    );
  }
}

export const mapStateToProps = ({ intl, dashboard }) => ({
  locale: intl.localeFull,
  amountSCR: dashboard.amountSCR,
  amountSP: dashboard.amountSP,
  blocksCount: dashboard.blocksCount,
  operationsCount: dashboard.operationsCount,
  blocks: dashboard.blocks,
  operations: dashboard.operations,
  accountCount: dashboard.accountCount,
});

export const mapDispatchToProps = dispatch => ({
  preloadChainCapital: compose(dispatch, getChainCapital),
  loadOperationsAction: compose(dispatch, loadOperations),
  loadBlocksAction: compose(dispatch, loadBlocks),
  loadAccountCountAction: compose(dispatch, loadAccountCount),
});

export const Dashboard = connect(mapStateToProps, mapDispatchToProps)(DashboardUI);
