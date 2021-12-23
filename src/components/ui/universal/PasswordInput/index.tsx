import "./input.scss";
import React, { useState } from "react";
import classNames from "classnames";
import { IInputProps } from "./interface";
import { ReactComponent as EyeOpen } from "./assets/svg/eye_open.svg";
import { ReactComponent as EyeClose } from "./assets/svg/eye_close.svg";

const Input: React.FC<IInputProps> = (props) => {
  const [visiblePassword, setVisiblePassword] = useState(false);

  const { title, description, onChangeHandler, mode, error, ...inputProps } = props;

  const inputType = visiblePassword ? "text" : "password";

  return (
    <div className={`input--password--main no_select input--password--${mode}`}>
      <label>
        <div
          className={classNames("input--password--wrapper", {
            "input--password--wrapper_error": !!error,
          })}>
          {title && <div className="input--password--wrapper_title">{title}</div>}
          <div className="input--password--right_padding">
            <input
              {...inputProps}
              onChange={(text) => {
                if (onChangeHandler) {
                  onChangeHandler(text.target.value);
                }
              }}
              type={inputType}
            />
          </div>
          {description && (
            <div className="input--password--right_padding input--password--wrapper_description no_select">
              <div className="hr"> </div>
              {description}
            </div>
          )}
        </div>
        <button
          type="button"
          className="input--password--right_icon"
          onClick={() => setVisiblePassword(!visiblePassword)}>
          <div className="input--password--right_see">{visiblePassword ? <EyeOpen /> : <EyeClose />}</div>
        </button>
      </label>
    </div>
  );
};

Input.defaultProps = {
  mode: "primary",
  type: "text",
  error: false,
  title: undefined,
  value: "",
  onChangeHandler: () => {},
};

export default Input;
