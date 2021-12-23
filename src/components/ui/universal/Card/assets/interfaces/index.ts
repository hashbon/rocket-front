import * as React from "react";

export interface IPropsComponent {
  horizontalPadding?: 1 | 2 | 3 | 4,
  verticalPadding?: 1 | 2 | 3 | 4,
  bordered?: boolean,
  rounded?: boolean,
  shadow?: boolean,
  overflow?: boolean,
  transparent?: boolean,
  children: React.ReactNode;
  className?: string;
  background?: "transparent" | "pixels" | "accent" | "dark";
}
