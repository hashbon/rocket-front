import "./index.scss";
import React from "react";

interface EarnBlockProps {
  children?: React.ReactNode;
  label: string;
  labelCount?: any;
}

export const EarnBlock = ({ children, label, labelCount }: EarnBlockProps) => (
  <div className="EarnBlock">
    <div className="EarnBlock--label">
      {label} <span>{labelCount}</span>
    </div>
    {children}
  </div>
);
