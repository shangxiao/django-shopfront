import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Link } from 'apps/router/components';
import getCsrfValue, { CSRF_FORM_NAME } from 'csrf';

@connect(state => ({
  isFetchingProfile: state.auth.isFetchingProfile,
  isLoggedIn: state.auth.isLoggedIn,
  profile: state.auth.profile,
}))
export default class Menu extends Component {

  static propTypes = {
    isFetchingProfile: PropTypes.bool.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    profile: PropTypes.shape({
      email: PropTypes.string,
    }).isRequired,
  };

  static renderAnonymousMenuItems() {
    return (
      <ul className="ml-auto nav navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" href="/login">Login</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" href="/sign-up">Sign up</Link>
        </li>
      </ul>
    );
  }

  renderLoggedInMenuItems() {
    // this should be a good old fashioned POST to server
    return (
      <ul className="ml-auto nav navbar-nav">
        <li className="nav-item">
          <Link className="nav-link" href="/cart">Cart</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" href="/profile">
            {this.props.profile.email}
          </Link>
        </li>
        <li className="nav-item">
          <form action="/accounts/logout/" method="POST">
            <input type="hidden" name={CSRF_FORM_NAME} value={getCsrfValue()} />
            <button className="nav-link btn btn-link">Logout</button>
          </form>
        </li>
      </ul>
    );
  }

  renderMenuItems() {
    if (this.props.isFetchingProfile) {
      // if we're in the process of determining the user, don't show anything
      // this could should be optimised so the UI doesn't jitter
      return null;
    }

    return this.props.isLoggedIn
      ? this.renderLoggedInMenuItems()
      : Menu.renderAnonymousMenuItems();
  }

  render() {
    return (
      <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
        <div className="container">
          <button className="navbar-toggler navbar-toggler-right" type="button" dataToggle="collapse" dataTarget="#navbarSupportedContent" ariaControls="navbarSupportedContent" ariaExpanded="false" ariaLabel="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <Link className="navbar-brand" href="/">Django Shopfront</Link>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {this.renderMenuItems()}
          </div>
        </div>
      </nav>
    );
  }
}
