import "./index.scss";
import React from "react";
import classNames from "classnames";
import { IPropsComponent } from "./assets/interfaces";

const Padding: React.FC<IPropsComponent> = (props) => {
  const { horizontal, vertical, children } = props;

  return (
    <>
      <div
        className={classNames({
          [`padding--horizontal_${horizontal}`]: horizontal,
          [`padding--vertical_${vertical}`]: vertical,
        })}>
        {children}
      </div>
    </>
  );
};

Padding.defaultProps = {
  horizontal: undefined,
  vertical: undefined,
};

export default React.memo(Padding);
