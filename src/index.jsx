/* eslint-disable */
import React from "react";
import ReactDOM from "react-dom";
import "core-js/es6/map";
import "core-js/es6/set";
import "url-search-params-polyfill";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router5";
import { Web3ReactProvider, createWeb3ReactRoot } from "@web3-react/core";
import store from "./store/store";
import router from "./router";
import { getLibrary } from "./services/web3network/utils/web3react";
import Modal from 'react-modal';
import { App } from "./App";

if (window.ethereum) {
  window.ethereum.autoRefreshOnNetworkChange = false;
}
Modal.setAppElement('#root');

const spa = (
  <Provider store={store}>
    <RouterProvider router={router}>
      <Web3ReactProvider getLibrary={getLibrary}>
        <React.StrictMode>
          <App store={store} router={router} />
        </React.StrictMode>
      </Web3ReactProvider>
    </RouterProvider>
  </Provider>
);

router.start((err, state) => {
  ReactDOM.render(spa, document.getElementById("root"));
});
