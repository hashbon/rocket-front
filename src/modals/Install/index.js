import React from "react";
// eslint-disable-next-line import/no-unresolved
import Button from "../../components/ui/universal/Button";

const Install = (props) => (
  <div>
    <div>
      <div className="SwitchChain">
        <span className="SwitchChain_title">Install Metamask</span>

        <span className="SwitchChain_subtitle">To purchase and further work with HASH token, install a wallet</span>

        <div style={{ marginTop: 16 }}>
          <Button
            onClick={() => {
              window.open("https://metamask.io", "_blank");
              props.close();
            }}
            rounded={false}
            size="large"
            beforeContent={
              <img
                style={{ marginRight: 10 }}
                width={30}
                src="https://app.uniswap.org/static/media/metamask.02e3ec27.png"
                alt="Metamask"
              />
            }>
            Install Metamask
          </Button>
        </div>
      </div>
    </div>
  </div>
);

export default Install;
