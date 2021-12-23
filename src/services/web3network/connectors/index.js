import { InjectedConnector } from "@web3-react/injected-connector";
import { supportedChainIds } from "../../../definitions/index";

export const injected = new InjectedConnector({
  supportedChainIds,
});
