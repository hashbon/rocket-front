import "./index.scss";
import React, { memo } from "react";
import { ReactComponent as LoadingSVG } from "./assets/svg/loading.svg";

const Loading = () => (
  <div className="loading">
    <LoadingSVG />
  </div>
);

export default memo(Loading);
