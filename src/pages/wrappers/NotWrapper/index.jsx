import React, { Component } from "react";

class NotWrapper extends Component {
  render() {
    const { children } = this.props;

    return <>{children}</>;
  }
}

export default NotWrapper;
