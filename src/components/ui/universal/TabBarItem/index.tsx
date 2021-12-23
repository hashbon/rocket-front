import "./index.scss";
import React from "react";
import classNames from "classnames";
import { IPropsComponent } from "./assets/interfaces";

const TAB_BAR_CLASS_NAME_PREFIX = "tab-bar-item--";

const TabBarItem: React.FC<IPropsComponent> = (props) => {
  const { onClick, type, style, className, active, icon, title, forKey } = props;

  return (
    <div className="tab-bar-item no_select" onClick={onClick} key={forKey}>
      <div
        className={classNames({
          [TAB_BAR_CLASS_NAME_PREFIX + [type]]: true,
          [className]: !!className,
          active,
        })}
        style={style}>
        {icon && <div className="tab-bar-item--icon">{icon}</div>}
        {title && <div className="tab-bar-item--title">{title}</div>}
      </div>
    </div>
  );
};

TabBarItem.defaultProps = {
  type: "rounded",
  style: {},
  onClick: () => {},
};

export default TabBarItem;
