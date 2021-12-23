import React from "react";
import LandingSlider from "../../ui/universal/LandingSlider";
import useLangs from "../../../hooks/useLangs";
import partners from "./partners";

export const FeatureBy = ({ title } : any) => {
  const { languages } = useLangs();
  return <LandingSlider title={title || languages["hashtoken.media"]} partners={partners} />;
};
