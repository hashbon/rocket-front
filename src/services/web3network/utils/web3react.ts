import { ethers } from "ethers";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { InjectedConnector } from "@web3-react/injected-connector";
import { ConnectorNames } from "../types";

const POLLING_INTERVAL = 12000;

type RPCURLS = {
  [key: number]: string;
};

export const RPC_URLS: RPCURLS = {
  1: "https://eth.getblock.io/mainnet/?api_key=139f8680-11ae-492f-bffa-63698a733319",
  4: "https://eth.getblock.io/rinkeby/?api_key=4c7e9645-73a8-408c-8c93-7fd87de4835c",
  56: "https://bsc-dataseed.binance.org/",
  97: "https://data-seed-prebsc-1-s1.binance.org:8545/",
};

export const connectorLocalStorageKey = "connectorId";

const injected = new InjectedConnector({ supportedChainIds: [1, 4, 56, 97] });

const walletconnect = new WalletConnectConnector({
  rpc: RPC_URLS,
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
});

export const connectorsByName: { [connectorName in ConnectorNames]: any } = {
  [ConnectorNames.Injected]: injected,
  [ConnectorNames.WalletConnect]: walletconnect,
};

export const getLibrary = (provider: any): ethers.providers.Web3Provider => {
  const library = new ethers.providers.Web3Provider(provider);
  library.pollingInterval = POLLING_INTERVAL;
  return library;
};

export const signMessage = async (provider: any, account: string, message: string): Promise<string> => {
  /**
   * Wallet Connect does not sign the message correctly unless you use their method
   * @see https://github.com/WalletConnect/walletconnect-monorepo/issues/462
   */
  if (provider.provider?.wc) {
    const wcMessage = ethers.utils.hexlify(ethers.utils.toUtf8Bytes(message));
    return provider.provider?.wc.signPersonalMessage([wcMessage, account]);
  }

  return provider.getSigner(account).signMessage(message);
};
