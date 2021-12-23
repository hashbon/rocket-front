import { useMemo } from "react";
import { useWeb3React } from "@web3-react/core";
import { isAddress } from "web3-utils";
import { Contract } from "@ethersproject/contracts";
import erc20 from "../contracts/erc20.json";
import staking from "../contracts/staking.json";
import secretStaking from "../contracts/secret-staking.json";
import { getContract } from "../utils";

export const useContract = (address: string | undefined | null, ABI: unknown,  withSignerIfPossible = true): Contract | null  => {
  const { library, account } = useWeb3React();

  return useMemo(() => {
    if (address && !isAddress(address)) return null;
    if (!address || !ABI || !library) return null;

    try {
      return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined);
    } catch (error) {
      return null;
    }
  }, [address, ABI,  library, withSignerIfPossible, account]);
};

export const useErc20Contract = (address?: string | undefined | null, withSignerIfPossible?: boolean) => useContract(address, erc20, withSignerIfPossible);

export const useStakingContract = (address?: string | undefined | null, isHidden = false,  withSignerIfPossible?: boolean) => useContract(address, isHidden ? secretStaking : staking, withSignerIfPossible);
