// eslint-disable-next-line import/no-cycle
import Cookies from "js-cookie";
// eslint-disable-next-line import/no-cycle
import { TYPES } from "../../actions";

const initialState = {
  test: [],
  config: {},
  onloaded: false,
  currentLang: Cookies.get("lang") || "en",
  langs: {},
  metamask: {},
  tokens: [],
  offers: [],
  timestamp: null,
  hashPrice: null,
  blockchainConfig: {},
  swapFrom: {
    from: {
      netId: null,
      tokenId: null,
    },
    to: {
      netId: null,
      tokenId: null,
    },
  },
};

export const commonReducer = (state = initialState, action = {}) => {
  const { payload } = action;
  const newState = { ...state };

  switch (action.type) {
    case TYPES.COMMON.SET_ON_LOADED:
      return {
        ...state,
        onloaded: payload,
      };

    case TYPES.COMMON.SET_SWAP_FORM_FROM_NET_ID:
      newState.swapFrom.from.netId = payload;
      return newState;

    case TYPES.COMMON.SET_SWAP_FORM_FROM_TOKEN_ID:
      newState.swapFrom.from.tokenId = payload;
      return newState;

    case TYPES.COMMON.SET_SWAP_FORM_TO_NET_ID:
      newState.swapFrom.to.netId = payload;
      return newState;

    case TYPES.COMMON.SET_SWAP_FORM_TO_TOKEN_ID:
      newState.swapFrom.to.tokenId = payload;
      return newState;

    case TYPES.COMMON.SET_CONFIG:
      return {
        ...state,
        config: payload,
      };

    case TYPES.COMMON.SET_CURRENT_LANG:
      return {
        ...state,
        currentLang: payload,
      };

    case TYPES.COMMON.SET_LANGS:
      return {
        ...state,
        langs: payload,
      };

    case TYPES.COMMON.SET_TEST:
      return {
        ...state,
        test: [...state.test, ...action.payload],
      };
    case TYPES.COMMON.SET_ADDRESS:
      return {
        ...state,
        metamask: {
          ...state.metamask,
          address: payload,
        },
      };

    case TYPES.COMMON.GET_TOKENS_AND_OFFERS:
      return {
        ...state,
        tokens: payload.tokens,
        offers: payload.offers,
        timestamp: payload.timestamp,
      };

    case TYPES.COMMON.GET_BLOCKCHAIN_CONFIG:
      return {
        ...state,
        blockchainConfig: payload.blockchainConfig,
      };

    case TYPES.COMMON.GET_HASH_PRICE:
      return {
        ...state,
        hashPrice: payload,
      };
    default:
      return state;
  }
};
