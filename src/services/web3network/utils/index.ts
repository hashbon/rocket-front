// eslint-disable-next-line import/no-extraneous-dependencies
import { getAddress, isAddress } from "@ethersproject/address";
import { Contract } from "@ethersproject/contracts";
import { JsonRpcSigner, Web3Provider } from "@ethersproject/providers";
import { AddressZero } from "../constants/misc";

export function isCorrectAddress(value: string): string | false {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
}

export function shortenAddress(address: string, chars = 4): string {
  const parsed = isCorrectAddress(address);
  if (!parsed) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }
  return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`;
}

export function shortenTransaction(hash: string, chars = 4): string {
  return `${hash.substring(2, chars)}...${hash.substring(66 - chars)}`;
}

// account is not optional
export function getSigner(library: Web3Provider, account: string): JsonRpcSigner {
  return library.getSigner(account).connectUnchecked();
}

// account is optional
export function getProviderOrSigner(library: Web3Provider, account?: string): Web3Provider | JsonRpcSigner {
  return account ? getSigner(library, account) : library;
}

export function getContract(address: string, ABI: any, library: Web3Provider, account?: string): Contract {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }

  return new Contract(address, ABI, getProviderOrSigner(library, account) as any);
}

export function toPowAndHex(value: number | string, pow: number | string | null = 18) {
  const parts = value.toString().split(".");
  const cf = (parts.length < 2) ? 1 : (10 ** parts[1].length);
  return  `0x${ Math.round(Number(value) * cf * (10 ** (Number(pow)) / cf)).toString(16)}`;
}
