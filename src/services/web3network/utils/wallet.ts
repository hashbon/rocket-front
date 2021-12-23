
import { RPC_URLS } from "./web3react";

export const setupNetwork = async () => {
  const provider = window.ethereum;
  // Отправлять запрос можно только когда взаимодействие идет через браузер
  if (provider) {
    const chainId = 1;
    try {
      await provider.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: `0x${chainId.toString(16)}`,
            chainName: "Mainnet",
            nativeCurrency: {
              name: "ETH",
              symbol: "eth",
              decimals: 18,
            },
            rpcUrls: RPC_URLS[1],
            blockExplorerUrls: ["https://etherscan.io/"],
          },
        ],
      });
      return true;
    } catch (error) {
      console.error("Failed to setup the network in Metamask:", error);
      return false;
    }
  } else {
    console.error("Can't setup the BSC network on metamask because window.ethereum is undefined");
    return false;
  }
};