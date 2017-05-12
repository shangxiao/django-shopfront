import React, { Component } from 'react';
import autobind from 'autobind-decorator';

import { login } from '../../actions';
import store from 'store';

import { Link } from 'apps/router/components';

import './Login.scss';

export default class Login extends Component {
  @autobind
  handleSubmit(e) {
    e.preventDefault();
    store.dispatch(login(new FormData(e.target)));
  }

  render() {
    return (
      <div className="Login">
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input name="email" type="email" placeholder="Email" className="form-control" required />
          </div>
          <div className="form-group">
            <input name="password" type="password" placeholder="Password" className="form-control" required />
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
