import "rc-slider/assets/index.css";
import React, { useEffect } from "react";
import Slider from "rc-slider";
import Modal from "react-modal";
import Button from "../../../../../components/ui/universal/Button";
import Spacer from "../../../../../components/ui/universal/Spacer";
import { modalCustomStyle } from "../../../../../definitions";
import { ReactComponent as CloseIcon } from "./assets/icons/close.svg";
import { ReactComponent as CurrencyIcon } from "./assets/icons/currency.svg";
import { AmountInputWithUsd } from "../AmountInputWithUsd";
import * as StakeUtils from "../../../../../hooks/useStakeModalLogic";
import { useStakeModalLogic } from "../../../../../hooks/useStakeModalLogic";

const UnstakeFromPoolModalComponent = (props: StakeUtils.StakeInPoolProps) => {
  const { isOpened, closeModal, balanceTreatment, setPayAmount, payAmount, confirmHandler, counters, hashPrice } =
    useStakeModalLogic(props);

  useEffect(() => {
    if (payAmount === "" || +payAmount === 0 || +payAmount > counters.staked) {
      setPayAmount(String(counters?.staked || 0));
    }
  }, [counters, setPayAmount]);

  const renderMainPart = () => (
    <div className="StakeInPool">
      <div className="StakeInPool_header">
        <div className="title">Unstake</div>
        <div className="close" onClick={closeModal}>
          <CloseIcon />
        </div>
      </div>
      <div className="StakeInPool_caption-block">
        <div className="StakeInPool_caption-block_name">
          <span>Unstake</span>
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
        <span>Staked: {counters.staked}</span>
      </div>
      <Spacer size={2} />
      <div>
        <Slider
          handleStyle={StakeUtils.sliderHandleStyle}
          trackStyle={StakeUtils.sliderTrackStyle}
          disabled={!counters?.staked}
          defaultValue={0}
          value={+payAmount}
          max={+counters?.staked || 0}
          onChange={(value: number) => {
            setPayAmount(String(value));
          }}
        />
      </div>
      <Spacer size={6} />
      <div className="display_flex w-100" style={+balanceTreatment === 0 ? { display: "none" } : {}}>
        {[25, 50, 75].map((item, key) => [
          <Button
            key={`keyUnStakeUtilButton${key * item}`}
            size="small"
            rounded
            mode="outline"
            disabled={!counters?.staked}
            onClick={() => {
              setPayAmount(String(((+counters?.staked || 0) / 100) * item));
            }}>
            {item}%
          </Button>,
          <Spacer size={2} direction="horizontal" key={`keyStakeUtilButtonAfter${key * item}`} />,
        ])}
        <Button
          size="small"
          rounded
          mode="outline"
          disabled={!counters?.staked}
          onClick={() => {
            setPayAmount(String(counters?.staked || 0));
          }}>
          MAX
        </Button>
      </div>
      <Spacer size={4} />
      <div>
        <Button
          disabled={+payAmount === 0}
          size="biggest"
          mode="secondary"
          rounded
          fullWidth
          onClick={() => confirmHandler(payAmount)}>
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
      contentLabel="Unstake from pool"
      onRequestClose={closeModal}>
      <div className="StakeInPool-bg">
        <div className="StakeInPool-wrapper">{renderMainPart()}</div>
      </div>
    </Modal>
  );
};

export const UnstakeFromPool = React.memo(UnstakeFromPoolModalComponent);
