import "./index.scss";
import React, { useEffect } from "react";
import { useWeb3React } from "@web3-react/core";
import Input from "../../../../../components/ui/universal/Input";
import Button from "../../../../../components/ui/universal/Button";
import logoBinance from "../../../LandingMainPage/nets/logo_binance.svg";
import logoEthereum from "../../../LandingMainPage/nets/logo_ethereum.svg";
import useGetNetworks from "../../../../../hooks/useGetNetworks";
import useCrowdsaleLogic from "../../hooks/useCrowdsaleLogic";
import { checkChain } from "../../../../../utils/checkChain";
import { toPowAndHex } from "../../../../../services/web3network/utils";
import classNames from "../../../../../utils/classNames";
import * as Modals from "../../../../../components/ui/universal/Modals";
import { injected } from "../../../../../services/web3network/connectors";

const BuyButtons: React.FC = () => {
  const { active, activate } = useWeb3React();
  const { getNetworkById } = useGetNetworks();
  const {
    bnb,
    setBnb,
    bnbTokens,
    eth,
    ethTokens,
    setEth,
    saleContract,
    executeCalculatedTokenAmount,
    isEth,
    isBsc,
    ethLoading,
    setEthLoading,
    bnbLoading,
    setBnbLoading,
    setBnbWaiting,
    agreement,
    executeAgreement,
    agreementSignature,
    signAgreement,
    buyTokens,
    chainId,
    ethChainId,
    bscChainId,
    minPayAmount,
    maxPayAmount,
  } = useCrowdsaleLogic();

  // eslint-disable-next-line no-restricted-properties
  const mathMaxPayAmount = maxPayAmount / Math.pow(10, 18);
  // eslint-disable-next-line no-restricted-properties
  const mathMinPayAmount = minPayAmount / Math.pow(10, 18);

  useEffect(() => {
    if (bnbLoading || ethLoading) {
      if (window.location.href.indexOf("modal") === -1) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        Modals.open("waitingResult");
      }
    }
  }, [bnbLoading, ethLoading]);

  let isWaitMetaMaskConnect = false;

  const setUserAccount = async () => {
    if (isWaitMetaMaskConnect) {
      return;
    } // eslint-disable-next-line no-prototype-builtins
    if (!(window.hasOwnProperty("ethereum") && window.ethereum?.isMetaMask)) {
      Modals.open("install");
      return;
    }
    isWaitMetaMaskConnect = true;
    activate(injected, undefined, true)
      .then(() => {
        isWaitMetaMaskConnect = false;
      })
      .catch((err: Error) => {
        isWaitMetaMaskConnect = false;
        if (err.toString().indexOf("UnsupportedChainIdError") > -1) {
          Modals.open("notSupportChain");
        }
      });
  };

  const ethOnChangeHandler = (value: string) => {
    checkChain(chainId, ethChainId, getNetworkById(ethChainId), () => {
      if (!value.match(/^\d{0,18}(\.\d{0,18}){0,1}$/)) {
        return false;
      }
      setEth(value);
      if (saleContract && executeCalculatedTokenAmount) {
        executeCalculatedTokenAmount(saleContract, [toPowAndHex(value)]);
      }
      return false;
    });
  };

  const bnbOnChangeHandler = (value: string) => {
    checkChain(chainId, bscChainId, getNetworkById(bscChainId), () => {
      if (!value.match(/^\d{0,18}(\.\d{0,18}){0,1}$/)) return false;
      setBnb(value);
      if (saleContract && executeCalculatedTokenAmount) {
        executeCalculatedTokenAmount(saleContract, [toPowAndHex(value)]);
      }
      return false;
    });
  };

  const getSmartySpanOfPayAmount = (payAmount: any) => (
    <span
      style={{ color: "#02a7df", fontWeight: "bold", cursor: "pointer", textDecoration: "underline", margin: "5px" }}
      onClick={() => {
        const val = payAmount.toString();
        if (isEth) {
          ethOnChangeHandler(val);
        } else if (isBsc) {
          bnbOnChangeHandler(val);
        }
      }}>
      {payAmount}
    </span>
  );

  const renderEthError = () => {
    // eslint-disable-next-line no-restricted-properties
    if (isEth && eth !== "" && !(Number(eth) <= mathMaxPayAmount && Number(eth) >= minPayAmount / Math.pow(10, 18))) {
      return (
        <div className="BuyButtons__item-input_error">
          Amount must be between {getSmartySpanOfPayAmount(mathMinPayAmount)}
          {" and "} {getSmartySpanOfPayAmount(mathMaxPayAmount)}
        </div>
      );
    }

    return <></>;
  };
  const renderBnbError = () => {
    // eslint-disable-next-line no-restricted-properties
    if (isBsc && bnb !== "" && !(Number(bnb) <= mathMaxPayAmount && Number(bnb) >= minPayAmount / Math.pow(10, 18))) {
      return (
        <div className="BuyButtons__item-input_error">
          Amount must be between {getSmartySpanOfPayAmount(mathMinPayAmount)}
          {" and "} {getSmartySpanOfPayAmount(mathMaxPayAmount)}
        </div>
      );
    }
    return <></>;
  };
  return (
    <div className="BuyButtons">
      <div className="BuyButtons__item">
        <div
          className={classNames("BuyButtons__item-input", {
            error:
              !!isBsc &&
              bnb !== "" &&
              // eslint-disable-next-line no-restricted-properties
              !(Number(bnb) <= mathMaxPayAmount && Number(bnb) >= minPayAmount / Math.pow(10, 18)),
          })}>
          {renderBnbError()}
          <Input
            mode="embed"
            placeholder="0.0"
            value={bnb}
            onChangeHandler={(value) => {
              bnbOnChangeHandler(String(value));
            }}
            onFocus={(e) => {
              if (!active) {
                e.target.blur();
                setUserAccount();
              } else {
                bnbOnChangeHandler(bnb);
              }
            }}
          />
        </div>
        <div className="BuyButtons__item-side">
          <div className="BuyButtons__item-button">
            <Button
              disabled={!active}
              mode="bnb"
              onClick={() => {
                if (saleContract && !(!isBsc || !bnbTokens || bnbLoading)) {
                  setBnbLoading(true);
                  setBnbWaiting(true);
                  if (!agreement) {
                    executeAgreement(saleContract);
                    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                  } else !agreementSignature ? signAgreement() : buyTokens(bnb);
                }
              }}>
              {bnbLoading ? "Loading..." : `Buy ${bnbTokens} HASH`}
            </Button>
          </div>
          <div className="BuyButtons__item-image">
            <img alt="binance" src={logoBinance} />
          </div>
        </div>
      </div>
      <div className="BuyButtons__item">
        <div
          className={classNames("BuyButtons__item-input", {
            error:
              !!isEth &&
              eth !== "" &&
              // eslint-disable-next-line no-restricted-properties
              !(Number(eth) <= mathMaxPayAmount && Number(eth) >= minPayAmount / Math.pow(10, 18)),
          })}>
          {renderEthError()}
          <Input
            mode="embed"
            placeholder="0.0"
            value={eth}
            onChangeHandler={(value) => {
              ethOnChangeHandler(String(value));
            }}
            onFocus={(e) => {
              if (!active) {
                e.target.blur();
                setUserAccount();
              } else {
                ethOnChangeHandler(eth);
              }
            }}
          />
        </div>
        <div className="BuyButtons__item-side">
          <div className="BuyButtons__item-button">
            <Button
              disabled={!active}
              mode="eth"
              onClick={() => {
                if (saleContract && !(!isEth || !ethTokens || ethLoading)) {
                  setEthLoading(true);
                  setBnbWaiting(false);
                  if (!agreement) {
                    executeAgreement(saleContract);
                  } else if (!agreementSignature) {
                    signAgreement();
                  } else {
                    buyTokens(eth);
                  }
                }
              }}>
              {ethLoading ? "Loading..." : `Buy ${ethTokens} HASH`}
            </Button>
          </div>
          <div className="BuyButtons__item-image">
            <img alt="etherium" src={logoEthereum} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyButtons;
