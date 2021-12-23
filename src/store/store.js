import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
// eslint-disable-next-line import/no-duplicates
import { reduxPlugin } from "redux-router5";
// eslint-disable-next-line import/no-duplicates
import { router5Middleware } from "redux-router5";
import router from "../router";

// eslint-disable-next-line import/no-cycle
import reducers from "./reducers";

// eslint-disable-next-line import/no-mutable-exports
let store;

export function getStore() {
  store = createStore(reducers, applyMiddleware(thunk, router5Middleware(router)));

  router.usePlugin(reduxPlugin(store.dispatch));
}

getStore();

export default store;
