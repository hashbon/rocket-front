import * as React from "react";

export interface IPropsComponent {
  horizontal?: 0 | 1 | 2 | 3 | 4,
  vertical?: 0 | 1 | 2 | 3 | 4,
  children: React.ReactNode;
}
