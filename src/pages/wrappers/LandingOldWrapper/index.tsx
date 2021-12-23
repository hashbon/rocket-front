// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck in
import "./index.scss";
import React, { Component } from "react";
import LandingHeader from "../../../components/ui/desktop/LandingHeader";

class LandingOldWrapper extends Component {
  render() {
    const { children } = this.props;

    return (
      <>
        <LandingHeader />
        <div className="LandingWrapper_page">{children}</div>
      </>
    );
  }
}

export default LandingOldWrapper;
