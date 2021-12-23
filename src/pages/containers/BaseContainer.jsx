import React, { Component } from "react";
import router5 from "../../router";

class BaseContainer extends Component {
  __getSection = () => {
    // eslint-disable-next-line no-underscore-dangle
    const { section } = this.__getRoute().params;
    return section !== undefined ? section.toLowerCase() : undefined;
  };

  __getRoute = () => router5.getState();

  __sectionNavigate = (section = undefined) => {
    // eslint-disable-next-line no-underscore-dangle
    const params = { ...this.__getRoute().params };
    params.section = section;
    // eslint-disable-next-line no-underscore-dangle
    router5.navigate(this.__getRoute().name, params);
  };

  // eslint-disable-next-line class-methods-use-this
  render() {
    return <>BaseContainer: render();</>;
  }
}

export default BaseContainer;
