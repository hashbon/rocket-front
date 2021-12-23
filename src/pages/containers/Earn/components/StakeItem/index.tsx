import "./index.scss";
import React, { useCallback, useEffect, useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import cogoToast from "cogo-toast";
import { useWeb3React } from "@web3-react/core";
import { useSelector } from "react-redux";
import Modal from "react-modal";
import { ReactComponent as RocketLogo } from "../../../../../static/images/svg/rocket_logo.svg";
import { nFormatter } from "../../../../../utils/nFormatter";
import router5 from "../../../../../router";
import { PAGE_ROUTES } from "../../../../../definitions";
import { BlockChainConfig } from "../../../../../store/reducers/common/model";
import { useStake } from "../../../../../hooks/useStake";
import { checkChain } from "../../../../../utils/checkChain";
import { lsGet } from "../../../../../services";
import { AddressZero } from "../../../../../services/web3network/constants/misc";
import { EarnBlock } from "../EarnBlock";
import Button from "../../../../../components/ui/universal/Button";
import { ModalWrapper } from "../../../../../components/common/ModalWrapper";
import { StakeInPoolModal } from "../StakeInPool";
import { UnstakeFromPool } from "../UnStakeFromPool";
import { customStyles } from "../../../../../utils/modalStyles";
import { ReactComponent as LoaderIcon } from "../../../../../components/common/SmartSwap/assets/icons/loading.svg";
import { Notification } from "../../../../../components/ui/universal/Notification";
import { ReactComponent as WarningSVG } from "../../../PoolsPage/assets/images/warning.svg";

interface StakeItemProps {
  stakeContract: string;
}

export const StakeItem = (props: StakeItemProps) => {
  const [showCollectModal, setShowCollectModal] = useState(false);
  const [showStakeModal, setShowStakeModal] = useState(false);
  const [showUnstakeModal, setShowUnstakeModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showTransactionModal, setShowTransactionModal] = useState(false);
  const { account, chainId } = useWeb3React();
  const nets = useSelector(
    (state: { common: { blockchainConfig: BlockChainConfig } }) => state.common.blockchainConfig,
  );

  const contractAddress = props.stakeContract;

  const { common: commonState } = useSelector((state: any) => state);
  const hashPrice = parseFloat(commonState.hashPrice);
  const {
    isCorrectChain,
    counters,
    approved,
    sendApprove,
    sendStake,
    sendUnStake,
    sendCollect,
    sendCompound,
    isAllowShowStake,
    supportsPartners,
    contractChainId,
    isHidden,
    maxStakingLimit,
  } = useStake(contractAddress);
  const [refLink, setRefLink] = useState("");

  useEffect(() => {
    if (account) {
      setRefLink(`${window.location.origin}/stake?ref=${account}`);
    }
  }, [account]);

  const changeChain = () => {
    checkChain(chainId, contractChainId, nets[contractChainId], () => {});
  };

  const callback = (eventName: string) => ({
    onConfirm: () => {
      setShowConfirmationModal(false);
      setShowTransactionModal(true);
    },
    onReceipt: () => {
      const { gtag } = window;
      if (typeof gtag === "function") {
        gtag("event", `event_${eventName}`);
      }
      setShowTransactionModal(false);
    },
    onError: () => {
      setShowConfirmationModal(false);
      setShowTransactionModal(false);
    },
  });

  const onEnable = () => {
    setShowConfirmationModal(true);
    sendApprove(callback("enable_stake"));
  };

  const onStake = useCallback(
    (amount) => {
      const partnerAddress = lsGet("partner") || AddressZero;
      const referralId = +(lsGet("from_id") || "0");
      setShowStakeModal(false);
      setShowConfirmationModal(true);
      sendStake(
        {
          amount,
          partnerAddress,
          referralId,
        },
        callback("stake"),
      );
    },
    [sendStake],
  );

  const onUnStake = useCallback(
    (amount) => {
      setShowUnstakeModal(false);
      setShowConfirmationModal(true);
      sendUnStake(
        {
          amount,
        },
        callback("unstake"),
      );
    },
    [sendUnStake],
  );

  const onHarvest = useCallback(() => {
    setShowConfirmationModal(true);
    sendCollect(callback("harvest"));
  }, [sendCollect]);

  const onCompound = useCallback(() => {
    setShowConfirmationModal(true);
    sendCompound(callback("compound"));
  }, [sendCompound]);

  const renderEnableButton = () => (
    <EarnBlock label="Enable pool">
      <Button rounded mode="white" onClick={onEnable}>
        Enable
      </Button>
    </EarnBlock>
  );

  const renderStages = () => (
    <>
      {parseFloat(counters.staked) === 0 && (
        <EarnBlock label="HASH Staked">
          <Button
            rounded
            mode="white"
            onClick={() => {
              setShowStakeModal(true);
            }}>
            Stake
          </Button>
        </EarnBlock>
      )}
      {parseFloat(counters.staked) > 0 && (
        <EarnBlock label="HASH Staked" labelCount={nFormatter(parseFloat(counters.staked), 2)}>
          <div className="EarnBlock__rangeButtons">
            <Button
              rounded
              size="small"
              mode="white"
              onClick={() => {
                setShowUnstakeModal(true);
              }}>
              -
            </Button>
            <Button
              rounded
              size="small"
              mode="white"
              onClick={() => {
                setShowStakeModal(true);
              }}>
              +
            </Button>
          </div>
        </EarnBlock>
      )}
      <EarnBlock label="HASH Earned" labelCount={nFormatter(parseFloat(counters.profit), 2)}>
        <Button
          rounded
          mode="white"
          onClick={() => {
            setShowCollectModal(true);
          }}
          disabled={parseFloat(counters.profit) === 0}>
          Collect
        </Button>
      </EarnBlock>
    </>
  );

  const isCompoundDisable = isHidden ? maxStakingLimit < counters.profit : parseFloat(counters.profit) === 0;
  const renderModals = () => (
    <>
      <ModalWrapper
        title={"Collect"}
        isOpen={showCollectModal}
        onClose={() => {
          setShowCollectModal(false);
        }}>
        <div className="ModalCollect">
          <div className="ModalCollect_EarnedLabel">Earned</div>
          <div className="ModalCollect_EarnedValue">{nFormatter(parseFloat(counters.profit), 2)} HASH</div>
          <div className="ModalCollect_EarnedValueUSD">
            ~{nFormatter(parseFloat(counters.profit) * hashPrice, 2)} USD
          </div>
          <div className="ModalCollect_action">
            <Button fullWidth rounded mode="white" onClick={onHarvest} disabled={parseFloat(counters.profit) === 0}>
              Harvest
            </Button>
            <div className="ModalCollect_description">Collect HASH and send to wallet</div>
          </div>
          <div className="ModalCollect_action">
            <Button fullWidth rounded mode="white" onClick={onCompound} disabled={isCompoundDisable}>
              Compound
            </Button>
            <div className="ModalCollect_description">Collect and restake HASH into pool</div>
          </div>
        </div>
      </ModalWrapper>

      <StakeInPoolModal
        isOpened={showStakeModal}
        setIsOpened={setShowStakeModal}
        confirmHandler={onStake}
        counters={counters}
        contractAddress={contractAddress}
      />
      <UnstakeFromPool
        isOpened={showUnstakeModal}
        setIsOpened={setShowUnstakeModal}
        confirmHandler={onUnStake}
        contractAddress={contractAddress}
      />

      <Modal isOpen={showConfirmationModal} style={customStyles} contentLabel="Waiting for confirmation">
        <h2>Waiting for confirmation</h2>
        <p>Confirm your actions in wallet</p>
      </Modal>
      <Modal isOpen={showTransactionModal} style={customStyles} contentLabel="Waiting for transaction">
        <h2>Waiting for transaction</h2>
        <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <div style={{ height: "100px", width: "100px" }}>
            <LoaderIcon />
          </div>
        </div>
      </Modal>
    </>
  );

  let content;

  if (!account) {
    content = (
      <Notification reverse={true} icon={<WarningSVG />}>
        <p>You need to connect to the wallet</p>
      </Notification>
    );
  } else if (isCorrectChain) {
    content = approved ? renderStages() : renderEnableButton();
  } else {
    content = (
      <>
        <Notification reverse={true} icon={<WarningSVG />} style={{ padding: "20px 10px" }}>
          <p style={{ marginLeft: 20 }}>This network is not supported switch network in your wallet</p>
        </Notification>
        <div className="EarnPage__chainChange">
          <Button size="large" rounded={true} mode="accent" onClick={changeChain}>
            Change Chain
          </Button>
        </div>
      </>
    );
  }

  if (!isAllowShowStake) {
    return <></>;
  }

  return (
    <>
      {renderModals()}
      <div className="Staking">
        <div className="Staking__top">
          <div className="Staking__top--header">
            <div className="Staking__top--header__logo">
              <RocketLogo />
            </div>
            <div className="Staking__top--header__text">
              <div className="Staking__top--header__heading">{isHidden ? "Secret Staking" : "HASH Token"}</div>
              <div className="Staking__top--header__description">
                {isHidden ? "for Pre-Sale participants" : "Stake & Earn HASH"}
              </div>
            </div>
          </div>
          <div className="Staking__top--counters">
            <div className="Staking__top--counter">
              <div className="Staking__top--counter__heading">APY</div>
              <div className="Staking__top--counter__ceil">{counters.apy}%</div>
            </div>
            <div className="Staking__top--counter">
              <div className="Staking__top--counter__heading">HASH Staked</div>
              <div className="Staking__top--counter__ceil">{nFormatter(parseFloat(counters.staked), 2)}</div>
              <div className="Staking__top--counter__description">
                ~{nFormatter(parseFloat(counters.staked) * hashPrice, 2)} USD
              </div>
            </div>
            <div className="Staking__top--counter">
              <div className="Staking__top--counter__heading">HASH Earned</div>
              <div className="Staking__top--counter__ceil">{nFormatter(parseFloat(counters.profit), 2)}</div>
              <div className="Staking__top--counter__description">
                ~{nFormatter(parseFloat(counters.profit) * hashPrice, 2)} USD
              </div>
            </div>
            <div className="Staking__top--counter">
              <div className="Staking__top--counter__heading">TVL</div>
              <div className="Staking__top--counter__ceil">{nFormatter(parseFloat(counters.tvl), 2)}</div>
              <div className="Staking__top--counter__description">
                ~{nFormatter(parseFloat(counters.tvl) * hashPrice, 2)} USD
              </div>
            </div>
          </div>
          {/* <div className="Staking__top--action"> */}
          {/*  Details <span className="Staking__top--action_tag open">▲</span> */}
          {/* </div> */}
        </div>
        <div className="Staking__earn">
          <div className="Staking__earn--aside">
            <a
              href="https://bscscan.com/token/0xeb1112ac78d537853150e2a07e8b765e29d3f019"
              target="_blank"
              className="Staking__earn--aside__item"
              rel="noreferrer">
              See Token Info
            </a>
            <a
              href={`${nets[contractChainId].explorerUrl}/address/${contractAddress}`}
              target="_blank"
              className="Staking__earn--aside__item"
              rel="noreferrer">
              View Contract
            </a>
            {supportsPartners && (
              <CopyToClipboard
                text={refLink}
                onCopy={() => {
                  cogoToast.info(`Copied: ${refLink}`);
                }}>
                <div className="Staking__earn--aside__item" style={{ cursor: "pointer" }}>
                  Copy Referral Link
                </div>
              </CopyToClipboard>
            )}
            <div
              className="Staking__earn--aside__item"
              style={{ cursor: "pointer" }}
              onClick={() => router5.navigate(PAGE_ROUTES.FAQ)}>
              How To Stake
            </div>
            {supportsPartners && (
              <div
                className="Staking__earn--aside__item"
                style={{ cursor: "pointer" }}
                onClick={() => router5.navigate(PAGE_ROUTES.STAKE_REF_FAQ)}>
                How To Refer and Earn
              </div>
            )}
          </div>
          <div className="Staking__earn--content">{content}</div>
        </div>
      </div>
    </>
  );
};
