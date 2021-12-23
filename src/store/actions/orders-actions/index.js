import { TYPES } from "../types";
import * as api from "../../../services/api";
import { lsSet } from "../../../services";

export const ordersActions = {
  getOrdersForClient:
    ({ ownerAddress }) =>
      (dispatch) =>
        new Promise((resolve, reject) => {
          api
            .post("get-orders-for-client", {
              ownerAddress,
            })
            .then((response) => {
              api.apiResponseTreatment(response).then(
                (data) => {
                  dispatch({
                    type: TYPES.ORDERS.FETCH_ORDERS,
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

  getOrder:
    ({ orderId }) =>
      (dispatch) =>
        new Promise((resolve, reject) => {
          api
            .get(`get-order/${orderId}`, {})
            .then((response) => {
              api.apiResponseTreatment(response).then(
                (data) => {
                  dispatch({
                    type: TYPES.ORDERS.FETCH_ORDER_BY_ID,
                    payload: data,
                  });
                  resolve({ status: true, data });
                },
                (data) => {
                // eslint-disable-next-line prefer-promise-reject-errors
                  reject({ status: false, data });
                },
              );
            })
            .catch((response) => {
            // eslint-disable-next-line prefer-promise-reject-errors
              reject({ status: false, response });
            });
        }),

  getOffersForExchanger:
    ({ netId, ownerAddress }) =>
      (dispatch) =>
        new Promise((resolve, reject) => {
          api
            .post("get-offers-for-exchanger", { netId, ownerAddress })
            .then((response) => {
              api.apiResponseTreatment(response).then(
                (data) => {
                  dispatch({
                    type: TYPES.ORDERS.GET_OFFERS_FOR_EXCHANGER,
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

  addAwaitingOrder: (params) => (dispatch) => {
    const { transactionHash, amount, payAmount, fromTokenId, toTokenId } = params;
    const payload = {
      transactionHash,
      amount: parseFloat(parseFloat(amount).toFixed(13)),
      payAmount: parseFloat(parseFloat(payAmount).toFixed(13)),
      from: fromTokenId,
      to: toTokenId,
    };
    lsSet("last_aw_tsx", JSON.stringify(payload));
    dispatch({
      type: TYPES.ORDERS.CREATE,
      payload,
    });
  },
};
