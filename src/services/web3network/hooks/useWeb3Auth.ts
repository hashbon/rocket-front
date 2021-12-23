import { UnsupportedChainIdError, useWeb3React } from "@web3-react/core";
import { useCallback } from "react";
import { NoEthereumProviderError, UserRejectedRequestError as UserRejectedRequestErrorInjected } from "@web3-react/injected-connector";
import { UserRejectedRequestError as UserRejectedRequestErrorWalletConnect, WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { connectorLocalStorageKey, connectorsByName } from "../utils/web3react";
import { setupNetwork } from "../utils/wallet";
import { ConnectorNames } from "../types";

const useWeb3Auth = () => {
  const { chainId, activate, deactivate } = useWeb3React();

  const login = useCallback(
    (connectorID: ConnectorNames) => {
      const connector = connectorsByName[connectorID];
      if (connector) {
        activate(connector, async (error: Error) => {
          if (error instanceof UnsupportedChainIdError) {
            const hasSetup = await setupNetwork();
            if (hasSetup) {
              activate(connector);
            }
          } else {
            window.localStorage.removeItem(connectorLocalStorageKey);
            if (error instanceof NoEthereumProviderError) {
              console.error("Provider Error", "No provider was found");
            } else if (
              error instanceof UserRejectedRequestErrorInjected ||
                            error instanceof UserRejectedRequestErrorWalletConnect
            ) {
              if (connector instanceof WalletConnectConnector) {
                const walletConnector = connector as WalletConnectConnector;
                walletConnector.walletConnectProvider = null;
              }
              console.error("Authorization Error", "Please authorize to access your account");
            } else {
              console.error(error.name, error.message);
            }
          }
        }).then(() => {
          window.localStorage.setItem(connectorLocalStorageKey, connectorID);
        });
      } else {
        console.error("Unable to find connector", "The connector config is wrong");
      }
    },
    [activate],
  );

  const logout = useCallback(() => {
    deactivate();
    // This localStorage key is set by @web3-react/walletconnect-connector
    if (window.localStorage.getItem("walletconnect")) {
      connectorsByName.walletconnect.close();
      connectorsByName.walletconnect.walletConnectProvider = null;
    }
    window.localStorage.removeItem(connectorLocalStorageKey);
  }, [deactivate, chainId]);

  return { login, logout };
};

export default useWeb3Auth;