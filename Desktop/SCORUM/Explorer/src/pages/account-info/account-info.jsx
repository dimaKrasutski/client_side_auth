import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { withRouter } from 'react-router-dom';
import Container from 'reactstrap/lib/Container';
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';
import { connect } from 'react-redux';
import { compose } from 'ramda';
import { ChangeRoute } from '../../components/change-route/change-route';
import { Main } from '../main';
import { PageTitle } from '../../components/page-title/page-title';
import { preloadAccountInfo } from '../../actions/account-info';
import { reduceTransaction } from '../../helpers/transactions';
import { withHistoryInfiniteLoad } from './history-infinite-load-hoc';
import { Transactions } from './transactions/transactions';
import { Balance } from './balance/balance';

const RedirectTo404 = ChangeRoute.to('/404');

export class UserInfoUI extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.arrayOf({
        match: PropTypes.shape().isRequired,
      }).isRequired,
    }).isRequired,
    redirect404: PropTypes.bool.isRequired,
    preloadAccountInfoAction: PropTypes.func.isRequired,
  };

  transactionsWithInfiniteLoad =
    withHistoryInfiniteLoad(Transactions, this.props.match.params.username, reduceTransaction);

  componentWillMount() {
    const { preloadAccountInfoAction, match } = this.props;
    preloadAccountInfoAction(match.params.username);
  }

  componentWillReceiveProps(nextProps) {
    const { preloadAccountInfoAction, match } = this.props;
    const { match: nextMatch } = nextProps;
    if (match.params.username !== nextMatch.params.username) {
      preloadAccountInfoAction(nextMatch.params.username);
      this.transactionsWithInfiniteLoad =
        withHistoryInfiniteLoad(Transactions, nextMatch.params.username, reduceTransaction);
    }
  }

  render() {
    if (this.props.redirect404) {
      return <RedirectTo404 />;
    }

    const { match } = this.props;
    const TransactionsWithInfiniteLoad = this.transactionsWithInfiniteLoad;
    return (
      <Main>
        <Container className="pt-6 blocks-container">
          <Row>
            <Col xs="12">
              <PageTitle title="explorer.account-info.title" secondaryTitle={match.params.username} />
            </Col>
          </Row>
          <Row>
            <Col xs="6">
              <Balance />
            </Col>
          </Row>
          <Row>
            <Col xs="12">
              <h4 className="mt-5 mb-4"><FormattedMessage id="explorer.account-info.transactions.title" /></h4>
              <TransactionsWithInfiniteLoad />
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
  redirect404: system.redirect404,
});

const mapDispatchToProps = dispatch => ({
  preloadAccountInfoAction: compose(dispatch, preloadAccountInfo),
});

export const UserInfo = withRouter(connect(mapStateToProps, mapDispatchToProps)(UserInfoUI));
