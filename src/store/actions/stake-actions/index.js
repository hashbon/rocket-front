import { TYPES } from "../types";
import { getFullDisplayBalance } from "../../../services/web3network/utils/formatBalance";

export const stakeActions = {
  getStakeInfo: (stakeContract, account) => (dispatch) => {
    stakeContract.getCurrentInfo(account).then((data) => {
      const apr = data.apr.toString();
      const apy = ((((1 + (apr / (365 * 100))) ** 365) - 1) * 100).toFixed(2);

      dispatch({
        type: TYPES.STAKE.SET_STAKE,
        payload: {
          contractAddress: stakeContract.address,
          isUserAgreement: data.isParticipant,
          counters: {
            apr,
            apy,
            staked: getFullDisplayBalance(data.userStakedAmount, 18, 2),
            tvl: getFullDisplayBalance(data.totalStakedAmount, 18, 2),
            profit: getFullDisplayBalance(data.userPendingReward, 18, 2),
          },
        },
      });
    });
  },
  resetProfit: (contractAddress) => (dispatch) => {
    dispatch({
      type: TYPES.STAKE.SET_STAKE,
      payload: {
        contractAddress,
        counters: {
          profit: 0,
        },
      },
    });
  },
};
