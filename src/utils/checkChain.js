import * as Modals from "../components/ui/universal/Modals";

export const checkChain = (current, needed, neededChain, cb) => {
  if (current === needed) {
    cb();
    return;
  }


  // FIXME: remove if are ready to start WalletConnect
  // eslint-disable-next-line no-prototype-builtins
  if (!(window.hasOwnProperty("ethereum") && window.ethereum.isMetaMask)) {
    Modals.open("install");
    return;
  }

  if (window.location.href.includes("modal=chain")) return;

  Modals.open("chain", { needed });

  const neededHex = `0x${needed.toString(16)}`;
  const provider = window.ethereum;

  // Отправлять запрос можно только когда взаимодействие идет через браузер
  if (provider) {
    provider
      .request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: neededHex }],
      })
      .then(() => {
        // cb();
      })
      .catch((error) => {
        if (error.code === 4902) {
          window.ethereum
            .request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: neededHex,
                  rpcUrls: [neededChain.rpcUrl],
                  chainName: neededChain.name,
                  nativeCurrency: {
                    name: neededChain.currencySymbol,
                    symbol: neededChain.currencySymbol,
                    decimals: 18,
                  },
                },
              ],
            })
            .then(() => {
              // cb();
            });
        }
      });
  }
};
