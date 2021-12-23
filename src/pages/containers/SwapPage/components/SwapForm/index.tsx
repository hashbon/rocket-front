import "./index.scss";
import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "react-modal";
import { useWeb3React } from "@web3-react/core";
import useLangs from "../../../../../hooks/useLangs";
import Input from "../../../../../components/ui/universal/Input";
import Button from "../../../../../components/ui/universal/Button";
import * as Modals from "../../../../../components/ui/universal/Modals";
import useGetTokens from "../../../../../hooks/useGetTokens";
import useGetNetworks from "../../../../../hooks/useGetNetworks";
import { shortenTransaction, toPowAndHex } from "../../../../../services/web3network/utils";
import { checkChain } from "../../../../../utils/checkChain";
import Spacer from "../../../../../components/ui/universal/Spacer";
import { Offer as OfferType } from "../../../../../store/actions/orders-actions/orders-actions.model";
import { ordersActions } from "../../../../../store/actions";
import { SmartSwap } from "../../../../../components/common/SmartSwap";
import { StepListItemComponent } from "../../../../../components/common/SmartSwap/smart-swap";
import { switchMatch } from "../../../../../utils";
import { getHashBridgeContract } from "../../../../../services/web3network/utils/contractHelpers";
import { getHashBridgeAddress } from "../../../../../services/web3network/utils/addressHelper";
import { errorHandler } from "../../../../../services/web3network/utils/errorHandler";
import { ReactComponent as DownIcon } from "./assets/icons/down-icon.svg";
import { ReactComponent as ArrowDownIcon } from "./assets/icons/arrow-down.svg";
import Offer from "./components/Offer";
import useWeb3Auth from "../../../../../services/web3network/hooks/useWeb3Auth";
import { ConnectorNames } from "../../../../../services/web3network/types";
import { customStyles } from "../../../../../utils/modalStyles";

export interface SwapFormItem {
  netId: number;
  tokenId: number;
}

export interface SwapFormType {
  from: SwapFormItem;
  to: SwapFormItem;
}

export enum FormSteps {
  DRAFT = "draft",
  CONFIRMATION = "confirmation",
  CREATION = "creation",
  SUCCESS = "success",
}

const SwapForm = () => {
  const { active, account, chainId, library } = useWeb3React();
  const { login } = useWeb3Auth();
  const { languages } = useLangs();
  const { getTokenById } = useGetTokens();
  const { getNetworkById } = useGetNetworks();
  const [formStep, setFormStep] = useState(FormSteps.DRAFT);
  const [amount, setAmount] = useState("");
  const [payAmount, setPayAmount] = useState("");
  const [usedPay, setUsedPay] = useState(false);
  const [foundOffer, setFoundOffer] = useState<OfferType | null>(null);
  const [transactionHash, setTransactionHash] = useState("");
  const swapForm = useSelector((state: { common: { swapFrom: SwapFormType } }) => state.common.swapFrom);
  const offers = useSelector((state: { common: { offers: OfferType[] } }) => state.common.offers);
  const dispatch = useDispatch();

  const resetForm = () => {
    setFormStep(FormSteps.DRAFT);
    setPayAmount("0");
    setAmount("0");
    setFoundOffer(null);
  };

  const filteredOffers = useMemo(
    () =>
      offers
        .filter(
          (offer) =>
            offer.active &&
            offer.amount > 0 &&
            offer.payToken.netId === swapForm.from.netId &&
            offer.payToken.id === swapForm.from.tokenId &&
            offer.token.netId === swapForm.to.netId &&
            offer.token.id === swapForm.to.tokenId,
        )
        .sort((a, b) => a.rate - b.rate),
    [offers, swapForm.from.netId, swapForm.from.tokenId, swapForm.to.netId, swapForm.to.tokenId],
  );

  const checkAmount = (value: string): boolean => {
    if (!value.match(/^\d{0,15}(\.\d{0,15}){0,1}$/)) return false;
    return !Number.isNaN(Number(value));
  };

  const payAmountChangeHandler = (value: string) => {
    if (!checkAmount(value)) return false;
    setPayAmount(value);

    if (!swapForm.from.tokenId || !swapForm.to.tokenId) {
      return false;
    }

    const floatValue = Number.parseFloat(value);

    const offersPrimary = filteredOffers.filter(
      (item) => floatValue <= item.maxPurchasePrice && floatValue >= item.minPurchasePrice,
    );

    setUsedPay(true);
    if (offersPrimary.length === 0) {
      setFoundOffer(null);
      setAmount("");
    } else {
      const offer = offersPrimary[0];
      // eslint-disable-next-line no-restricted-properties
      const decimals = Math.pow(10, offer.token.decimals);
      setFoundOffer(offer);
      setAmount(String(Math.round((floatValue * decimals) / offer.rate) / decimals));
    }

    return false;
  };

  useEffect(() => {
    payAmountChangeHandler(payAmount);
  }, [swapForm.to.tokenId]);

  useEffect(() => {
    setFormStep(FormSteps.DRAFT);
  }, [payAmount, amount]);

  const renderOffer = () => {
    if (
      swapForm.from.tokenId &&
      swapForm.to.tokenId &&
      (parseFloat(amount) > 0 || parseFloat(payAmount) > 0) &&
      foundOffer
    ) {
      return <Offer offer={foundOffer as unknown as OfferType} />;
    }
    return <></>;
  };

  const onCreate = async () => {
    if (chainId !== swapForm.to.netId || foundOffer === null) return;

    const bridgeContract = getHashBridgeContract(getHashBridgeAddress(chainId), chainId, library.getSigner());

    if (bridgeContract && foundOffer) {
      setFormStep(FormSteps.CONFIRMATION);
      bridgeContract
        .addOrder(
          (foundOffer as unknown as OfferType).idInContract,
          account,
          toPowAndHex(usedPay ? 0 : amount, (foundOffer as unknown as OfferType).token.decimals),
          toPowAndHex(usedPay ? payAmount : 0, (foundOffer as unknown as OfferType).payToken.decimals),
          { from: account },
        )
        .then((result: any) => {
          if (result.hash) {
            setTransactionHash(result.hash);
            setFormStep(FormSteps.CREATION);
            dispatch(
              ordersActions.addAwaitingOrder({
                transactionHash: result.hash,
                amount,
                payAmount,
                fromTokenId: swapForm.from.tokenId,
                toTokenId: swapForm.to.tokenId,
              }),
            );
          }
          result
            .wait()
            .then(() => {
              setFormStep(FormSteps.SUCCESS);
            })
            .catch((error: any) => {
              console.error("Receipt Error:", error.message);
            });
        })
        .catch((error: any) => {
          setFormStep(FormSteps.DRAFT);
          errorHandler(error);
        });
    }
  };

  const amountChangeHandler = (value: string) => {
    if (!checkAmount(value)) return false;
    setAmount(value);

    if (!swapForm.from.tokenId || !swapForm.to.tokenId) {
      return false;
    }

    const floatValue = Number.parseFloat(value);

    const offersPrimary = filteredOffers.filter(
      (item) => floatValue <= item.freeAmount && floatValue >= item.minPurchase,
    );

    setUsedPay(false);
    if (offersPrimary.length === 0) {
      setFoundOffer(null);
      setPayAmount("");
    } else {
      const offer = offersPrimary[0];
      // eslint-disable-next-line no-restricted-properties
      const decimals = Math.pow(10, offer.payToken.decimals);
      setFoundOffer(offer);
      setPayAmount(String(Math.floor(floatValue * decimals * offer.rate) / decimals));
    }

    return false;
  };

  const onChangeChain = () => {
    checkChain(chainId, swapForm.to.netId, getNetworkById(swapForm.to.netId));
  };

  const onSelectPayToken = () => {
    const params = {
      onCloseHandler: () => {
        payAmountChangeHandler(payAmount);
      },
    };
    Modals.open("selectToken", { type: "from" }, {}, params);
  };

  const onSelectToken = () => {
    const params = {
      onCloseHandler: () => {
        amountChangeHandler(amount);
      },
    };
    Modals.open("selectToken", { type: "to" }, {}, params);
  };

  const renderSelectTokenButton = (text: string, onClick: () => void, circle = false) => (
    <button className="SwapForm_select" style={!circle ? { margin: "auto" } : {}} onClick={onClick}>
      {circle && (
        <div className="circle">
          <span>?</span>
        </div>
      )}
      <div className="text">{text}</div>
      <div className="icon">
        <DownIcon />
      </div>
    </button>
  );

  const renderAddOrderButton = () => {
    let heading = "Connect to wallet";
    let description = "";
    let disabled = false;
    let call = () => login(ConnectorNames.Injected);

    if (active) {
      heading = "Pool not found";
      description = "enter a different value";
      disabled = true;
      call = () => {};

      if (foundOffer !== null) {
        heading = languages["swap.form.button.create"];
        description = "OFFER";
        disabled = false;
        call = () => onCreate();
      }

      if (swapForm.to.netId && swapForm.to.netId !== chainId) {
        heading = "Need change network";
        description = "";
        disabled = false;
        call = () => onChangeChain();
      }
    }

    return (
      <Button
        style={{ width: "100%" }}
        mode={"secondary"}
        rounded
        shadow
        size="biggest"
        fullWidth
        onClick={call}
        state={formStep === FormSteps.CREATION ? "loading" : ""}
        disabled={formStep !== FormSteps.DRAFT || disabled || parseFloat(amount) * parseFloat(payAmount) === 0}>
        {heading}
        {description === "OFFER" ? renderOffer() : <div style={{ fontSize: "13px", marginTop: 2 }}>{description}</div>}
      </Button>
    );
  };

  const renderModalWaitingForConformation = () => (
    <Modal isOpen={FormSteps.CONFIRMATION === formStep} style={customStyles} contentLabel="Waiting for confirmation">
      <h2>Waiting for confirmation</h2>
      <p>Confirm your actions in wallet</p>
    </Modal>
  );

  const renderModalCreateOrder = () => {
    const link =
      switchMatch((swapForm.to.netId ?? "").toString(), {
        "1": "https://etherscan.io/tx/",
        "4": "https://rinkeby.etherscan.io/tx/",
        "56": "https://bscscan.com/tx/",
        "97": "https://testnet.bscscan.com/tx/",
      }) + transactionHash;

    return (
      <Modal
        isOpen={[FormSteps.CREATION, FormSteps.SUCCESS].includes(formStep)}
        contentLabel="Create Order"
        onRequestClose={() => {
          if (FormSteps.SUCCESS !== formStep) {
            return;
          }
          resetForm();
        }}
        style={customStyles}>
        <SmartSwap
          title="Create Order"
          description={
            <p>
              {`Swap ${payAmount} ${getTokenById(swapForm.from.tokenId).symbol} (${
                getNetworkById(swapForm.from.netId).name
              }) to ${amount} ${getTokenById(swapForm.to.tokenId).symbol} (${getNetworkById(swapForm.to.netId).name})`}
            </p>
          }
          formStep={formStep}
          fromNetId={swapForm.to.netId}
          firstStepContent={
            <div>
              {
                <StepListItemComponent
                  title={
                    <div>
                      <div>
                        <strong>{getNetworkById(swapForm.to.netId).name}</strong> Reserve
                      </div>
                    </div>
                  }
                  subTitle={<div>{shortenTransaction(transactionHash, 6)}</div>}
                  shareLink={link}
                />
              }
            </div>
          }
        />
      </Modal>
    );
  };

  return (
    <>
      {renderModalWaitingForConformation()}
      {renderModalCreateOrder()}
      {/* input From begin */}
      <div className="InputGroup_Label">From {getNetworkById(swapForm.from.netId).name}</div>
      <div className="SwapForm_InputGroup">
        <div className="InputGroup_Button">
          {renderSelectTokenButton(
            swapForm.from.netId && swapForm.from.tokenId
              ? `${getTokenById(swapForm.from.tokenId).symbol || getTokenById(swapForm.from.tokenId).name}`
              : "Select network and token",
            onSelectPayToken,
            !!(swapForm.from.netId && swapForm.from.tokenId),
          )}
        </div>

        {swapForm.from.netId && swapForm.from.tokenId && (
          <div className="InputGroup_Input">
            <Input
              autoComplete="off"
              name="amount"
              mode="swap"
              placeholder="0.0"
              value={payAmount}
              onChangeHandler={payAmountChangeHandler as any}
            />
          </div>
        )}
      </div>
      {/* input From end */}

      <Spacer size={4} />

      {/* input To begin */}
      <div className="w-100 display_flex relative">
        <div className="InputGroup_Label">To {getNetworkById(swapForm.to.netId).name}</div>
        <div className="InputGroup_Label_icon">
          <ArrowDownIcon />
        </div>
      </div>
      <div className="SwapForm_InputGroup">
        <div className="InputGroup_Button">
          {renderSelectTokenButton(
            swapForm.to.netId && swapForm.to.tokenId
              ? `${getTokenById(swapForm.to.tokenId).symbol || getTokenById(swapForm.to.tokenId).name}`
              : "Select network and token",
            onSelectToken,
            !!(swapForm.to.netId && swapForm.to.tokenId),
          )}
        </div>
        {swapForm.to.netId && swapForm.to.tokenId && (
          <div className="InputGroup_Input">
            <Input
              autoComplete="off"
              name="amount"
              mode="swap"
              placeholder="0.0"
              value={amount}
              onChangeHandler={amountChangeHandler as any}
            />
          </div>
        )}
      </div>
      {/* input To end */}

      <Spacer size={6} />

      <div className="SwapFormFooter">
        <div className="SwapFormFooter_Button">{renderAddOrderButton()}</div>
      </div>
      <Spacer size={2} />
    </>
  );
};

export default SwapForm;
