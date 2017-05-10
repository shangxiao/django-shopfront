import React, { Component } from 'react';

import { Link } from 'apps/router/components';

import './Login.scss';

export default class Login extends Component {
  render() {
    return (
      <div className="Login">
        <h1>Login</h1>
        <form>
          <div className="form-group">
            <input placeholder="Username or email" className="form-control" />
          </div>
          <div className="form-group">
            <input type="password" placeholder="Password" className="form-control" />
          </div>
          <div className="form-group">
            <button className="btn btn-primary">Login</button>
            <span> or </span>
            <Link href="/sign-up">sign up!</Link>
          </div>
        </form>
      </div>
    );
  }
}
