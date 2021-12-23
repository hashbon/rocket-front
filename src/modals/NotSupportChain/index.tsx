import "./index.scss";
import React, { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { supportedChainIds } from "../../definitions";

const NotSupportChainModal = (props: any) => {
  const { chainId } = useWeb3React();
  const { close } = props;

  useEffect(() => {
    if (close && chainId && supportedChainIds.includes(chainId)) {
      close();
    }
  }, [chainId]);

  return (
    <div className="SwitchChain">
      {!!close && (
        <button className="SwitchChain_close-icon" onClick={() => close()}>
          <img src={close} alt="" />
        </button>
      )}
      <span className="SwitchChain_title">Not support chain</span>
      <span className="SwitchChain_subtitle">Please switch chain in Metamask we support Smart chain and Mainnet</span>
    </div>
  );
};

export default NotSupportChainModal;
