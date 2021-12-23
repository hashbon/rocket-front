import { useWeb3React } from "@web3-react/core";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import BigNumber from "bignumber.js";
import { useStakingContract } from "../services/web3network/hooks/useContract";
import { ApproveStatus, useApproveHandler } from "../services/web3network/hooks/useApproveHandler";
import { getHashAddress } from "../services/web3network/utils/addressHelper";
import { stakeActions, TYPES } from "../store/actions";
import useCallMethod from "../services/web3network/hooks/web3";
import { signMessage } from "../services/web3network/utils/web3react";
import { AddressZero } from "../services/web3network/constants/misc";
import { toPowAndHex } from "../services/web3network/utils";
import { Web3CallbackInterface } from "../interfaces";
import { errorHandler } from "../services/web3network/utils/errorHandler";
import { getHashStakingContract } from "../services/web3network/utils/contractHelpers";
import { emptyStakingItem } from "../store/reducers/stake";
import { getFullDisplayBalance } from "../services/web3network/utils/formatBalance";

interface SendStakePayload {
  amount: number;
  partnerAddress: string;
  referralId: number;
}

interface SendUnStakePayload {
  amount: number;
}

export const useStake = (contractAddress: string) => {
  const { library, account, chainId } = useWeb3React();
  const { list } = useSelector((state: any) => state.stake);
  const {
    approved,
    counters,
    isUserAgreement,
    chainId: contractChainId,
    isHidden,
    supportsPartners,
  } = list ? list.get(contractAddress) : emptyStakingItem;
  const { data: agreement, execute: executeAgreement } = useCallMethod("AGREEMENT");
  const [agreementSignature, setAgreementSignature] = useState("");
  const [isAllowShowStake, setIsAllowShowStake] = useState(!isHidden);
  const [maxStakingLimit, setMaxStakingLimit] = useState(0.00);
  const [earlyInvestorTokens, setEarlyInvestorTokens] = useState("0");
  const stakeContract = useStakingContract(contractAddress, isHidden);
  const dispatch = useDispatch();
  const isCorrectChain = chainId === contractChainId;
  const { sendApprove, approveStatus, decimals } = useApproveHandler(
    getHashAddress(contractChainId),
    contractAddress,
    isCorrectChain,
    "1000",
  );
  const INTERVAL_TIME = 12 * 1000;
  let interval: ReturnType<typeof setInterval>;

  const signAgreement = () => {
    if (agreement && account) {
      return signMessage(library, account, agreement).then((sign: any) => {
        setAgreementSignature(sign);
        return sign;
      });
    }
    return null;
  };

  const getStaking = () => {
    if (!stakeContract || !account || !isCorrectChain) {
      const contract = getHashStakingContract(contractAddress, contractChainId, isHidden);
      dispatch(stakeActions.getStakeInfo(contract, AddressZero));
      return;
    }
    dispatch(stakeActions.getStakeInfo(stakeContract, account));
  };

  useEffect(() => {
    dispatch({
      type: TYPES.STAKE.SET_APPROVED,
      payload: {
        approved: approveStatus === ApproveStatus.APPROVED,
        contractAddress,
      },
    });
  }, [approveStatus]);

  useEffect(() => {
    if (contractAddress && isAllowShowStake) {
      getStaking();
      interval = setInterval(getStaking, INTERVAL_TIME);
      if (isCorrectChain && stakeContract && account) {
        executeAgreement(stakeContract);
      }
    }
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [account, stakeContract, isCorrectChain, isAllowShowStake]);


  useEffect(() => {

    let contract = stakeContract;
    if (!isCorrectChain) {
      contract = getHashStakingContract(contractAddress, contractChainId, isHidden);
    }

    if (contract && account && isHidden) {
      contract.earlyInvestors(account)
        .then((result: any) => {
          const big = new BigNumber(result.toString());
          if (big.comparedTo(0x00) === 0) {
            setEarlyInvestorTokens("0");
            setIsAllowShowStake(false);
          } else {
            setIsAllowShowStake(true);
            setEarlyInvestorTokens(getFullDisplayBalance(big, 18, 4));
          }
        })
        .catch((err: any) => {
          errorHandler(err);
        });
    }
  }, [isAllowShowStake, isHidden, account]);

  useEffect(() => {
    const calculate = parseFloat(earlyInvestorTokens) - counters.staked;
    setMaxStakingLimit(Math.floor(calculate * 1000) / 1000);
  }, [counters, earlyInvestorTokens]);

  const sendStake = async (payload: SendStakePayload, callback: Web3CallbackInterface) => {
    if (!stakeContract) return null;
    let signature = agreementSignature;
    if (!isUserAgreement && !agreementSignature) {
      signature = await signAgreement();
    }

    let stakeArgs = [
      toPowAndHex(payload.amount, decimals.toString()),
      payload.partnerAddress,
      payload.referralId,
      isUserAgreement ? AddressZero : signature,
    ];
    if (!supportsPartners) {
      stakeArgs = [
        toPowAndHex(payload.amount, decimals.toString()),
        payload.referralId,
        isUserAgreement ? AddressZero : signature,
      ];
    }

    return stakeContract
      .stake(...stakeArgs)
      .then((result: any) => {
        if (callback.onConfirm) callback.onConfirm(result);
        return result.wait();
      })
      .then((result: any) => {
        dispatch(stakeActions.resetProfit(contractAddress));
        if (callback.onReceipt) callback.onReceipt(result);
      })
      .catch((err: any) => {
        errorHandler(err);
        if (callback.onError) callback.onError(err);
      });
  };

  const sendUnStake = async (payload: SendUnStakePayload, callback: Web3CallbackInterface) => {
    if (!stakeContract) return null;
    return stakeContract
      .unstake(toPowAndHex(payload.amount, decimals.toString()))
      .then((result: any) => {
        if (callback.onConfirm) callback.onConfirm(result);
        return result.wait();
      })
      .then((result: any) => {
        dispatch(stakeActions.resetProfit(contractAddress));
        if (callback.onReceipt) callback.onReceipt(result);
      })
      .catch((err: any) => {
        errorHandler(err);
        if (callback.onError) callback.onError(err);
      });
  };


  const sendCompound = async (callback: Web3CallbackInterface) => {
    if (!stakeContract) return null;
    return stakeContract
      .compound()
      .then((result: any) => {
        if (callback.onConfirm) callback.onConfirm(result);
        return result.wait();
      })
      .then((result: any) => {
        dispatch(stakeActions.resetProfit(contractAddress));
        if (callback.onReceipt) callback.onReceipt(result);
      })
      .catch((err: any) => {
        errorHandler(err);
        if (callback.onError) callback.onError(err);
      });
  };

  const sendCollect = async (callback: Web3CallbackInterface) => {
    if (!stakeContract) return null;
    return stakeContract
      .collect()
      .then((result: any) => {
        if (callback.onConfirm) callback.onConfirm(result);
        return result.wait();
      })
      .then((result: any) => {
        dispatch(stakeActions.resetProfit(contractAddress));
        if (callback.onReceipt) callback.onReceipt(result);
      })
      .catch((err: any) => {
        errorHandler(err);
        if (callback.onError) callback.onError(err);
      });
  };

  // const unstakeAll = () => {
  //   if (!stakeContract) return null;
  //   let status;
  //   stakeContract
  //     .unstakeAll()
  //     .then((result: any) => {
  //       status = result;
  //       return result.wait();
  //     })
  //     .then(() => {
  //       dispatch(stakeActions.resetProfit(contractAddress));
  //     });
  //   return status;
  // };

  return {
    isCorrectChain,
    counters,
    approved,
    sendApprove,
    sendCollect,
    sendCompound,
    sendStake,
    sendUnStake,
    // unstakeAll,
    isUserAgreement,
    isAllowShowStake,
    isHidden,
    earlyInvestorTokens,
    maxStakingLimit,
    supportsPartners,
    contractChainId,
  };
};
