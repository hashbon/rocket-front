// eslint-disable-next-line import/no-cycle
import Cookies from "js-cookie";
// eslint-disable-next-line import/no-cycle
import { TYPES } from "../../actions";

const initialState = {
  token: Cookies.get("access_token") || null,
  isAuth: false,
  user: {
    verified: false,
    email: null,
    investorAddresses: null,
  },
  sumsub: {
    accessToken: null,
    apiUrl: null,
    flowName: null,
    isTest: null,
  },
  sales: [],
  withdrawals: [],
  tokensToWithdraw: {
    1: 0,
    56: 0,
    4: 0,
    97: 0,
  },
};

export const userReducer = (state = initialState, action = {}) => {
  const { payload } = action;
  switch (action.type) {
    case TYPES.USER.LOGIN:
      return {
        ...state,
        token: payload.token,
        user: payload.user,
        isAuth: true,
      };

    case TYPES.USER.LOGOUT:
      Cookies.remove("access_token");
      return {
        ...state,
        token: null,
        user: initialState.user,
        isAuth: false,
      };

    case TYPES.USER.SET_USER:
      return {
        ...state,
        user: payload.user,
        isAuth: true,
      };

    case TYPES.USER.SET_SUMSUB:
      return {
        ...state,
        sumsub: payload.data,
      };

    case TYPES.USER.SET_SALES:
      return {
        ...state,
        sales: payload.sales,
        withdrawals: payload.withdrawals,
        tokensToWithdraw: payload.tokensToWithdraw,
      };

    default:
      return state;
  }
};
