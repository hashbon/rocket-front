import "./input.scss";
import React from "react";
import classNames from "classnames";
import { IInputProps } from "./interface";

const Input: React.FC<IInputProps> = (props) => {
  const { title, description, onChangeHandler, mode, error, ...inputProps } = props;

  const type = inputProps.type || "text";
  return (
    <div className={`input--main no_select input--${mode}`}>
      <label className="input--label">
        <div
          className={classNames("input--wrapper no_select", {
            "input--wrapper_error": !!error,
          })}>
          <input
            {...inputProps}
            onChange={(text) => {
              if (onChangeHandler) {
                onChangeHandler(text.target.value);
              }
            }}
            type={type}
          />
          {!!title && <div className="input--wrapper_title no_select">{title}</div>}
          {!!description && (
            <div className="input--wrapper_description no_select">
              <span>{description}</span>
            </div>
          )}
        </div>
      </label>
    </div>
  );
};

Input.defaultProps = {
  mode: "primary",
  value: "",
  onChangeHandler: () => {},
};

export default Input;
