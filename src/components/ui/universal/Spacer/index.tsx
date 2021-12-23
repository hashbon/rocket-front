import "./index.scss";
import React from "react";
import { IPropsComponent } from "./assets/interfaces";

const Spacer: React.FC<IPropsComponent> = ({ background, direction, size, forKey }) => {
  const stylized = !background
    ? {}
    : {
      style: {
        background,
      },
    };

  return <div key={forKey} className={`spacer spacer_${direction}_${size}`} {...stylized} />;
};

Spacer.defaultProps = {
  background: undefined,
  direction: "vertical",
};

export default Spacer;
