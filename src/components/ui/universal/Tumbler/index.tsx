import "./index.scss";
import React from "react";
import classNames from "classnames";
import { IPropsComponent } from "./assets/interfaces";

const Tumbler: React.FC<IPropsComponent> = ({ on, disabled, onChange, firstTitle, secondTitle, children }) => {
  const className = classNames({
    tumbler: true,
    on,
    disabled,
  });

  return (
    <div>
      <div className="tumbler--label">{children}</div>
      <div className={className} onClick={onChange}>
        <div className="tumbler--control">
          <div className="tumbler--titles">
            <div className="tumbler--titles--text">{firstTitle}</div>
            <div className="tumbler--titles--text">{secondTitle}</div>
          </div>
          <div className="tumbler--indicator" />
        </div>
      </div>
    </div>
  );
};

Tumbler.defaultProps = {
  on: false,
  onChange: () => {},
  disabled: false,
  firstTitle: "One",
  secondTitle: "Two",
};

export default React.memo(Tumbler);
