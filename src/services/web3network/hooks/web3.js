/* eslint-disable */
import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";

import { errorHandler } from "../utils/errorHandler";


export default function useCallMethod(method) {
  const [data, setData] = useState(null);

  const [errors, setErrors] = useState({
    errorSelectedChainId: false,
  });
  const { account } = useWeb3React();

  function handleDataChange(data) {
    setData(data);
    setErrors({
      ...errors,
      errorSelectedChainId: false,
    });
  }

  useEffect(() => {
    setData(null);
  }, [method]);

  const execute = (contract, inputs = []) => {
    return contract[method](...inputs, { from: account })
      .then((data) => {
        handleDataChange(data);
        return data;
      })
      .catch((e) => {
        errorHandler(e);
        setErrors({
          ...errors,
          errorSelectedChainId: true,
        });
      });
  };

  return {
    data,
    execute,
    errors,
  };
}
