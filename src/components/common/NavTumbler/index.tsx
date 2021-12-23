import "./index.scss";
import React from "react";
import classNames from "classnames";
import { IPropsComponent } from "./assets/interfaces";

const NavTumbler: React.FC<IPropsComponent> = ({
  position,
  disabled,
  onChangeHandler = () => {},
  firstTitle,
  secondTitle,
  thirdTitle,
  fortyTitle,
}) => {
  const className = classNames({
    NavTumbler: true,
    [`NavTumbler_pos${position}`]: true,
    disabled,
  });

  return (
    <div>
      <div className={className}>
        <div className="NavTumbler--control">
          <div className="NavTumbler--titles">
            <div className="NavTumbler--titles--text" onClick={() => onChangeHandler(1)}>
              {firstTitle}
            </div>
            <div className="NavTumbler--titles--text" onClick={() => onChangeHandler(2)}>
              {secondTitle}
            </div>
            <div className="NavTumbler--titles--text" onClick={() => onChangeHandler(3)}>
              {thirdTitle}
            </div>
            <div className="NavTumbler--titles--text" onClick={() => onChangeHandler(4)}>
              {fortyTitle}
            </div>
          </div>
          <div className="NavTumbler--indicator" />
        </div>
      </div>
    </div>
  );
};

NavTumbler.defaultProps = {
  position: 1,
  onChangeHandler: () => {},
  disabled: false,
  firstTitle: "One",
  secondTitle: "Two",
  thirdTitle: "Three",
  fortyTitle: "Forty",
};

export default React.memo(NavTumbler);
