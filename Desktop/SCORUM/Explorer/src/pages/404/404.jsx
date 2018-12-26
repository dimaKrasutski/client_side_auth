import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'ramda';
import { FormattedMessage } from 'react-intl';
import Container from 'reactstrap/lib/Container';
import Row from 'reactstrap/lib/Row';
import Col from 'reactstrap/lib/Col';
import Button from 'reactstrap/lib/Button';
import { wrapRoute2Locale } from 'theme/helpers/localization';
import { Icon404 } from '../../components/icons/icon-404/icon-404';
import { IconBlock } from '../../components/icons/icon-blocks/icon-blocks';
import { Main } from '../main';
import { clearRedirect } from '../../actions/system';
import './404.scss';

export class Page404UI extends Component {
  static propTypes = {
    history: PropTypes.shape().isRequired,
    locale: PropTypes.string.isRequired,
    clearRedirectAction: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.clearRedirectAction();
  }

  goToHomePage = () => {
    const { history, locale } = this.props;
    history.push(wrapRoute2Locale('/', locale));
  };

  render() {
    return (
      <Main>
        <Container className="container-404 mt-10">
          <Row>
            <Col xs={{ size: 8, offset: 2 }}>
              <IconBlock />
              <div className="right-container d-inline-block ml-4_5 mt-2 text-gray-dark-secondary">
                <Icon404 />
                <h4 className="mt-2">
                  <FormattedMessage id="explorer.404.title" />
                </h4>
                <div className="mt-0_5">
                  <FormattedMessage id="explorer.404.subtitle" />
                </div>
                <Button color="primary" className="mt-5 btn-rounded" onClick={this.goToHomePage}>
                  <FormattedMessage id="explorer.404.button" />
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </Main>
    );
  }
}

const mapStateToProps = ({ intl }) => ({
  locale: intl.localeFull,
});

const mapDispatchToProps = dispatch => ({
  clearRedirectAction: compose(dispatch, clearRedirect),
});

export const Page404 = connect(mapStateToProps, mapDispatchToProps)(Page404UI);
