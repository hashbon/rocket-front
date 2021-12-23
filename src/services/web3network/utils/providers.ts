import { ethers } from "ethers";
import { RPC_URLS } from "./web3react";

export const getSimpleRpcProvider = (chainId = 1) => new ethers.providers.JsonRpcProvider(RPC_URLS[chainId]);
