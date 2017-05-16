/* eslint-disable react/prefer-stateless-function */

import React, { Component } from 'react';

import { Link } from 'apps/router/components';

import './SignUp.scss';

export default class SignUp extends Component {
  render() {
    return (
      <div className="SignUp">
        <h1>Register for an account</h1>
        <form>
          <div className="form-group">
            <input type="text" placeholder="Pick a username" className="form-control" />
          </div>
          <div className="form-group">
            <input type="email" placeholder="Your email address" className="form-control" />
          </div>
          <div className="form-group">
            <input type="password" placeholder="Enter a password" className="form-control" />
          </div>
          <div className="form-group">
            <button className="btn btn-primary">Sign up</button>
            <span> or </span>
            <Link href="/login">login</Link>
          </div>
        </form>
      </div>
    );
  }
}
