import React, { Component } from 'react';
import autobind from 'autobind-decorator';

import history from '../history';

export default class Link extends Component {
  @autobind
  handleClick(e) {
    e.preventDefault();
    history.push(this.props.href);
  }

  render() {
    return (
      <a {...this.props} onClick={this.handleClick}>{this.props.children}</a>
    );
  }
}
