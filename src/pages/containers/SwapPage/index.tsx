import "./index.scss";
import React from "react";
import SwapForm from "./components/SwapForm";

const SwapPage = () => (
  <div className="SwapWrapper">
    <div className="SwapWrapper_title">
      <span>Swap</span>
    </div>
    <SwapForm />
  </div>
);

export default SwapPage;
