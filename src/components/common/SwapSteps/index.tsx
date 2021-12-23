import "./index.scss";
import React from "react";

const SwapSteps = () => {
  const name = "SwapSteps";

  const renderStep = (title: string, description: string, status: string) => (
    <div>
      <div>{status}</div>
      <div>{title}</div>
      <div>{description}</div>
    </div>
  );

  const order = {
    networkFrom: "BSC",
    networkTo: "HECO",
  };

  return (
    <div>
      <h1>{name}</h1>
      <div>
        <h2>create order</h2>
        <hr />
        {renderStep(order.networkTo, "Reserve", "done")}
        <hr />
        {renderStep(`${order.networkTo} - ${order.networkFrom}`, "Sync", "in progress")}
        <hr />
        {renderStep(order.networkFrom, "Pay", "wait")}
        <hr />
        {renderStep(order.networkTo, "Withdraw", "wait")}
        <hr />
      </div>
    </div>
  );
};

export default SwapSteps;
