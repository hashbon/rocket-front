import "./index.scss";
import React from "react";
import classNames from "classnames";
import { IPropsComponent } from "./assets/interfaces";

const Title: React.FC<IPropsComponent> = (props) => {
  const { size, bold, underline, pointer, children } = props;

  const cn = classNames({
    "heading": true,
    [`heading_${size}`]: true,
    "heading--bold": bold,
    "heading--pointer": pointer,
  });

  return (
    <div className={cn}>
      <span className="heading--line">
        {children}
        {!!underline && <span className="heading--underline" />}
      </span>
    </div>
  );
};

Title.defaultProps = {
  underline: true,
  size: 1,
  bold: true,
  pointer: false,
};

export default Title;
