import React from "react";

export interface WithActiveProps {
  isActive: boolean;
  setActive: (value: boolean) => void;
}

type Props<T> = Omit<T, "isActive" | "setActive">;

export const withActive =
  <T extends unknown>(WrappedComponent: React.FC<T>) =>
  // eslint-disable-next-line react/display-name
    (props: Props<T>) => {
      const [isActive, setActive] = React.useState(false);

      return <WrappedComponent isActive={isActive} setActive={setActive} {...(props as T)} />;
    };
