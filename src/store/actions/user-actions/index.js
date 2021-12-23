import Cookies from "js-cookie";
import cogoToast from "cogo-toast";
import { TYPES } from "../types";
import * as api from "../../../services/api";

const catchError = (dispatch, err) => {
  if (!err.error) {
    return;
  }
  cogoToast.error(err.error.message, { position: "top-right", heading: "Authorization Error", hideAfter: 10 });
  if (err.error.message === "Token expired") {
    dispatch({
      type: TYPES.USER.LOGOUT,
    });
  }
};

export const userActions = {
  register: (email, password) => (dispatch) =>
    new Promise((resolve, reject) => {
      api
        .post("register", { email, password })
        .then((data) => {
          dispatch({
            type: TYPES.USER.LOGIN,
            payload: data,
          });
          Cookies.set("access_token", data.token);
          resolve(data);
        })
        .catch((error) => {
          catchError(dispatch, error);
          reject(error);
        });
    }),

  login: (email, password) => (dispatch) =>
    new Promise((resolve, reject) => {
      api
        .post("login", { email, password })
        .then((data) => {
          dispatch({
            type: TYPES.USER.LOGIN,
            payload: data,
          });
          Cookies.set("access_token", data.token);
          resolve(data);
        })
        .catch((error) => {
          catchError(dispatch, error);
          reject(error);
        });
    }),
  logout: () => (dispatch) =>
    new Promise((resolve, reject) => {
      try {
        dispatch({
          type: TYPES.USER.LOGOUT,
        });
        resolve({ status: true });
      } catch (err) {
        reject(err);
      }
    }),

  getSumsub: (cb) => (dispatch, getStore) =>
    new Promise((resolve, reject) => {
      const { user } = getStore();
      api
        .post(
          "get-sumsub-init-data",
          {},
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          },
        )
        .then((data) => {
          dispatch({
            type: TYPES.USER.SET_SUMSUB,
            payload: data,
          });
          if (typeof cb === "function") {
            cb(data);
          }
          resolve(data);
        })
        .catch((error) => {
          catchError(dispatch, error);
          reject(error);
        });
    }),

  getUserInfo: () => (dispatch, getStore) =>
    new Promise((resolve, reject) => {
      const { user } = getStore();
      api
        .post(
          "get-user-info",
          {},
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          },
        )
        .then((data) => {
          dispatch({
            type: TYPES.USER.SET_USER,
            payload: data,
          });
          resolve(data);
        })
        .catch((error) => {
          catchError(dispatch, error);
          reject(error);
        });
    }),

  addInvestorAddress: (address) => (dispatch, getStore) =>
    new Promise((resolve, reject) => {
      const { user } = getStore();
      api
        .post(
          "add-investor-address",
          { address },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          },
        )
        .then((data) => {
          dispatch({
            type: TYPES.USER.ADD_ADDRESS,
            payload: data,
          });
          resolve(data);
        })
        .catch((error) => {
          // catchError(dispatch, error);
          reject(error);
        });
    }),

  getInvestorAddresses: () => (dispatch, getStore) =>
    new Promise((resolve, reject) => {
      const { user } = getStore();
      api
        .post(
          "get-investor-addresses",
          {},
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          },
        )
        .then((data) => {
          dispatch({
            type: TYPES.USER.SET_ADDRESSES,
            payload: data,
          });
          resolve(data);
        })
        .catch((error) => {
          catchError(dispatch, error);
          reject(error);
        });
    }),

  removeInvestorAddress: (addressId) => (dispatch, getStore) =>
    new Promise((resolve, reject) => {
      const { user } = getStore();
      api
        .post(
          "remove-investor-address ",
          {},
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          },
        )
        .then(() => {
          dispatch({
            type: TYPES.USER.REMOVE_ADDRESS,
            payload: addressId,
          });
          resolve({ status: true });
        })
        .catch((error) => {
          catchError(dispatch, error);
          reject(error);
        });
    }),
  getSalesForCustomer: (address) => (dispatch) =>
    api
      .post("get-sales-for-customer", { customerAddress: address })
      .then((data) => {
        dispatch({
          type: TYPES.USER.SET_SALES,
          payload: data,
        });
      })
      .catch((error) => {
        catchError(dispatch, error);
      }),
};
