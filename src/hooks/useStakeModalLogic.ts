import { useWeb3React } from "@web3-react/core";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SliderHandle from "../pages/containers/Earn/components/StakeInPool/assets/icons/slider-handle.svg";
import { FetchStatus, useTokenBalance } from "../services/web3network/hooks/useTokenBalance";
import { getHashAddress } from "../services/web3network/utils/addressHelper";
import { getFullDisplayBalance } from "../services/web3network/utils/formatBalance";
import { useStake } from "./useStake";
import { emptyStakingItem } from "../store/reducers/stake";

export type StakeInPoolProps = {
  contractAddress: string
  isOpened?: boolean;
  setIsOpened?: any;
  onChange?: any;
  confirmHandler?: any;
  counters?: any;
};

export const sliderHandleStyle = {
  width: 28,
  height: 28,
  marginTop: "-12px",
  backgroundImage: `url(${SliderHandle})`,
  border: "none",
};

export const sliderTrackStyle = {
  background: "#3794DB",
};

export const useStakeModalLogic = (props: StakeInPoolProps) => {
  const { list }  = useSelector((state: any) => state.stake);
  const { contractAddress } = list ? list.get(props.contractAddress) : emptyStakingItem;
  const { counters, isHidden, maxStakingLimit } = useStake(contractAddress);
  const { isOpened = false, setIsOpened = () => {}, onChange = () => {}, confirmHandler = () => {} } = props;
  const { chainId } = useWeb3React();

  const { hashPrice } = useSelector((state: { common: { hashPrice: any } }) => ({
    hashPrice: state.common.hashPrice,
  }));

  const [payAmount, setPayAmount] = useState("");
  const { balance, fetchStatus: fetchStatusBalance } = useTokenBalance(getHashAddress(chainId || 56));

  let balanceTreatment = String(
    fetchStatusBalance === FetchStatus.SUCCESS ? getFullDisplayBalance(balance, 18, 4) : 0,
  );

  if (isHidden) {
    balanceTreatment = String(Math.min(parseFloat(balanceTreatment), maxStakingLimit));
  }

  useEffect(() => {
    onChange(payAmount);
  }, [payAmount]);

  const closeModal = useCallback(() => setIsOpened(false), [setIsOpened]);

  return {
    isOpened,
    closeModal,
    setPayAmount,
    payAmount,
    fetchStatusBalance,
    FetchStatus,
    confirmHandler,
    balanceTreatment,
    isHidden,
    counters,
    hashPrice,
    useTokenBalance,
  };
};
