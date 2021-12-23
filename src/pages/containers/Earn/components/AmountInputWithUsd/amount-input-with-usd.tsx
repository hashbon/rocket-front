import React from "react";

export interface AmountInputWithUsdProps {
  payAmount: string;
  setPayAmount: (amount: string) => void;
  rate: number;
}

export const checkAmount = (value: string): boolean => {
  if (!value.match(/^\d{0,15}(\.\d{0,15}){0,1}$/)) return false;
  return !Number.isNaN(Number(value));
};

export const AmountInputWithUsd = ({ payAmount, setPayAmount, rate }: AmountInputWithUsdProps) => (
  <label htmlFor="inputStakeInPool">
    <div className="w-100 display_flex">
      <input
        id="inputStakeInPool"
        autoComplete="off"
        name="amount"
        placeholder="0.0"
        value={payAmount}
        onChange={(event) => {
          const { value } = event.currentTarget;
          if (checkAmount(String(value))) {
            setPayAmount(String(value));
          }
        }}
      />
    </div>
    <div className="w-100 display_flex usd">
      <small>~{(+payAmount * rate).toFixed(2)} USD</small>
    </div>
  </label>
);
