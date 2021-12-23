import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { InstallPluginPage } from "./index";
import { PAGE_ROUTES } from "../../../definitions";

const web3React = {
  active: false,
  activate: jest.fn((value: boolean) => {}),
};

const useEffect = jest.fn();
const navigate = jest.fn();
const useWeb3React = jest.fn(() => web3React);
const injected = true;
const error = jest.fn();

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useEffect,
}));
jest.mock("../../../router", () => ({ navigate }));
jest.mock("./assets/fox.svg", () => ({ ReactComponent: () => null }));
jest.mock("@web3-react/core", () => ({ useWeb3React }));
jest.mock("../../../services/web3network/connectors", () => ({ injected }));
jest.mock("cogo-toast", () => ({ error }));

describe("InstallPluginPage", () => {
  const SpiedComponent: jest.MockedFunction<typeof InstallPluginPage> = jest.fn(InstallPluginPage);

  beforeEach(() => {
    render(<SpiedComponent />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render", () => {
    expect(SpiedComponent).toHaveBeenNthCalledWith(1, {}, {});
  });

  it("should call useWeb3React", () => {
    expect(useWeb3React).toHaveBeenNthCalledWith(1);
  });

  it("should call useEffect", () => {
    expect(useEffect).toHaveBeenCalledTimes(1);
    expect(typeof useEffect.mock.calls[0][0]).toEqual("function");
    expect(useEffect.mock.calls[0][1]).toEqual([web3React.active]);
  });

  describe("passed callback to useEffect should work correctly", () => {
    it("if web3React is active", () => {
      web3React.active = true;
      jest.clearAllMocks();
      render(<SpiedComponent />);
      useEffect.mock.calls[0][0]();
      expect(navigate).toHaveBeenNthCalledWith(1, PAGE_ROUTES.SWAP);
    });

    it("if web3React is notactive", () => {
      web3React.active = false;
      jest.clearAllMocks();
      render(<SpiedComponent />);
      useEffect.mock.calls[0][0]();
      expect(navigate).toHaveBeenCalledTimes(0);
    });
  });

  describe("onConnect", () => {
    const expected = [
      "No provider was found",
      {
        position: "top-right",
        heading: "Provider Error",
        hideAfter: 10,
      },
    ];

    it("metamask exists", () => {
      window.ethereum = { isMetaMask: true };
      fireEvent.click(screen.getByText("Connect"));
      expect(web3React.activate).toHaveBeenNthCalledWith(1, true);
    });

    it("metamask does not exist", () => {
      window.ethereum = undefined;
      fireEvent.click(screen.getByText("Connect"));
      expect(error).toHaveBeenNthCalledWith(1, ...expected);
    });

    it("metamask is false", () => {
      window.ethereum = {};
      fireEvent.click(screen.getByText("Connect"));
      expect(error).toHaveBeenNthCalledWith(1, ...expected);
    });
  });
});
