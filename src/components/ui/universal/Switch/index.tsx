import "./index.scss";
import React from "react";
import classNames from "classnames";
import { IPropsComponent } from "./assets/interfaces";

const Switch: React.FC<IPropsComponent> = ({ on, disabled, onChange, children }) => {
  const className = classNames({
    switch: true,
    on,
    disabled,
  });

  return (
    <div className={className} onClick={onChange}>
      <div className="switch--control">
        <div className="switch--indicator" />
      </div>
      <div className="switch--label">{children}</div>
    </div>
  );
};

Switch.defaultProps = {
  on: false,
  onChange: () => {},
  disabled: false,
};

export default React.memo(Switch);
