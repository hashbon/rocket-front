import "./index.scss";
import React, { CSSProperties, ReactNode } from "react";
import classNames from "../../../../utils/classNames";

export interface INotificationProps {
  icon?: ReactNode;
  backgroundColor?: string;
  reverse?: boolean;
  style?: CSSProperties
}

export const Notification: React.FC<INotificationProps> = ({ style, backgroundColor = "", children, icon, reverse = false }) => (
  <div className={classNames("Notification", { "Notification__reverse": reverse })} style={backgroundColor?.length ? { backgroundColor: `${backgroundColor}`, ...style } : style}>
    <div className="Notification_title">
      <span>{children}</span>
    </div>
    {!!icon && <div className="Notification_icon">{icon}</div>}
  </div>
);
