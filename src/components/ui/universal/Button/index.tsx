import "../../index.scss";
import "./index.scss";
import React from "react";
import classNames from "classnames";
import { IPropsComponent } from "./assets/interfaces";
import { ReactComponent as LoadingSVG } from "./assets/icons/loading.svg";

const Button: React.FC<IPropsComponent> = (props) => {
  const {
    className,
    size,
    disabled,
    mode,
    rounded,
    state,
    fullWidth,
    btnType,
    onClick,
    children,
    beforeContent,
    afterContent,
    style,
    title,
    shadow,
  } = props;

  const classNameComputed = className || "";
  const sizeComputed = size || "";
  const modeComputed = mode || "";
  const cn = classNames({
    [classNameComputed]: !!className,
    button: true,
    disabled: disabled || state === "disabled",
    [sizeComputed]: size,
    [modeComputed]: !!mode,
    rounded,
    shadow,
    // [state]: !!state,
    "button-full-width": fullWidth,
  });

  return (
    <button className={cn} onClick={onClick} style={style} type={btnType} title={title}>
      {state === "loading" && (
        <div className="button--loader">
          <LoadingSVG />
        </div>
      )}
      <div className="button--cont">
        {beforeContent}
        <div className="button--label">{children}</div>
        {afterContent}
      </div>
      {(mode === "outline" || mode === "negative_outline") && <div className="button--outline_helper" />}
    </button>
  );
};

Button.defaultProps = {
  fullWidth: false,
  onClick: () => {},
  btnType: "button",
};

export default React.memo(Button);
