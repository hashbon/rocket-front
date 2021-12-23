import { useEffect } from "react";
import useWeb3Auth from "./useWeb3Auth";
import { connectorLocalStorageKey } from "../utils/web3react";
import { ConnectorNames } from "../types";

const useEagerConnect = () => {
  const { login } = useWeb3Auth();

  useEffect(() => {
    const connectorId = window.localStorage.getItem(connectorLocalStorageKey) as ConnectorNames;
    if (connectorId) {
      login(connectorId);
    }
  }, [login]);
};

export default useEagerConnect;