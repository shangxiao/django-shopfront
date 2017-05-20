import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';

import Route from 'apps/router/route';
import { getCart } from 'apps/cart/actions';
import { getProfile } from 'apps/auth/actions';

import Menu from './Menu';

@connect(store => ({
  route: store.router.route,
}))
export default class App extends Component {
  static propTypes = {
    route: PropTypes.instanceOf(Route).isRequired,
  };

  componentDidMount() {
    this.props.dispatch(getProfile());
    this.props.dispatch(getCart());
  }

  render() {
    const Page = this.props.route.page;
    const pageInstance = Page ? <Page /> : null;

    return (
      <div>
        <Menu />
        <div className="container layout" id="main-content">
          { pageInstance }
        </div>
      </div>
    );
  }
}
