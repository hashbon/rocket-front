import addresses from "../constants/contracts";
import { Address } from "../types";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const getAddress = (address: Address, chainId = 1): string => address[chainId];

export const getHashBridgeAddress = (chainId: number | undefined) => getAddress(addresses.hashBridge, chainId);

export const getHashSaleAddress = (chainId: number) => getAddress(addresses.hashSale, chainId);

export const getHashAddress = (chainId: number) => getAddress(addresses.hash, chainId);