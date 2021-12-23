import "./index.scss";
import React, { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import { useSelector } from "react-redux";

const SwitchChainModal = (props: any) => {
  const { chainId } = useWeb3React();
  const blockchainConfig = useSelector((state: any) => state.common.blockchainConfig);
  const { close, needed } = props;

  useEffect(() => {
    if (close && chainId === needed) {
      close();
    }
  }, [chainId, close, needed]);

  const getNetName = (id: any) => {
    if (id in blockchainConfig) {
      return blockchainConfig[id].name;
    }
    return "";
  };

  return (
    <div className="SwitchChain">
      {!!close && (
        <button className="SwitchChain_close-icon" onClick={() => close()}>
          <img src={close} alt="" />
        </button>
      )}
      <span className="SwitchChain_title">Please switch to {getNetName(needed)}</span>
      <span className="SwitchChain_subtitle">
        Please switch to {getNetName(needed)} chain before proceeding to the next step
      </span>
    </div>
  );
};

export default SwitchChainModal;
