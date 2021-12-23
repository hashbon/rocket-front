// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck in
import "./index.scss";
import React, { createRef } from "react";
import TextareaAutosize from "react-textarea-autosize";
import { IPropsComponent } from "./assets/interfaces";

const Textarea: React.FC<IPropsComponent> = (props) => {
  const ref = createRef<HTMLTextAreaElement>();

  const { title, maxRows, minRows, value, placeholder, onChangeHandler, description } = props;

  return (
    <div className="textarea--main">
      <label>
        <div className="textarea--wrapper">
          {title && <div className="textarea--title no_select">{title}</div>}
          <div>
            <TextareaAutosize
              placeholder={placeholder}
              className="SecondaryInput__textarea inp"
              maxRows={maxRows}
              minRows={minRows}
              defaultValue={value}
              onChangeHandler={onChangeHandler}
              inputRef={(tag) => {
                ref.current = tag;
              }}
            />
          </div>
          {description && (
            <div className="textarea--description no_select">
              <div className="hr" />
              {description}
            </div>
          )}
        </div>
      </label>
    </div>
  );
};

Textarea.defaultProps = {
  title: undefined,
  placeholder: "placeholder",
  maxRows: 10,
  minRows: undefined,
  value: "",
  onChangeHandler: () => {},
};

export default Textarea;
