import "rc-slider/assets/index.css";
import React, { useState } from "react";
import Slider from "rc-slider";
import Modal from "react-modal";
import Button from "../../../../../components/ui/universal/Button";
import Spacer from "../../../../../components/ui/universal/Spacer";
import { modalCustomStyle } from "../../../../../definitions";
import { FetchStatus } from "../../../../../services/web3network/hooks/useTokenBalance";
import { ReactComponent as CloseIcon } from "./assets/icons/close.svg";
import { ReactComponent as CurrencyIcon } from "./assets/icons/currency.svg";
import { AmountInputWithUsd } from "../AmountInputWithUsd";
import * as StakeUtils from "../../../../../hooks/useStakeModalLogic";
import { useStakeModalLogic } from "../../../../../hooks/useStakeModalLogic";
import { AddressZero } from "../../../../../services/web3network/constants/misc";
import { lsGet } from "../../../../../services";

const StakeInPoolModalComponent = (props: StakeUtils.StakeInPoolProps) => {
  const [partnerAddress, setPartnerAddress] = useState("");
  const {
    isOpened,
    closeModal,
    balanceTreatment,
    isHidden,
    setPayAmount,
    payAmount,
    fetchStatusBalance,
    confirmHandler,
    counters,
    hashPrice,
  } = useStakeModalLogic(props);

  const renderMainPart = () => (
    <div className="StakeInPool">
      <div className="StakeInPool_header">
        <div className="title">Stake in pool</div>
        <div className="close" onClick={closeModal}>
          <CloseIcon />
        </div>
      </div>
      <div className="StakeInPool_caption-block">
        <div className="StakeInPool_caption-block_name">
          <span>Stake</span>
        </div>
        <div className="StakeInPool_caption-block_currency">
          <div className="StakeInPool_caption-block_currency_name">
            <span>HASH</span>
          </div>
          <div className="StakeInPool_caption-block_currency_logo">
            <CurrencyIcon />
          </div>
        </div>
      </div>
      <div className="StakeInPool_input-wrapper">
        <AmountInputWithUsd payAmount={payAmount} setPayAmount={setPayAmount} rate={hashPrice} />
      </div>
      <div className="StakeInPool_balance">
        <span>{isHidden ? "You can stake:" : "Balance:"} {fetchStatusBalance === FetchStatus.SUCCESS ? (+balanceTreatment) : 0}</span>
      </div>
      <Spacer size={2} />
      <div>
        <Slider
          handleStyle={StakeUtils.sliderHandleStyle}
          trackStyle={StakeUtils.sliderTrackStyle}
          disabled={fetchStatusBalance !== FetchStatus.SUCCESS}
          defaultValue={0}
          value={+payAmount}
          max={+balanceTreatment || 0}
          onChange={(value: number) => {
            setPayAmount(String(value));
          }}
        />
      </div>
      <Spacer size={6} />
      {+balanceTreatment === 0 && <div>Your balance: 0 HASH</div>}
      <div className="display_flex w-100" style={+balanceTreatment === 0 ? { display: "none" } : {}}>
        {[25, 50, 75].map((item, key) => [
          <Button
            key={`keyStakeUtilButton${key * item}`}
            size="small"
            rounded
            mode="outline"
            disabled={fetchStatusBalance !== FetchStatus.SUCCESS}
            onClick={() => {
              setPayAmount(String(((+balanceTreatment || 0) / 100) * item));
            }}>
            {item}%
          </Button>,
          <Spacer size={2} direction="horizontal" key={`keyStakeUtilButtonAfter${key * item}`} />,
        ])}
        <Button
          size="small"
          rounded
          mode="outline"
          disabled={fetchStatusBalance !== FetchStatus.SUCCESS}
          onClick={() => {
            setPayAmount(String(balanceTreatment));
          }}>
          MAX
        </Button>
      </div>
      <Spacer size={4} />
      <div>
        <div className="StakeInPool_detail">
          <span>Annual ROI at current rates:</span>{" "}
          <strong>{((+payAmount / 100) * +counters.apy).toFixed(0)} HASH</strong>
        </div>
      </div>
      <Spacer size={4} />
      {!counters.staked && !lsGet("hasStaked") && (
        <>
          <div className="StakeInPool_partner_title">Partner address</div>
          <div className="w-100 display_flex StakeInPool_partner">
            <input
              autoComplete="off"
              name="partner"
              placeholder={AddressZero}
              value={partnerAddress}
              onChange={(data) => {
                const { value } = data.currentTarget;
                setPartnerAddress(value);
              }}
            />
          </div>
          <Spacer size={6} />
        </>
      )}
      <div>
        <Button
          size="biggest"
          mode="secondary"
          rounded
          fullWidth
          disabled={+payAmount === 0}
          onClick={() => confirmHandler(payAmount, partnerAddress.length ? partnerAddress : AddressZero)}>
          Confirm
        </Button>
      </div>
    </div>
  );

  return (
    <Modal
      shouldCloseOnOverlayClick={true}
      isOpen={isOpened}
      style={modalCustomStyle}
      contentLabel="Stake in pool"
      onRequestClose={closeModal}>
      <div className="StakeInPool-bg">
        <div className="StakeInPool-wrapper">{renderMainPart()}</div>
      </div>
    </Modal>
  );
};

export const StakeInPoolModal = React.memo(StakeInPoolModalComponent);
