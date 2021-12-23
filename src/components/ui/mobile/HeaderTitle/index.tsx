import "./index.scss";
import React from "react";
import classNames from "classnames";
import { IPropsComponent } from "./assets/interfaces";

const HeaderTitle: React.FC<IPropsComponent> = (props) => {
  const { text, after, before, onClick, align } = props;

  return (
    <div
      onClick={onClick}
      className={classNames({
        "header--title": true,
        [`header--title_align_${align}`]: true,
      })}>
      <div className={`header--title_align_content_${align}`}>
        {!!before && <div className="header--title_before">{before}</div>}
        <div
          className={classNames({
            "header--title_text": true,
            [`header--title_text_${align}`]: true,
          })}>
          <span>{text}</span>
        </div>
        {!!after && <div className="header--title_after">{after}</div>}
      </div>
    </div>
  );
};

HeaderTitle.defaultProps = {
  before: undefined,
  after: undefined,
  align: "center",
  onClick: () => {},
};

export default React.memo(HeaderTitle);
