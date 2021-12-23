import { useContext } from "react";
import { ParamsContext } from "../services";

export const useMobileDetect = () => {
  const { isMobile, isAdaptive } = useContext(ParamsContext);

  return {
    isMobile,
    isAdaptive,
  };
};
