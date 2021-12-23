import "./index.scss";
import React, { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import cogoToast from "cogo-toast";
import { ReactComponent as FoxSVG } from "./assets/fox.svg";
import router5 from "../../../router";
import { PAGE_ROUTES } from "../../../definitions";
import { injected } from "../../../services/web3network/connectors";

export const InstallPluginPage = () => {
  const web3React = useWeb3React();

  useEffect(() => {
    if (web3React.active) {
      router5.navigate(PAGE_ROUTES.SWAP);
    }
  }, [web3React.active]);

  const onConnect = () => {
    if (window.ethereum?.isMetaMask) {
      web3React.activate(injected);
    } else {
      cogoToast.error("No provider was found", { position: "top-right", heading: "Provider Error", hideAfter: 10 });
    }
  };

  return (
    <section className="InstallPluginPage">
      <p className="InstallPluginPage__hint">To purchase and further work with HASH token, install a wallet</p>

      <h2 className="InstallPluginPage__heading">Connect wallet</h2>

      <a className="InstallPluginPage__link" href="https://metamask.io" target="_blank" rel="noreferrer">
        <FoxSVG className="InstallPluginPage__icon" />
        <span className="InstallPluginPage__link-text">Install Metamask</span>
      </a>

      <div
        style={{ padding: "10px", margin: "10px", border: "1px solid white", borderRadius: "10px", cursor: "pointer" }}
        onClick={onConnect}>
        Connect
      </div>
    </section>
  );
};
