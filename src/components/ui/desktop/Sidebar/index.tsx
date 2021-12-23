import "./index.scss";
import React from "react";
import classNames from "classnames";
import { ISidebarProps } from "./assets/interface";

const Sidebar: React.FC<ISidebarProps> = (props) => {
  const { items } = props;

  return (
    <div className="Sidebar_wrapper">
      {items.map((item, i) => (
        <div
          key={item.key + i}
          onClick={item.onClick}
          className={classNames("Sidebar_item", {
            Sidebar_item_active: !!item.active,
          })}>
          <div className="Sidebar_item_wrapper">
            {/* eslint-disable-next-line no-prototype-builtins */}
            {item.hasOwnProperty("icon") && <div className="Sidebar_item_icon">{item.icon}</div>}
            <div className="Sidebar_item_title">
              <span>{item.title}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
