import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import Container from 'reactstrap/lib/Container';
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';
import { compose } from 'ramda';
import { preloadWitnessesByVote } from '../../actions/delegates';
import { Main } from '../main';
import { PageTitle } from '../../components/page-title/page-title';
import { WitnessesTable } from './witnesses-table/witnesses-table';

export class DelegatesUI extends Component {
  static propTypes = {
    activeWitnesses: PropTypes.arrayOf(
      PropTypes.shape({
        owner: PropTypes.string.isRequired,
        votes: PropTypes.string.isRequired,
      }),
    ).isRequired,
    candidates: PropTypes.arrayOf(
      PropTypes.shape({
        owner: PropTypes.string.isRequired,
        votes: PropTypes.string.isRequired,
      }),
    ).isRequired,
    preloadWitnessesByVoteAction: PropTypes.func.isRequired,
  };

  componentWillMount() {
    const { preloadWitnessesByVoteAction } = this.props;
    preloadWitnessesByVoteAction();
  }

  render() {
    const { activeWitnesses, candidates } = this.props;
    return (
      <Main>
        <Container className="pt-6 blocks-container">
          <Row>
            <Col xs="12">
              <PageTitle title="explorer.delegates.title" />
              <h4>
                <FormattedMessage id="explorer.delegates.table-active.title" />
              </h4>
              <WitnessesTable witnesses={activeWitnesses} />
              <h4>
                <FormattedMessage id="explorer.delegates.table-candidates.title" />
              </h4>
              <WitnessesTable witnesses={candidates} isCandidates />
            </Col>
          </Row>
        </Container>
      </Main>
    );
  }
}

export const mapStateToProps = ({ delegates }) => ({
  activeWitnesses: delegates.active,
  candidates: delegates.candidates,
});

export const mapDispatchToProps = dispatch => ({
  preloadWitnessesByVoteAction: compose(dispatch, preloadWitnessesByVote),
});

export const Delegates = connect(mapStateToProps, mapDispatchToProps)(DelegatesUI);
