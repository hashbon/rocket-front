import * as React from "react";

export interface WindowTabsChildren {
  title: string;
  disabled: boolean;
  el: React.ReactNode;
}

interface Props {
  children: WindowTabsChildren | WindowTabsChildren[];
}

export interface WithTabsProps extends Props {
  activeIndex: number;
  setActiveIndex: (activeIndex: number) => void;
}

export const withTabs =
  (WrappedComponent: React.FC<WithTabsProps>) =>
  // eslint-disable-next-line react/display-name
    (props: Props) => {
      const [activeIndex, setActiveIndex] = React.useState(0);

      return <WrappedComponent activeIndex={activeIndex} setActiveIndex={setActiveIndex} {...props} />;
    };
