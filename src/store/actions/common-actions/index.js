import Cookies from "js-cookie";
import { TYPES } from "../types";
import * as api from "../../../services/api";
import { switchMatch } from "../../../utils";

export const commonActions = {
  setOnLoaded: (status) => (dispatch) => {
    dispatch({
      type: TYPES.COMMON.SET_ON_LOADED,
      payload: status,
    });
  },

  setFromNetworkId: (id) => (dispatch) => {
    dispatch({
      type: TYPES.COMMON.SET_SWAP_FORM_FROM_NET_ID,
      payload: id,
    });
  },

  setFromTokenId: (id) => (dispatch) => {
    dispatch({
      type: TYPES.COMMON.SET_SWAP_FORM_FROM_TOKEN_ID,
      payload: id,
    });
  },

  setToNetworkId: (id) => (dispatch) => {
    dispatch({
      type: TYPES.COMMON.SET_SWAP_FORM_TO_NET_ID,
      payload: id,
    });
  },

  setToTokenId: (id) => (dispatch) => {
    dispatch({
      type: TYPES.COMMON.SET_SWAP_FORM_TO_TOKEN_ID,
      payload: id,
    });
  },

  setCurrentLang: (payload) => (dispatch) =>
    new Promise((resolve) => {
      const lang = switchMatch(payload, {
        us: "en",
        cz: "cs",
        default: payload,
      });
      Cookies.set("lang", lang);
      dispatch({
        type: TYPES.COMMON.SET_CURRENT_LANG,
        payload: lang,
      });

      resolve(true);
    }),

  getLangs: () => (dispatch, getStore) =>
    new Promise((resolve) => {
      const store = getStore();
      import(`../../../definitions/localization/${store.common.currentLang}.js`).then((data) => {
        dispatch({
          type: TYPES.COMMON.SET_LANGS,
          payload: data.default,
        });
        resolve({ status: true });
      });
    }),

  getTokensAndOffers: () => (dispatch) =>
    new Promise((resolve, reject) => {
      api
        .post("get-tokens-and-offers", {})
        .then((response) => {
          api.apiResponseTreatment(response).then(
            (data) => {
              dispatch({
                type: TYPES.COMMON.GET_TOKENS_AND_OFFERS,
                payload: data,
              });
              resolve({ status: true });
            },
            () => {
              // eslint-disable-next-line prefer-promise-reject-errors
              reject({ status: false });
            },
          );
        })
        .catch((data) => {
          reject(data);
        });
    }),

  getHashPrice: () => (dispatch) =>
    new Promise((resolve, reject) => {
      api
        .get("get-hash-price")
        .then((response) => {
          api.apiResponseTreatment(response).then(
            (data) => {
              dispatch({
                type: TYPES.COMMON.GET_HASH_PRICE,
                payload: data.price,
              });
              resolve({ status: true });
            },
            () => {
              // eslint-disable-next-line prefer-promise-reject-errors
              reject({ status: false });
            },
          );
        })
        .catch((data) => {
          reject(data);
        });
    }),

  getBlockChainConfig: () => (dispatch) =>
    new Promise((resolve, reject) => {
      api
        .get("get-blockchain-config", {})
        .then((response) => {
          api.apiResponseTreatment(response).then(
            (data) => {
              dispatch({
                type: TYPES.COMMON.GET_BLOCKCHAIN_CONFIG,
                payload: data,
              });
              dispatch({
                type: TYPES.STAKE.SET_STAKING_LIST,
                payload: data.stakingList,
              });
              resolve({ status: true });
            },
            () => {
              // eslint-disable-next-line prefer-promise-reject-errors
              reject({ status: false });
            },
          );
        })
        .catch((data) => {
          reject(data);
        });
    }),
};
