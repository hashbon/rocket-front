import * as React from "react";

export interface IInputProps extends React.InputHTMLAttributes<HTMLDivElement> {
  description?: string | React.ReactNode,
  title?: string,
  value: string,
  mode?: "primary" | "secondary",
  error?: boolean,
  onKeyUp?: (event: React.KeyboardEvent<HTMLInputElement>) => void,
  onChangeHandler?: (event: string) => void,
}
