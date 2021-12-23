import { combineReducers } from "redux";
import { commonReducer } from "./common";
import { ordersReducer } from "./orders";
import { userReducer } from "./user";
import { stakeReducer } from "./stake";

export default combineReducers({
  common: commonReducer,
  orders: ordersReducer,
  user: userReducer,
  stake: stakeReducer,
});
