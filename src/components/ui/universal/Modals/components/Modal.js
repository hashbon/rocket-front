import "../modals.scss";
import React, { Component } from "react";
import classNames from "classnames";

class Modal extends Component {
  constructor(props) {
    super(props);
    this.node = React.createRef();
    this.mainClassName = classNames("Modals__box", {
      Modals__noSpacing: props.noSpacing,
    });
  }

  componentDidMount() {
    // eslint-disable-next-line no-underscore-dangle
    this.__toggleDocumentScrolling(false);
    // eslint-disable-next-line no-underscore-dangle
    document.addEventListener("mousedown", this.__handleClick);
    // eslint-disable-next-line no-underscore-dangle
    window.addEventListener("keydown", this.__keyListener);
  }

  __toggleDocumentScrolling = (status) => {
    if (!status) {
      document.body.style.overflowY = "hidden";
      document.body.style.margin = "0 6px 0 0";
    } else {
      document.body.style.overflowY = "scroll";
      document.body.style.margin = "0 0 0 0";
    }
  };

  __keyListener = (e) => {
    // eslint-disable-next-line no-param-reassign
    e = e || window.event;
    switch (e.keyCode) {
      default:
        break;
      case 27:
        this.props.close();
        break;
    }
  };

  componentWillUnmount() {
    // eslint-disable-next-line no-underscore-dangle
    this.__toggleDocumentScrolling(true);
    // eslint-disable-next-line no-underscore-dangle
    document.removeEventListener("mousedown", this.__handleClick);
    this.props.onCloseHandler(this);
    // eslint-disable-next-line no-underscore-dangle
    window.removeEventListener("keydown", this.__keyListener);
  }

  get child() {
    const { props } = this;
    const Child = props.children;
    return <Child close={props.close} open={props.open} clear={props.clear} {...props.meta} {...props.getParams} />;
  }

  render() {
    const { props } = this;
    return (
      <div className={this.mainClassName} ref={this.node} style={{ width: props.width }}>
        {this.child}
      </div>
    );
  }

  __handleClick = (e) => {
    if (!(this.node.current && this.node.current.contains(e.target))) {
      this.props.close();
    }
  };
}

Modal.defaultProps = {
  onCloseHandler: () => {},
  width: "auto",
};

export default React.memo(Modal);
