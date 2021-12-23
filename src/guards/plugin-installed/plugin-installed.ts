import { Router } from "router5";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const canActivateByInstalledPlugin = (router: Router) => () =>
  // eslint-disable-next-line prefer-promise-reject-errors
  window.ethereum?.isMetaMask ? Promise.resolve() : Promise.resolve();
