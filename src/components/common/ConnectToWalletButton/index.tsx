import "./index.scss";
import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { useWeb3React } from "@web3-react/core";
import * as Modals from "../../ui/universal/Modals";
import { shortenAddress } from "../../../services/web3network/utils";
import { supportedChainIds } from "../../../definitions";
import Button from "../../ui/universal/Button";
import useWeb3Auth from "../../../services/web3network/hooks/useWeb3Auth";
import { ConnectorNames } from "../../../services/web3network/types";
// import { FetchStatus, useTokenBalance } from "../../../services/web3network/hooks/useTokenBalance";
// import { getHashAddress } from "../../../services/web3network/utils/addressHelper";
// import { getFullDisplayBalance } from "../../../services/web3network/utils/formatBalance";

interface IConnectToWalletButtonProps {
  showAddress?: boolean;
  type?: "simple" | "landing";
}

const ConnectToWalletButton: React.FC<IConnectToWalletButtonProps> = ({ showAddress = true, type = "simple" }) => {
  const { active, account, chainId } = useWeb3React();
  const [netState, setNetState] = useState(false);
  const { login, logout } = useWeb3Auth();
  // const { balance, fetchStatus } = useTokenBalance(getHashAddress(chainId || 56));
  // const balanceTreatment = String(fetchStatus === FetchStatus.SUCCESS ? getFullDisplayBalance(balance, 18, 4) : 0);

  const connect = (connectorId: ConnectorNames) => {
    login(connectorId);
  };

  const setUserAccount = async () => {
    // FIXME: remove if are ready to start WalletConnect
    // eslint-disable-next-line no-prototype-builtins
    if (!(window.hasOwnProperty("ethereum") && window.ethereum?.isMetaMask)) {
      Modals.open("install");
      return;
    }
    connect(ConnectorNames.Injected);
  };

  useEffect(() => {
    setNetState(Boolean(chainId && supportedChainIds.includes(chainId)));
  }, [chainId]);

  if (type === "landing") {
    return (
      <>
        <Button onClick={active ? logout : setUserAccount}>
          <span>{active ? shortenAddress(account || "") : "Connect wallet"}</span>
        </Button>
      </>
    );
  }
  return (
    <div className="WalletButton">
      {/* {active && (<div className="WalletButton__balance">{fetchStatus === FetchStatus.NOT_FETCHED ? "Loading..." : `${balanceTreatment} HASH`}</div>)} */}
      {showAddress && (
        <div className="WalletButton__button" onClick={active ? logout : setUserAccount}>
          {active ? shortenAddress(account || "") : "Connect wallet"}
        </div>
      )}
      <div className={classNames("WalletButton__indicator", { green: netState, red: !netState })} />
    </div>
  );
};

export default ConnectToWalletButton;
