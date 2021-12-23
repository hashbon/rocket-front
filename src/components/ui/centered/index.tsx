import "./index.scss";
import React from "react";
import classNames from "classnames";
import { IComponentProps } from "./assets/interfaces";

const Centered: React.FC<IComponentProps> = (props) => {
  const { flex, children } = props;

  return (
    <div className="centered centered--main">
      <div
        className={classNames({
          "centered--context": true,
          "display_flex": flex,
        })}>
        {children}
      </div>
    </div>
  );
};

Centered.defaultProps = {
  flex: false,
};

export default React.memo(Centered);
