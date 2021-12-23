import { TYPES } from "../../actions";

// import { lsGet, lsRemove } from "../../../services";
// TODO:
// let lastAwaitingTransaction = [];
// const lastAwaitingTransactionsFromStorage = lsGet("last_aw_tsx");
// if (lastAwaitingTransactionsFromStorage) {
//   if (lastAwaitingTransactionsFromStorage.length) {
//     lastAwaitingTransaction = [JSON.parse(lastAwaitingTransactionsFromStorage)];
//     lsRemove("last_aw_tsx");
//   }
// }

const initialState = {
  exchangerOffers: [],
  clientOrders: [],
  ordersById: {},
  awaitingOrders: [],
};

export const ordersReducer = (state = initialState, action = {}) => {
  const { payload } = action;
  let allTransactions = [];
  if (action.type === TYPES.ORDERS.FETCH_ORDERS) {
    allTransactions = payload.orders.reduce((transactions, order) => [...transactions, ...order.transactions], []);
  }

  switch (action.type) {
    case TYPES.ORDERS.CREATE:
      return {
        ...state,
        awaitingOrders: [payload, ...state.awaitingOrders],
      };
    case TYPES.ORDERS.FETCH_ORDERS:
      return {
        ...state,
        clientOrders: payload.orders,
        awaitingOrders: [...state.awaitingOrders.filter((order) => !allTransactions.includes(order.transactionHash))],
      };
    case TYPES.ORDERS.FETCH_ORDER_BY_ID:
      return {
        ...state,
        ordersById: {
          ...state.ordersById,
          [payload.order.id]: payload.order,
        },
      };
    case TYPES.ORDERS.GET_OFFERS_FOR_EXCHANGER:
      return {
        ...state,
        exchangerOffers: payload.offers,
      };
    default:
      return state;
  }
};
