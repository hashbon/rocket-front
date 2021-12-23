import "./index.scss";
import React, { useState, useRef } from "react";
// eslint-disable-next-line import/no-named-as-default
import useOnClickOutside from "../../../../hooks/useOnClickOutside";
import { ReactComponent as MoreSVG } from "./assets/more.svg";

export interface IDropActionsProps {
  width?: number;
  top?: number | "inherit";
  left?: number | "inherit";
  right?: number | "inherit";
  items: IDropActionsItem[];
  content?: React.ReactNode;
  children: React.ReactNode;
}

export interface IDropActionsItem {
  title: string;
  onClick: () => void;
}

export interface IDropActionsButton {
  children?: React.ReactNode;
}

export const Main: React.FC<IDropActionsProps> = (props) => {
  const [isOpened, open] = useState(false);
  const selfNode = useRef<HTMLDivElement | null>(null);
  const { width, top, left, right, items, content, children } = props;

  const isMobile = false;

  useOnClickOutside(selfNode, () => open(false));

  const ActionItem = (item: IDropActionsItem) => (
    <div
      className="drop-actions--item no_select"
      onClick={(event) => {
        open(false);
        item.onClick();
        event.stopPropagation();
      }}>
      <span>{item.title}</span>
    </div>
  );

  return (
    <div ref={selfNode}>
      <div
        className="drop-actions--overlay"
        onClick={(event) => {
          open(!isOpened);
          event.stopPropagation();
        }}>
        {children}
      </div>
      {isOpened && (
        <div
          className="drop-actions--main no_select"
          style={
            !isMobile
              ? {
                width: width ? `${width}px` : "auto",
                top: top ? `${top}px` : "inherit",
                left: left ? `${left}px` : "inherit",
                right: right ? `${right}px` : "inherit",
              }
              : {}
          }>
          {items.length > 0
            ? items.map((item, key) => <div key={`dropActionsItem${item.title + key}`}>{ActionItem(item)}</div>)
            : content}
        </div>
      )}
    </div>
  );
};

Main.defaultProps = {
  items: [],
  content: <></>,
};

export const Button: React.FC<IDropActionsButton> = (props) => {
  const { children } = props;
  return (
    <div className="drop-actions--button no_select">
      <div className="icon">
        <MoreSVG />
      </div>
      <div className="title">{!!children && children}</div>
    </div>
  );
};
