import "./index.scss";
import React from "react";
import { ITabBar, ITabBarChild } from "./assets/interfaces";

const TabBar: React.FC<ITabBar> = ({ items }) => (
  <div className="tab-bar--wrapper">
    {/* eslint-disable-next-line @typescript-eslint/no-unused-vars */}
    {items.map((item: ITabBarChild, i: number) => item)}
  </div>
);

TabBar.defaultProps = {
  items: [],
};

export default TabBar;
