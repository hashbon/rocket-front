import "./index.scss";
import React from "react";
import IconBar from "../../../../../components/common/IconBar";
import { Icon } from "../../../../../components/common/IconBar/interface";

interface BottomIconsProps {
  left?: Icon[]
  right?: Icon[]
}
const BottomIcons = ( { left, right }: BottomIconsProps) => {
  if (!left && !right) {
    return <></>;
  }
  return (
    <div className="BottomIcons">
      {left && left.length > 0 ? <IconBar icons={left}/> : <div style={{ display: "flex" }}/>}
      {right && right.length > 0 ? <IconBar icons={right}/> : <div style={{ display: "flex" }}/>}
    </div>
  );
};


export default BottomIcons;