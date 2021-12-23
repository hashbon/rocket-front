import * as React from "react";

export interface IPropsComponent {
  className?: string;
  size?: "large" | "small" | "hyper" | "medium" | "pre_hyper" | "loading" | "biggest" | number;
  disabled?: boolean;
  mode?: string;
  btnType?: "submit" | "reset" | "button";
  rounded?: boolean;
  state?: "loading" | "disabled" | "";
  title?: string;
  onClick?: (e: React.MouseEvent) => void;
  beforeContent?: HTMLElement;
  afterContent?: HTMLElement;
  style?: React.CSSProperties;
  fullWidth?: boolean;
  shadow?: boolean;
  children: React.ReactNode;
}
