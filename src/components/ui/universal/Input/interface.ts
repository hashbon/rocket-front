import * as React from "react";

export interface IInputProps extends React.InputHTMLAttributes<HTMLDivElement> {
  description?: string | React.ReactNode;
  title?: string;
  mode?: "primary" | "secondary" | "large" | "embed" | "swap";
  value: string;
  onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  error?: boolean;
  onChangeHandler?: (event: React.ReactText) => void;
  swap?: boolean;
  type?: any;
}
