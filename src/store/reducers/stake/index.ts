// eslint-disable-next-line import/no-cycle
import { TYPES } from "../../actions";

export enum StakeStages {
  DRAFT = "draft",
  APPROVED = "approved",
  STAKED = "staked",
  COLLECTED = "collected",
}



export interface StakingInterface {
  approved: boolean;
  isUserAgreement: boolean;
  chainId: number;
  contractAddress: string;
  isHidden: boolean;
  supportsPartners: boolean;
  counters: {
    apr: number,
    apy: number,
    staked: number,
    profit: number,
    tvl: number,
  },
}

interface InitialState {
  isStakeInfoLoad: boolean
  list: Map<string, StakingInterface>
}

export const emptyStakingItem: StakingInterface = {
  approved: false,
  isUserAgreement: false,
  chainId: 0,
  contractAddress: "",
  isHidden: false,
  supportsPartners: true,
  counters: {
    apr: 0,
    apy: 0,
    staked: 0,
    profit: 0,
    tvl: 0,
  },
};

const INITIAL_STATE: InitialState = {
  isStakeInfoLoad: false,
  list: new Map<string, StakingInterface>(),
};

export const stakeReducer = (state = INITIAL_STATE, action: any) => {
  const { payload } = action;

  const newStakingList = new Map<string, StakingInterface>();
  const currentStakingList = state.list;
  const contractAddress = payload && payload.contractAddress ? payload.contractAddress.toLowerCase() : null;

  let currentStakeItem: StakingInterface | null = null;
  if (payload && payload.contractAddress) {
    currentStakeItem = currentStakingList.get(contractAddress) || null;
  }

  switch (action.type) {
    case TYPES.STAKE.SET_STAKING_LIST:
      payload.forEach((item: any) => newStakingList.set(item.contractAddress.toLowerCase(), { ...emptyStakingItem, ...item }));
      return { list: newStakingList, isStakeInfoLoad: true };


    case TYPES.STAKE.SET_APPROVED:
      if (currentStakeItem) {
        currentStakingList.set(contractAddress, {
          ...currentStakeItem,
          approved: payload.approved,
        });
      }

      return {
        ...state,
        list: currentStakingList,
      };

    case TYPES.STAKE.SET_STAKE:
      if (currentStakeItem) {
        currentStakingList.set(contractAddress, {
          ...currentStakeItem,
          isUserAgreement: payload.isUserAgreement,
          counters: {
            ...currentStakeItem.counters,
            ...payload.counters,
          },
        });
      }
      return {
        ...state,
        list: currentStakingList,
      };

    default:
      return state;
  }
};
