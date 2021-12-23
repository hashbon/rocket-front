import "./index.scss";
import React from "react";
import classNames from "classnames";
import { IPropsComponent } from "./assets/interfaces";

const Card: React.FC<IPropsComponent> = (props) => {
  const {
    rounded,
    shadow,
    transparent,
    background,
    horizontalPadding,
    verticalPadding,
    children,
    overflow,
    bordered,
    className,
  } = props;

  return (
    <div
      className={classNames(className, "box", {
        "box--rounded": rounded,
        "box--shadow": shadow,
        "box--transparent": transparent,
        "box--overflow": overflow,
        "box--bordered": bordered,
        "box--background_pixels": background === "pixels",
        "box--background_accent": background === "accent",
        "box--background_dark": background === "dark",
        [`box--padding_horizontal_${horizontalPadding}`]: horizontalPadding,
        [`box--padding_vertical_${verticalPadding}`]: verticalPadding,
      })}>
      {children}
    </div>
  );
};

Card.defaultProps = {
  horizontalPadding: undefined,
  verticalPadding: undefined,
  rounded: true,
  shadow: true,
  transparent: false,
  overflow: false,
};

export default React.memo(Card);
