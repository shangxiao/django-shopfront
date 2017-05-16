import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import { connect } from 'react-redux';

import { Link } from 'apps/router/components';
import { login } from '../../actions';

import './Login.scss';

@connect(state => ({
  errorMsg: state.auth.loginErrorMsg,
}))
export default class Login extends Component {
  static propTypes = {
    errorMsg: PropTypes.string,
  };

  static defaultProps = {
    errorMsg: null,
  }

  static renderError(msg) {
    return (
      <div className="form-group alert alert-danger">
        { msg }
      </div>
    );
  }

  @autobind
  handleSubmit(e) {
    e.preventDefault();
    this.props.dispatch(login(new FormData(e.target)));
  }

  render() {
    const error = this.props.errorMsg
      ? Login.renderError(this.props.errorMsg)
      : null;

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
          { error }
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
