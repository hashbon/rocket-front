import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import Cookies from "js-cookie";
import { toPowAndHex } from "../../../../services/web3network/utils";
import useGetNetworks from "../../../../hooks/useGetNetworks";
import useWeb3 from "../../../../services/web3network/hooks/useWeb3";
import useCallMethod from "../../../../services/web3network/hooks/web3";
import { lsGet } from "../../../../services";
import router from "../../../../router";
import { PAGE_ROUTES } from "../../../../definitions";
import { getHashSaleContract } from "../../../../services/web3network/utils/contractHelpers";

const useCrowdsaleLogic = () => {
  const [bnb, setBnb] = useState("");
  const [bnbTokens, setBnbTokens] = useState(0);
  const [bnbLoading, setBnbLoading] = useState(false);
  const [bnbWaiting, setBnbWaiting] = useState(false);
  const [eth, setEth] = useState("");
  const [ethTokens, setEthTokens] = useState(0);
  const [ethLoading, setEthLoading] = useState(false);
  const [agreementSignature, setAgreementSignature] = useState("");
  const [minPayAmount, setMinPayAmount] = useState(0);
  const [maxPayAmount, setMaxPayAmount] = useState(0);
  const { currentNetwork, getNetworkById } = useGetNetworks();
  const { account, chainId, library } = useWeb3React();
  const web3 = useWeb3();
  const { data: agreement, execute: executeAgreement } = useCallMethod("AGREEMENT");
  const {
    data: calculatedTokenAmount,
    execute: executeCalculatedTokenAmount,
    errors: errorsCalculatedTokenAmount,
  } = useCallMethod("calculateTokenAmount");
  const { data: minAndMaxPayAmounts, execute: executeMinAndMaxPayAmounts } = useCallMethod("getMinAndMaxPayAmounts");

  // eslint-disable-next-line eqeqeq
  const isEth = currentNetwork && (chainId == 1 || chainId == 4);
  // eslint-disable-next-line eqeqeq
  const isBsc = currentNetwork && (chainId == 56 || chainId == 97);
  const ethChainId = getNetworkById(1).name ? 1 : 4;
  const bscChainId = getNetworkById(56).name ? 56 : 97;

  const saleContract = currentNetwork
    ? getHashSaleContract(currentNetwork.saleContractAddress, chainId, library.getSigner())
    : null;

  useEffect(() => {
    if (!minAndMaxPayAmounts && saleContract) {
      executeMinAndMaxPayAmounts(saleContract, []);
    }
  }, [saleContract]);

  useEffect(() => {
    if (saleContract) {
      executeMinAndMaxPayAmounts(saleContract, []);
    }
  }, [chainId]);

  useEffect(() => {
    if (minAndMaxPayAmounts) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setMinPayAmount(minAndMaxPayAmounts[0]);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setMaxPayAmount(minAndMaxPayAmounts[1]);
    }
  }, [minAndMaxPayAmounts]);

  useEffect(() => {
    setEth("");
    setBnb("");
    setEthTokens(0);
    setBnbTokens(0);
  }, [chainId]);

  useEffect(() => {
    if (calculatedTokenAmount) {
      if (isEth) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setEthTokens(Math.round((parseFloat(calculatedTokenAmount) * 10000) / 10 ** 18) / 10000);
      } else if (isBsc) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        setBnbTokens(Math.round((parseFloat(calculatedTokenAmount) * 10000) / 10 ** 18) / 10000);
      }
    } else {
      setEthTokens(0);
      setBnbTokens(0);
      setBnbLoading(false);
      setEthLoading(false);
    }
  }, [calculatedTokenAmount, errorsCalculatedTokenAmount]);

  useEffect(() => {
    if (errorsCalculatedTokenAmount.errorSelectedChainId) {
      setEthTokens(0);
      setBnbTokens(0);
    }
  }, [errorsCalculatedTokenAmount]);

  const signAgreement = () => {
    if (agreement && account) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      web3.eth.personal
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        .sign(agreement, account)
        .then((sign) => {
          setAgreementSignature(sign);
        })
        .catch(() => {
          setBnbLoading(false);
          setEthLoading(false);
        });
    }
  };

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  useEffect(() => {
    signAgreement();
  }, [agreement]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    buyTokens(bnbWaiting ? bnb : eth);
  }, [agreementSignature]);

  const buyTokens = (amount: string) => {};

  return {
    bnb,
    setBnb,
    bnbTokens,
    setBnbTokens,
    eth,
    ethTokens,
    setEth,
    saleContract,
    executeCalculatedTokenAmount,
    isEth,
    isBsc,
    ethLoading,
    setEthLoading,
    bnbLoading,
    setBnbLoading,
    setBnbWaiting,
    agreement,
    executeAgreement,
    agreementSignature,
    signAgreement,
    buyTokens,
    chainId,
    ethChainId,
    bscChainId,
    minPayAmount,
    maxPayAmount,
    currentNetwork,
  };
};

export default useCrowdsaleLogic;
