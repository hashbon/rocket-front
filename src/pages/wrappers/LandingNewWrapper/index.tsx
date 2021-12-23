// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck in
import "./index.scss";
import React, { Component } from "react";
import LandingHeader from "../../../components/ui/desktop/LandingHeader";

class LandingNewWrapper extends Component {
  render() {
    const { children } = this.props;

    return (
      <>
        <LandingHeader />
        <div className="LandingNewWrapper">
          <div className="LandingNewWrapper_page">
            {children}
          </div>
        </div>
      </>
    );
  }
}

export default LandingNewWrapper;
