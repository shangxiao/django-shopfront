/* eslint-disable jsx-a11y/no-static-element-interactions */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';

import history from '../history';

export default class Link extends Component {
  static propTypes = {
    href: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
  };

  @autobind
  handleClick(e) {
    e.preventDefault();
    history.push(this.props.href);
  }

  render() {
    // href must be propagated for a11y
    return (
      <a {...this.props} onClick={this.handleClick}>{this.props.children}</a>
    );
  }
}
