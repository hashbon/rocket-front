import { useEffect, useState, useRef } from "react";
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";
import { getSimpleRpcProvider } from "../utils/providers";

/**
 * Хук для получения активного web3
 */
const useWeb3 = () => {
  const { library, chainId } = useWeb3React();
  const refEth = useRef(library);
  const [web3, setWeb3] = useState(new Web3(library || getSimpleRpcProvider(chainId)));

  useEffect(() => {
    if (library !== refEth.current) {
      setWeb3(new Web3(library || getSimpleRpcProvider(chainId)));
      refEth.current = library;
    }
  }, [library]);

  return web3;
};

export default useWeb3;
