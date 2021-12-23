import { useSelector } from "react-redux";
import { useWeb3React } from "@web3-react/core";
import { BlockChainConfig } from "store/reducers/common/model";

const useGetNetworks = () => {
  const { blockchainConfig } = useSelector((state: { common: { blockchainConfig: BlockChainConfig } }) => ({
    blockchainConfig: state.common.blockchainConfig,
  }));

  const { chainId } = useWeb3React();
  const currentNetwork = chainId ? blockchainConfig[chainId] : null;

  const getNetworkById = (id: number) => ({ ...blockchainConfig[id], id } || {});

  return {
    blockchainConfig,
    currentNetwork,
    getNetworkById,
  };
};

export default useGetNetworks;
