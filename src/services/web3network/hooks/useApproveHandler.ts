import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import BigNumber from "bignumber.js";
import { BIG_ZERO } from "../constants/bigNumber";
import { useErc20Contract } from "./useContract";
import { MaxBigNumber } from "../constants/misc";
import { errorHandler } from "../utils/errorHandler";
import { toPowAndHex } from "../utils";
import { Web3CallbackInterface } from "../../../interfaces";

export enum ApproveStatus {
  NOT_FETCHED = "not-fetched",
  APPROVED = "APPROVED",
  FAILED = "failed",
}

export const useApproveHandler = (
  tokenAddress?: string,
  spenderAddress?: string,
  isCorrectChainId = true,
  needApprove = MaxBigNumber,
) => {
  const { NOT_FETCHED, APPROVED, FAILED } = ApproveStatus;
  const { account } = useWeb3React();
  const contract = useErc20Contract(tokenAddress);
  const [approveStatus, setApproveStatus] = useState<ApproveStatus>(NOT_FETCHED);
  const [allowance, setAllowance] = useState(BIG_ZERO);
  const [decimals, setDecimals] = useState(BIG_ZERO);

  const sendApprove = async (callback: Web3CallbackInterface) =>
    contract
      ?.approve(spenderAddress, MaxBigNumber, { from: account })
      .then((result: any) => {
        if (callback.onConfirm) callback.onConfirm(result);
        return result.wait();
      })
      .then((result: any) => {
        setApproveStatus(APPROVED);
        if (callback.onReceipt) callback.onReceipt(result);
      })
      .catch((err: any) => {
        errorHandler(err);
        if (callback.onError) callback.onError(err);
      });

  const executeAllowance = async () => {
    if (contract) {
      const res = await contract.allowance(account, spenderAddress);
      setAllowance(new BigNumber(res.toString()));
    }
  };
  const executeDecimals = async () => {
    if (contract) {
      const res = await contract.decimals();
      setDecimals(res.toString());
    }
  };

  useEffect(() => {
    if (account && contract && isCorrectChainId) {
      executeDecimals();
      executeAllowance();
    } else {
      setApproveStatus(FAILED);
    }
  }, [account, contract, isCorrectChainId]);

  useEffect(() => {
    const maxBigNumber =
      needApprove === MaxBigNumber ? new BigNumber(needApprove) : new BigNumber(toPowAndHex(needApprove));
    if (allowance && decimals && maxBigNumber.toNumber() <= allowance.toNumber()) {
      setApproveStatus(APPROVED);
    } else {
      setApproveStatus(FAILED);
    }
  }, [allowance, decimals]);

  return { sendApprove, approveStatus, decimals, allowance };
};
