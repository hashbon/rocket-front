/* eslint-disable */
import "./modals.scss";
import React, { Component } from "react";
import router5 from "../../../../router";
import Modal from "./components/Modal";
import callbacks from "../../../../utils/callbacks";

const __MODAL = "modal";
const SEPARATOR = ".";

class Modals extends Component {
  state = {
    scope: new Map(),
  };

  __routerListenerHandler = (state, prevState) => {
    if (!state.params.hasOwnProperty(__MODAL) || state.params[__MODAL] === undefined) {
      return this.__clear();
    }

    let type = "add";
    if (prevState.params.hasOwnProperty(__MODAL) && !state.params.hasOwnProperty(__MODAL)) {
      type = "delete";
    } else if (prevState.params.hasOwnProperty(__MODAL) && state.params.hasOwnProperty(__MODAL)) {
      const stateCount = modalString.getArray(state.params[__MODAL]).length;
      const prevStateCount = modalString.getArray(prevState.params[__MODAL]).length;
      if (stateCount < prevStateCount) {
        type = "delete";
      }
    }

    if (type === "add") {
      this.__routerTreatment({
        [__MODAL]: state.params[__MODAL],
        prevModal: prevState.params[__MODAL],
        meta: state.meta.options,
        _get: state.params,
      });
    } else {
      [...this.state.scope.keys()].forEach((item) => {
        if (!state.params[__MODAL].includes(item)) {
          this.__delete(item);
        }
      });
    }
  };

  __routerTreatment = ({ modal, prevModal = undefined, meta = {}, _get = {} }) => {
    let lastModalNow = modalString.getLast(modal);
    let lastModalPrev = undefined;
    if (prevModal) {
      lastModalPrev = modalString.getLast(prevModal);
      if (this.__has(lastModalPrev)) {
        if (!modalString.getArray(modal).includes(lastModalPrev)) {
          this.__delete(lastModalPrev);
        }
      }
    }

    if (lastModalNow !== undefined && modal !== lastModalPrev) {
      if (this.props.modalsRoutes.hasOwnProperty(lastModalNow)) {
        this.__add(lastModalNow, {
          name: lastModalNow,
          added: new Date().getTime(),
          _get,
          meta,
        });
      } else {
        if (lastModalNow === "undefined" && this.props.modalsRoutes.hasOwnProperty(lastModalPrev)) {
          if (!modalString.getArray(modal).includes(lastModalPrev)) {
            this.__delete(lastModalPrev);
          }
        }
      }
    }
  };

  __clear = () => {
    this.setState({
      scope: new Map(),
    });
  };

  __add = (key, value) => {
    if (!this.__has(key)) {
      this.setState({
        scope: this.state.scope.set(key, value),
      });
    }
  };

  __has = (key) => {
    return this.state.scope.has(key);
  };

  __delete = (key, cb) => {
    const prev = this.state.scope;
    const obj = this.state.scope.get(key);
    if (obj !== undefined && obj.hasOwnProperty("meta")) {
      if (typeof obj["meta"] === "object") {
        if (obj["meta"].hasOwnProperty("onCloseHandlerKey")) {
          callbacks.remove(obj.meta.onCloseHandlerKey);
        }
      }
    }

    if (prev.delete(key)) {
      this.setState(
        {
          scope: prev,
        },
        cb,
      );
    } else {
      if (cb) cb();
    }
  };

  __renderModal = ({ key }) => {
    const thisModal = this.state.scope.get(key);
    if (!this.props.modalsRoutes.hasOwnProperty(key) || !thisModal) {
      return <></>;
    }

    let onCloseHandler = () => {};
    if (thisModal.meta.hasOwnProperty("onCloseHandlerKey")) {
      onCloseHandler = callbacks.get(thisModal.meta.onCloseHandlerKey);
    }

    return (
      <Modal
        key={key}
        close={close}
        open={open}
        clear={clear}
        meta={{ ...thisModal.meta }}
        getParams={{ ...thisModal._get }}
        onCloseHandler={onCloseHandler}
        children={this.props.modalsRoutes[key]}
      />
    );
  };

  __render = () => {
    const pop = [...this.state.scope.keys()].pop();
    return this.state.scope.size < 1 ? (
      <></>
    ) : (
      <>
        <div className="Modals">
          <div className="Modals__box__close" onClick={close} />
          {pop !== undefined && this.__renderModal({ key: pop })}
        </div>
      </>
    );
  };

  componentDidMount() {
    router5.addListener(this.__routerListenerHandler);
    document.addEventListener("keyup", this.__keyListener);
    const stateParams = router5.getState().params;
    if (stateParams.hasOwnProperty(__MODAL)) {
      modalString.getArray(stateParams[__MODAL]).forEach((item) => {
        this.__routerTreatment({
          [__MODAL]: item,
          prevModal: undefined,
          meta: {},
          _get: stateParams,
        });
      });
    }
  }

  componentWillUnmount() {
    document.removeEventListener("keyup", this.__keyListener);
    router5.removeListener(this.__routerListenerHandler);
  }

  render() {
    return this.__render();
  }
}

const modalString = {
  checkNull: (data) => {
    return data.length < 1 ? undefined : data;
  },
  getArray: (str = "") => {
    const prev = str.split(SEPARATOR);
    return prev.length === 1 && prev[0] === "" ? [] : prev;
  },
  add: (str, name) => {
    let prev = modalString.getArray(str);
    prev.push(name);
    return prev.join(SEPARATOR);
  },
  lastReplace: (str, name) => {
    const removeLast = modalString.removeLast(str);
    return modalString.add(removeLast ? removeLast : str, name);
  },
  getLast: (str) => {
    return modalString.checkNull(modalString.getArray(str).pop() + "");
  },
  removeLast: (str) => {
    const prev = modalString.getArray(str);
    prev.pop();
    return modalString.checkNull(prev.join(SEPARATOR));
  },
};

function getModalParam() {
  const stateParams = router5.getState().params;
  return stateParams.hasOwnProperty(__MODAL) ? stateParams[__MODAL] : undefined;
}

export const Router = Modals;

export function open(name = 'undefined', get = {}, meta = {}, params = {}) {
  const routerState = router5.getState();
  if (routerState.params.hasOwnProperty("section")) {
    get["section"] = routerState.params["section"];
  }
  if (routerState.params.hasOwnProperty("id")) {
    get["id"] = routerState.params["id"];
  }
  const modal = getModalParam();
  const openModal = modalString.add(modal, name);
  if (params.hasOwnProperty("onCloseHandler")) {
    meta.onCloseHandlerKey = callbacks.add(name, params.onCloseHandler);
  }
  router5.navigate(routerState.name, { [__MODAL]: openModal, ...get }, { ...meta });
}

export function replace(name = undefined, get = {}, meta = {}) {
  const modal = getModalParam();
  const openModal = modalString.lastReplace(modal, name);
  router5.navigate(router5.getState().name, { [__MODAL]: openModal, ...get }, { ...meta });
}

export function close() {
  const modal = getModalParam();
  const openModal = modalString.removeLast(modal);
  const routerState = router5.getState();
  const get = {};
  if (routerState.params.hasOwnProperty("section")) {
    get["section"] = routerState.params["section"];
  }
  if (routerState.params.hasOwnProperty("id")) {
    get["id"] = routerState.params["id"];
  }
  router5.navigate(router5.getState().name, { [__MODAL]: openModal, ...get }, {});
}

export function clear() {
  router5.navigate(router5.getState().name, { [__MODAL]: undefined }, {});
}
