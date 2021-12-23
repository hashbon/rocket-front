import { ethers } from "ethers";
import { isAddress } from "web3-utils";
import { getSimpleRpcProvider } from "./providers";
import erc20 from "../contracts/erc20.json";
import hashbridge from "../contracts/hashbridge.json";
import hashsale from "../contracts/hashsale.json";
import staking from "../contracts/staking.json";
import secretStaking from "../contracts/secret-staking.json";

import { AddressZero } from "../constants/misc";

const getContract = (abi: any, address: string, chainId = 1, signer?: ethers.Signer | ethers.providers.Provider) => {
  if (!isAddress(address || "") || address === AddressZero) {
    return null;
  }

  const signerOrProvider = signer || getSimpleRpcProvider(chainId);
  return new ethers.Contract(address, abi, signerOrProvider);
};

export const getErc20Contract = (address: string, chainId?: number, signer?: ethers.Signer | ethers.providers.Provider) => getContract(erc20, address, chainId, signer);

export const getHashBridgeContract = (address: string, chainId?: number, signer?: ethers.Signer | ethers.providers.Provider) => getContract(hashbridge, address, chainId, signer);

export const getHashSaleContract = (address: string, chainId?: number, signer?: ethers.Signer | ethers.providers.Provider) => getContract(hashsale, address, chainId, signer);

export const getHashStakingContract = (address: string, chainId?: number, isHidden = false, signer?: ethers.Signer | ethers.providers.Provider) => getContract(isHidden ? secretStaking : staking, address, chainId, signer);
