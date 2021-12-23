import BigNumber from "bignumber.js";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useWeb3React } from "@web3-react/core";
import { getSimpleRpcProvider } from "../utils/providers";
import { BIG_ZERO } from "../constants/bigNumber";
import { useErc20Contract } from "./useContract";

type UseTokenBalanceState = {
  balance: BigNumber;
  fetchStatus: FetchStatus;
};

export enum FetchStatus {
  NOT_FETCHED = "not-fetched",
  SUCCESS = "success",
  FAILED = "failed",
}

export const useTokenBalance = (tokenAddress: string) => {
  const { NOT_FETCHED, SUCCESS, FAILED } = FetchStatus;
  const [balanceState, setBalanceState] = useState<UseTokenBalanceState>({
    balance: BIG_ZERO,
    fetchStatus: NOT_FETCHED,
  });
  const { active, account, chainId } = useWeb3React();
  const contract = useErc20Contract(tokenAddress);
  let updater: ReturnType<typeof setInterval>;
  const UPDATE_TIME = 10 * 1000;



  const fetchBalance = async () => {
    try {
      const res = await contract?.balanceOf(account);
      setBalanceState({ balance: new BigNumber(res.toString()), fetchStatus: SUCCESS });
    } catch (e) {
      console.error(e);
      setBalanceState((prev) => ({
        ...prev,
        fetchStatus: FAILED,
      }));
    }
  };

  useEffect(() => {
    if (account) {
      fetchBalance();
      updater = setInterval(fetchBalance, UPDATE_TIME);
    }

    return () => {
      if (updater) {
        clearInterval(updater);
      }
    };


  }, [active, account, tokenAddress, SUCCESS, FAILED, chainId]);

  return balanceState;
};

export const useGetBnbBalance = () => {
  const [fetchStatus, setFetchStatus] = useState(FetchStatus.NOT_FETCHED);
  const [balance, setBalance] = useState(ethers.BigNumber.from(0));
  const { active, account, chainId } = useWeb3React();

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const simpleRpcProvider = getSimpleRpcProvider(chainId);
        const walletBalance = await simpleRpcProvider.getBalance(account || "");
        setBalance(walletBalance);
        setFetchStatus(FetchStatus.SUCCESS);
      } catch {
        setFetchStatus(FetchStatus.FAILED);
      }
    };

    if (account) {
      fetchBalance();
    }
  }, [active, account, setBalance, setFetchStatus, chainId]);

  return { balance, fetchStatus };
};
