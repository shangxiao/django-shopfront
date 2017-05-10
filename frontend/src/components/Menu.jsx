import React, { Component } from 'react';

import { Link } from 'apps/router/components';

export default class Menu extends Component {
  render() {
    return (
      <nav className="navbar navbar-toggleable-md navbar-light bg-faded">
        <div className="container">
          <button className="navbar-toggler navbar-toggler-right" type="button" dataToggle="collapse" dataTarget="#navbarSupportedContent" ariaControls="navbarSupportedContent" ariaExpanded="false" ariaLabel="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <a className="navbar-brand" href="/">Django Shopfront</a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="ml-auto nav navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" href="/login">Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" href="/sign-up">Sign up</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}
