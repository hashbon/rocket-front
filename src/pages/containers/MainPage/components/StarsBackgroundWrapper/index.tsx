import React from "react";
import "./index.scss";
import BottomIcons from "../BottomIcons";
import { Icon } from "../../../../../components/common/IconBar/interface";

interface StarsBackgroundProps {
  children: any,
  absolute?: any,
  left?: Icon[],
  right?: Icon[],
}

const StarsBackgroundWrapper = ({ children, left, right, absolute }: StarsBackgroundProps) => (
  <div className="StarsBackgroundWrapper">
    <div className="StarsBackgroundWrapper__stars">
      <div className="StarsBackgroundWrapper__container">
        { children }
      </div>
      { absolute && absolute() }
      <BottomIcons left={left} right={right}/>
    </div>
  </div>
);

export default StarsBackgroundWrapper;