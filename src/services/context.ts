import React from "react";

type ContextProps = {
  isMobile: boolean;
  isAdaptive: boolean;
};

export const ParamsContext = React.createContext<Partial<ContextProps>>({
  isMobile: false,
  isAdaptive: false,
});
